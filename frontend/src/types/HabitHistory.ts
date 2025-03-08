export type HabitHistory = {
  id: string; //uuid
  dateIso: string; // уникальные даты идущие по убыванию с интервалом 1 день.
  isDone: boolean; // случайное true или false
};
