import routes from "@/lib/api/routes";
import { parseAsColumnSort } from "@/lib/search-params";
import { PaginatedTodosSchema, StoreTodoSchema, TodoSchema, UpdateTodoSchema } from "@/lib/validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import useAuth from "./use-auth";
import usePaginationOptions from "./use-pagination-options";

export function useTodos() {
  const user = useAuth();
  const [{ page, limit, sort }] = usePaginationOptions();

  const options = {
    page: String(page),
    limit: String(limit),
    sort: sort ? parseAsColumnSort.serialize(sort) : ""
  };

  return useQuery({
    queryKey: ["todos", options],
    queryFn: () => routes.todo.list
      .request({ searchParams: options })
      .then(PaginatedTodosSchema.parse),
    enabled: !!user,
  });
}

export function useTodo(id: number) {
  const user = useAuth();

  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => routes.todo.show
      .request({ params: { id } })
      .then(TodoSchema.parse),
    enabled: !!user,
  });
}

export function useStoreTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: z.infer<typeof StoreTodoSchema>) => routes.todo.store
      .request({ body: todo })
      .then(TodoSchema.parse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodoMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: z.infer<typeof UpdateTodoSchema>) => routes.todo.update
      .request({ params: { id }, body: todo })
      .then(TodoSchema.parse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useDestroyTodoMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => routes.todo.destroy
      .request({ params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}