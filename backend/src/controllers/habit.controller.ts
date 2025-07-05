import { Request, Response } from 'express';
import { habitService } from '../services/habit.service';
import {
  validateHabitCreate,
  validateHabitUpdate,
} from '../validators/habit.validator';
import { BadRequestError } from '@/errors';

export const habitController = {
  async getAll(req: Request, res: Response) {
    const habits = await habitService.getAllHabits();
    res.json(habits);
  },

  async getById(req: Request, res: Response) {
    if (!req.params?.id) {
      throw new BadRequestError('Invalid habit ID');
    }

    const id = parseInt(req.params.id);
    const habit = await habitService.getHabitById(id);
    res.json(habit);
  },

  async create(req: Request, res: Response) {
    const data = validateHabitCreate(req.body);
    const habit = await habitService.createHabit(data);
    res.status(201).json(habit);
  },

  async update(req: Request, res: Response) {
    if (!req.params?.id) {
      throw new BadRequestError('Invalid habit ID');
    }

    const id = parseInt(req.params.id);
    const data = validateHabitUpdate(req.body);
    const habit = await habitService.updateHabit(id, data);
    res.json(habit);
  },

  async delete(req: Request, res: Response) {
    if (!req.params?.id) {
      throw new BadRequestError('Invalid habit ID');
    }

    const id = parseInt(req.params.id);
    await habitService.deleteHabit(id);
    res.status(204).send();
  },

  async addLog(req: Request, res: Response) {
    if (!req.params?.id) {
      throw new BadRequestError('Invalid habit ID');
    }

    const habitId = parseInt(req.params.id);
    const date = new Date(req.body.date);
    const log = await habitService.addHabitLog(habitId, date);
    res.status(201).json(log);
  },
};
