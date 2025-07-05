import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

// Явно указываем типы параметров
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
  });
}
