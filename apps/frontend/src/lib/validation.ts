import { z } from "zod";

function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(itemSchema: ItemType) {
  return z.object({
    meta: z.object({
      total: z.number(),
      perPage: z.number(),
      currentPage: z.number(),
      lastPage: z.number(),
      firstPage: z.number(),
      firstPageUrl: z.string(),
      lastPageUrl: z.string(),
      nextPageUrl: z.string().nullable(),
      previousPageUrl: z.string().nullable(),
    }),
    data: z.array(itemSchema),
  });
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  password_confirmation: z.string().min(1),
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"]
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const TodoSchema = z.object({
  id: z.number(),
  content: z.string(),
  completed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const StoreTodoSchema = z.object({
  content: z.string().min(1).trim(),
});

export const UpdateTodoSchema = z.object({
  content: z.string().min(1).trim().optional(),
  completed: z.boolean().optional(),
});

export const PaginatedTodosSchema = createPaginatedResponseSchema(TodoSchema);