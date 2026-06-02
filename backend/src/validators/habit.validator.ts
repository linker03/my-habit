import { BadRequestError } from '@/errors';

const ICONS = ['star', 'heart', 'check'] as const;
const COLORS = ['red', 'blue', 'green', 'yellow'] as const;

export function validateHabitCreate(data: any) {
  if (!data.name || typeof data.name !== 'string') {
    throw new BadRequestError('Name is required and must be a string');
  }

  if (
    data.frequency === undefined ||
    typeof data.frequency !== 'number' ||
    data.frequency <= 0
  ) {
    throw new BadRequestError(
      'Frequency is required and must be a positive number',
    );
  }

  if (!data.icon) {
    throw new BadRequestError('Icon must be');
  }

  if (!data.color) {
    throw new BadRequestError('Color must be');
  }

  return {
    name: data.name.trim(),
    description:
      typeof data.description === 'string' ? data.description.trim() : null,
    frequency: data.frequency,
    interval: data.interval,
    icon: data.icon,
    color: data.color,
  };
}

export function validateHabitUpdate(data: any) {
  const updateData: any = {};

  if (data.name !== undefined) {
    if (typeof data.name !== 'string') {
      throw new BadRequestError('Name must be a string');
    }
    updateData.name = data.name.trim();
  }

  if (data.description !== undefined) {
    if (data.description !== null && typeof data.description !== 'string') {
      throw new BadRequestError('Description must be a string or null');
    }
    updateData.description =
      data.description === null ? null : data.description.trim();
  }

  if (data.frequency !== undefined) {
    if (typeof data.frequency !== 'number' || data.frequency <= 0) {
      throw new BadRequestError('Frequency must be a positive number');
    }
    updateData.frequency = data.frequency;
  }

  if (data.icon !== undefined) {
    if (!ICONS.includes(data.icon)) {
      throw new BadRequestError(`Icon must be one of: ${ICONS.join(', ')}`);
    }
    updateData.icon = data.icon;
  }

  if (data.color !== undefined) {
    if (!COLORS.includes(data.color)) {
      throw new BadRequestError(`Color must be one of: ${COLORS.join(', ')}`);
    }
    updateData.color = data.color;
  }

  return updateData;
}
