import { BadRequestError } from '@/errors';

const ICONS = ['star', 'heart', 'check'] as const;
const COLORS = ['red', 'blue', 'green', 'yellow'] as const;

export function validateHabitCreate(data: any) {
  if (!data.name || typeof data.name !== 'string') {
    throw new BadRequestError('Name is required and must be a string');
  }

  if (
    !data.completionFrequency ||
    typeof data.completionFrequency !== 'number'
  ) {
    throw new BadRequestError(
      'Completion frequency is required and must be a number'
    );
  }

  if (!data.icon || !ICONS.includes(data.icon)) {
    throw new BadRequestError(
      `Icon is required and must be one of: ${ICONS.join(', ')}`
    );
  }

  if (!data.color || !COLORS.includes(data.color)) {
    throw new BadRequestError(
      `Color is required and must be one of: ${COLORS.join(', ')}`
    );
  }

  return {
    name: data.name,
    description: data.description,
    completionFrequency: data.completionFrequency,
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
    updateData.name = data.name;
  }

  return updateData;
}
