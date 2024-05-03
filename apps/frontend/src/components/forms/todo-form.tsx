"use client";

import useTodoModalStore from "@/app/dashboard/(todo)/todos/hooks/use-todo-modal-store";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useStoreTodoMutation, useUpdateTodoMutation } from "@/hooks/use-todos";
import { StoreTodoSchema, UpdateTodoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function TodoForm() {
  const todo = useTodoModalStore().todo;
  const clearTodo = useTodoModalStore().clearTodo;
  const { mutateAsync: storeTodo } = useStoreTodoMutation();
  const { mutateAsync: updateTodo } = useUpdateTodoMutation(todo?.id ?? 0);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(todo ? UpdateTodoSchema : StoreTodoSchema),
    defaultValues: todo ? {
      content: todo.content,
      completed: todo.completed
    } : {
      content: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof StoreTodoSchema> | z.infer<typeof UpdateTodoSchema>) => {
    startTransition(() => {
      if (todo) {
        toast.promise(updateTodo(data as z.infer<typeof UpdateTodoSchema>), {
          loading: "Updating todo...",
          success: () => {
            return "Todo updated successfully";
          },
          error: () => {
            return "Failed to update todo";
          },
          finally: () => clearTodo(),
        });
        return;
      }

      toast.promise(storeTodo(data as z.infer<typeof StoreTodoSchema>), {
        loading: "Creating todo...",
        success: () => {
          form.reset();
          clearTodo();
          return "Todo created successfully";
        },
        error: () => {
          return "Failed to create todo";
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {todo ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
