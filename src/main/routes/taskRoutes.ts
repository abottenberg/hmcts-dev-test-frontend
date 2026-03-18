import TaskController from '../controllers/TaskController';

import { Router } from 'express';

const router = Router();
const taskController = new TaskController();

router.get('/tasks', taskController.getTasks.bind(taskController));
router.get('/tasks/:id', taskController.getTaskById.bind(taskController));
router.post('/tasks/create-task', taskController.createTask.bind(taskController));
router.post('/tasks/:id', taskController.updateTaskStatus.bind(taskController));
router.post('/tasks/:id/delete', taskController.deleteTask.bind(taskController));
router.get('/create-task', (req, res) => {
  res.render('create-task');
});

export default router;
