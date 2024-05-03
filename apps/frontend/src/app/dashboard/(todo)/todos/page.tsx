import DashboardLayout from "@/app/dashboard/components/dashboard-layout";
import DashboardTitle from "@/app/dashboard/components/dashboard-title";
import { withServerAuth } from "@/components/common/auth";
import routes from "@/lib/api/routes";
import { prefetchQuery } from "@/lib/query";
import { parseAsColumnSort, searchParamsCache } from "@/lib/search-params";
import { PaginatedTodosSchema } from "@/lib/validation";
import { AuthenticatedPageProps } from "@/types";
import { HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import Todos from "./todos";

const TodosPage = async ({ searchParams }: AuthenticatedPageProps) => {
  const { page, limit, sort } = searchParamsCache.parse(searchParams);

  const options = {
    page: String(page),
    limit: String(limit),
    sort: sort ? parseAsColumnSort.serialize(sort) : ""
  };

  const dehydratedState = await prefetchQuery({
    queryKey: ["todos", options],
    queryFn: () => routes.todo.list
      .request({
        searchParams: options,
        headers: { cookie: cookies().toString() }
      })
      .then(PaginatedTodosSchema.parse)
  });

  return (
    <DashboardLayout>
      <DashboardTitle>Todos</DashboardTitle>
      <HydrationBoundary state={dehydratedState}>
        <Todos />
      </HydrationBoundary>
    </DashboardLayout>
  );
};

export default withServerAuth(TodosPage);
