import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { XCircle } from "lucide-react";

interface DataTableContentProps<TData> {
  table: TanstackTable<TData>;
  showPlaceholder?: boolean;
}

export function DataTableContent<TData>({
  table,
  showPlaceholder = false,
}: DataTableContentProps<TData>) {

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {showPlaceholder && (
          Array.from({ length: table.getState().pagination.pageSize }).map((_, index) => (
            <TableRowPlaceHolder key={index} colSpan={table.getAllColumns().length} />
          ))
        )}
        {(table.getRowModel().rows?.length !== 0) && (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
        {(table.getRowModel().rows?.length === 0 && !showPlaceholder) && (
          <TableRow>
            <TableCell colSpan={table.getAllColumns().length} className="h-60">
              <div className="flex flex-col gap-2 justify-center items-center">
                <XCircle className="h-16 w-16" />
                <span>No results</span>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function TableRowPlaceHolder({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="p-0 h-9">
        <Skeleton className="w-full h-full" />
      </TableCell>
    </TableRow>
  );
}