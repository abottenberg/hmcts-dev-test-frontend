import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/tasks';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  createdDate: string;
  dueDate: string;
}

export class TaskService {
  public async createTask(taskData: Task): Promise<Task> {
    const response = await axios.post(`${API_BASE_URL}/create-task`, taskData);
    return response.data;
  }

  public async getTaskById(taskId: number): Promise<Task> {
    const response = await axios.get(`${API_BASE_URL}/${taskId}`);
    return response.data;
  }

  public async getAllTasks(): Promise<Task[]> {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }

  public async updateTaskStatus(taskId: number, taskStatus: string): Promise<Task> {
    const response = await axios.post(
      `${API_BASE_URL}/${taskId}/update-status`,
      { status: taskStatus },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  }

  public async deleteTask(taskId: number): Promise<void> {
    await axios.post(`${API_BASE_URL}/${taskId}/delete`);
  }
}
