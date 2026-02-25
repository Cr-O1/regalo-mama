import { z } from 'zod';
import { insertMemorySchema, memories } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  memories: {
    list: {
      method: 'GET' as const,
      path: '/api/memories' as const,
      responses: {
        200: z.array(z.custom<typeof memories.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type MemoryResponse = z.infer<typeof api.memories.list.responses[200]>;
