import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronsDownIcon, ChevronsUpDownIcon, ChevronsUpIcon } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ChevronsUpIcon className="ml-2 h-3 w-3" />
      ) : column.getIsSorted() === "asc" ? (
        <ChevronsDownIcon className="ml-2 h-3 w-3" />
      ) : (
        <ChevronsUpDownIcon className="ml-2 h-3 w-3" />
      )}
    </Button>
    </div >
  );
}
