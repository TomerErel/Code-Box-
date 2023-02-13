import { z } from 'zod';

export const codeBox = z.object({
    title: z.string(),
    code: z.string()
});

export const codeBoxParams = z.object({
    title: z.string(),
});