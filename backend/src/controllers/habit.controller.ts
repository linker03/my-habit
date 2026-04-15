import { Request, Response } from 'express';
import { habitService } from '../services/habit.service';
import {
  validateHabitCreate,
  validateHabitUpdate,
} from '../validators/habit.validator';
import { BadRequestError } from '@/errors';

/** безопасный парсер id */
function parseId(idParam?: string): number {
  const id = Number(idParam);

  if (!id || Number.isNaN(id)) {
    throw new BadRequestError('Invalid habit ID');
  }

  return id;
}

export const habitController = {
  /** GET /habits */
  async getAll(req: Request, res: Response) {
    const habits = await habitService.getAllHabits();
    res.json(habits);
  },

  /** GET /habits/:id */
  async getById(req: Request, res: Response) {
    const id = parseId(req.params.id);
    const habit = await habitService.getHabitById(id);
    res.json(habit);
  },

  /** GET /habits/with-completions?from=2025-01-01&to=2025-01-31 */
  async getWithCompletions(req: Request, res: Response) {
    const { from, to } = req.query;

    if (!from || !to) {
      throw new BadRequestError('from and to query params are required');
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const habits = await habitService.getHabitsWithCompletions(
      fromDate,
      toDate,
    );

    res.json(habits);
  },

  /** POST /habits */
  async create(req: Request, res: Response) {
    const data = validateHabitCreate(req.body);
    const habit = await habitService.createHabit(data);
    res.status(201).json(habit);
  },

  /** PATCH /habits/:id */
  async update(req: Request, res: Response) {
    const id = parseId(req.params.id);
    const data = validateHabitUpdate(req.body);
    const habit = await habitService.updateHabit(id, data);
    res.json(habit);
  },

  /** DELETE /habits/:id */
  async delete(req: Request, res: Response) {
    const id = parseId(req.params.id);
    await habitService.deleteHabit(id);
    res.status(204).send();
  },

  /** POST /habits/:id/today  body: { value: number } */
  async setToday(req: Request, res: Response) {
    const id = parseId(req.params.id);
    const { value } = req.body;

    if (typeof value !== 'number') {
      throw new BadRequestError('value must be a number');
    }

    const completion = await habitService.setToday(id, value);
    res.json(completion);
  },

  /** POST /habits/:id/date  body: { date: string, value: number } */
  async setForDate(req: Request, res: Response) {
    const id = parseId(req.params.id);
    const { date, value } = req.body;

    if (!date) throw new BadRequestError('date is required');
    if (typeof value !== 'number') {
      throw new BadRequestError('value must be a number');
    }

    const completion = await habitService.setCompletionForDate(
      id,
      new Date(date),
      value,
    );

    res.json(completion);
  },
};
