"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";
import { DataTableContent } from "@/components/ui/data-table/datatable-content";
import { DataTablePagination } from "@/components/ui/data-table/datatable-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table/datatable-view-options";
import { Input } from "@/components/ui/input";
import usePaginationOptions from "@/hooks/use-pagination-options";
import { PaginatedResponse } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import TodoModal from "./todo-modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  query: UseQueryResult<PaginatedResponse<TData>>
}

export function DataTable<TData, TValue>({
  columns,
  query,
}: DataTableProps<TData, TValue>) {

  const [{ page, limit, sort }, setSearchParams] = usePaginationOptions();

  const table = useReactTable({
    data: query.data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
    manualPagination: true,
    rowCount: query.data?.meta.total,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
      sorting: sort ? [sort] : [],
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const { pageIndex, pageSize } = updater({ pageIndex: page - 1, pageSize: limit });
        setSearchParams({ page: pageIndex + 1, limit: pageSize });
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const [updatedSort] = updater(sort ? [sort] : []);
        setSearchParams({ sort: updatedSort });
      }
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2">
        <div className="relative">
          <SearchIcon className="absolute top-2 left-2 h-4 w-4 text-muted-foreground" />
          <Input className="h-8 pl-8 w-[150px] lg:w-[250px]" placeholder="Search todo" />
        </div>
        <div className="flex gap-2">
          <TodoModal />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <Card className="rounded-sm">
        <CardContent className="p-0">
          <DataTableContent table={table} showPlaceholder={query.isLoading} />
        </CardContent>
      </Card>
      <DataTablePagination table={table} />
    </div>
  );
}