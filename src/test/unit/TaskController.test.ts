/* eslint-disable jest/expect-expect */
import TaskController from '../../../main/controllers/TaskController';
import { Task } from '../../../main/services/TaskService';

describe('Task Controller', () => {
  const taskController = new TaskController();

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

  beforeEach(() => {
    jest.spyOn(taskController['taskService'], 'getAllTasks').mockResolvedValue([task1, task2]);
    jest.spyOn(taskController['taskService'], 'getTaskById').mockResolvedValue(task1);
    jest.spyOn(taskController['taskService'], 'createTask').mockResolvedValue({ ...task1, id: 3 });
    jest.spyOn(taskController['taskService'], 'updateTaskStatus').mockResolvedValue({ ...task1, status: 'DONE' });
    jest.spyOn(taskController['taskService'], 'deleteTask').mockResolvedValue(undefined);
  });

  test('should call tasks page with tasks', async () => {
    const req = { query: {} } as any;
    const res = { render: jest.fn() } as any;
    await taskController.getTasks(req, res);
    expect(res.render).toHaveBeenCalledWith('tasks', { tasks: [task1, task2] });
  });

  test('should call task page with task data', async () => {
    const req = { params: { id: '1' } } as any;
    const res = { render: jest.fn() } as any;
    await taskController.getTaskById(req, res);
    expect(res.render).toHaveBeenCalledWith('task', { task: {
      id: task1.id,
      title: task1.title,
      description: task1.description,
      status: task1.status,
      createdDate: expect.any(String),
      dueDate: expect.any(String),
    } });
  });

  test('should create a new task and render tasks page', async () => {
    const req = { body: {
      title: 'New Task',
      description: 'Description for new task',
      day: '01',
      month: '01',
      year: '2024',
    },
  } as any;
    const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() } as any;
    await taskController.createTask(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/tasks');
    expect(taskController['taskService'].createTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Description for new task',
      dueDate: expect.any(String),
      createdDate: expect.any(String),
    });
  });

  test('should update task status and render tasks page', async () => {
    const req = { params: { id: '1' }, body: { status: 'DONE' } } as any;
    const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    await taskController.updateTaskStatus(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/tasks');
    expect(taskController['taskService'].updateTaskStatus).toHaveBeenCalledWith(1, 'DONE');
  });

  test('should delete task and render tasks page', async () => {
    const req = { params: { id: '1' } } as any;
    const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    await taskController.deleteTask(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/tasks');
    expect(taskController['taskService'].deleteTask).toHaveBeenCalledWith(1);
  });
});

