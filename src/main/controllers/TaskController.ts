import { TaskService } from '../services/TaskService';

import { Request, Response } from 'express';


export default class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.render('tasks', { tasks });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  public async getTaskById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const taskData = await this.taskService.getTaskById(Number(id));
      if (taskData) {
        const formattedTaskData = {
          id: taskData.id,
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          createdDate: this.formatDate(taskData.createdDate),
          dueDate: this.formatDate(taskData.dueDate),
        };
        res.render('task', { task: formattedTaskData });
      } else {
        res.status(404).json({ error: 'task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    const { title, description, day, month, year } = req.body;
    const errors: { text: string; href: string }[] = [];
    if (!title || title.trim() === '') {
      errors.push({
        text: 'Enter a title for the task',
        href: '#title',
      });
    }

    if (!day || !month || !year) {
      errors.push({
        text: 'Enter a complete due date',
        href: '#due-date',
      });
    }

    if (errors.length > 0) {
      return res.status(400).render('create-task', {
        errors,
        formData: req.body,
      });
    }

    const dueDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toISOString();

    const taskData = {
      title,
      description,
      dueDate,
      createdDate: new Date().toISOString()
    };

    try {
      await this.taskService.createTask(taskData);
      res.redirect('/tasks');
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  public async updateTaskStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await this.taskService.updateTaskStatus(Number(id), status);
      res.redirect('/tasks');
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.taskService.deleteTask(Number(id));
      res.redirect('/tasks');
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
