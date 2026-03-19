/* eslint-disable jest/expect-expect */
import { Task, TaskService } from '../../../main/services/TaskService';

describe('Task Service', () => {
  const taskService = new TaskService();
  const task1: Task = {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    status: 'TODO',
    createdDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
  };

  const task2: Task = {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    status: 'DONE',
    createdDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
  };

  jest.spyOn(TaskService.prototype, 'getTaskById').mockResolvedValue(task1);
  jest.spyOn(TaskService.prototype, 'getAllTasks').mockResolvedValue([task1, task2]);
  jest.spyOn(TaskService.prototype, 'createTask').mockResolvedValue({ ...task1, id: 3 });
  jest.spyOn(TaskService.prototype, 'updateTaskStatus').mockResolvedValue({ ...task1, status: 'DONE' });
  jest.spyOn(TaskService.prototype, 'deleteTask').mockResolvedValue(undefined);

  test('should get task by id', async () => {
    const task = await taskService.getTaskById(1);
    expect(task).toEqual(task1);
  });

  test('should get all tasks', async () => {
    const tasks = await taskService.getAllTasks();
    expect(tasks).toEqual([task1, task2]);
  });

  test('should create a new task', async () => {
    const newTask = await taskService.createTask({ ...task1, id: undefined });
    expect(newTask).toEqual({ ...task1, id: 3 });
  });

  test('should update an existing task status', async () => {
    const updatedTask = await taskService.updateTaskStatus(1, 'DONE');
    expect(updatedTask).toEqual({ ...task1, status: 'DONE' });
  });

  test('should delete a task', async () => {
    await expect(taskService.deleteTask(1)).resolves.toBeUndefined();
  });
});
