import { z } from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .nonempty('Title is required'),
  description: z
    .string()
    .max(200, 'Description must be under 200 characters')
    .optional()
    .or(z.literal('')), // Allows empty string
});