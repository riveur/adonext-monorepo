import { parseAsColumnSort } from "@/lib/search-params";
import { parseAsInteger, useQueryStates } from "nuqs";

export default function usePaginationOptions() {
  return useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    sort: parseAsColumnSort,
  });
}