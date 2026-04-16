import { Router } from 'express';
import { habitController } from '../controllers/habit.controller';

const router = Router();

router.get('/with-completions', habitController.getWithCompletions);

router.get('/', habitController.getAll);
router.post('/', habitController.create);

router.get('/:id', habitController.getById);
router.put('/:id', habitController.update);
router.delete('/:id', habitController.delete);

router.post('/:id/today', habitController.setToday);
router.post('/:id/date', habitController.setForDate);

export const habitRoutes = router;
