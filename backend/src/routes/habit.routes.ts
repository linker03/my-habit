import { Router } from 'express';
import { habitController } from '../controllers/habit.controller';

const router = Router();

router.get('/', habitController.getAll);
router.post('/', habitController.create);
router.get('/:id', habitController.getById);
router.put('/:id', habitController.update);
router.delete('/:id', habitController.delete);
router.post('/:id/add-log', habitController.addLog);

export const habitRoutes = router;
