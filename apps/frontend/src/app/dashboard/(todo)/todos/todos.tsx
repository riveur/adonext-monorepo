"use client";

import { useTodos } from "@/hooks/use-todos";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function Todos() {
  const query = useTodos();
  return (
    <>
      <DataTable columns={columns} query={query} />
    </>
  );
}