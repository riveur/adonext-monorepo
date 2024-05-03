"use client";

import useTodoModalStore from "@/app/dashboard/(todo)/todos/hooks/use-todo-modal-store";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/datatable-column-header";
import { useDestroyTodoMutation } from "@/hooks/use-todos";
import { Todo } from "@/lib/validation";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, LoaderIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import TodoStatus from "./todo-status";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="#" />
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Columns" />
    },
    cell: function Cell({ row }) {
      return (
        <div className="flex items-center gap-2">
          <TodoStatus todo={row.original} />
          <span>{row.original.content}</span>
        </div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Cell({ row }) {
      const setTodo = useTodoModalStore.getState().setTodo;
      const { mutateAsync: destroyTodo, isPending } = useDestroyTodoMutation(row.original.id);
      return (
        <div className="flex">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setTodo(row.original)}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled={isPending}
            onClick={() => {
              toast.promise(destroyTodo(), {
                loading: "Deleting...",
                success: () => {
                  return "Todo deleted !";
                },
                error: () => {
                  return "Failed to delete todo";
                }
              });
            }}
          >
            {isPending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
          </Button>
        </div>
      );
    }
  }
];
