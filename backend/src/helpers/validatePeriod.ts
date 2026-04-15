import { BadRequestError } from '@/errors';

export function validatePeriod(from: Date, to: Date) {
  if (from > to) {
    throw new BadRequestError('Invalid date range');
  }
}
