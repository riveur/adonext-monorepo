import { ColumnSort } from "@tanstack/react-table";
import { createParser } from "nuqs";
import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

export const parseAsColumnSort = createParser<ColumnSort>({
  parse(value: string) {
    const [id, direction] = value.split(".");
    if (typeof id !== "string" || !["asc", "desc"].includes(direction)) {
      return null;
    }
    return {
      id,
      desc: direction === "desc",
    };
  },
  serialize(value: unknown): string {
    if (typeof value !== "object" || value === null) {
      return "";
    }
    const { id, desc } = value as ColumnSort;
    return [id, desc ? "desc" : "asc"].join(".");
  }
});

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  sort: parseAsColumnSort,
});