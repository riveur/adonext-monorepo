import { DehydratedState, QueryClient, UseQueryOptions, dehydrate } from "@tanstack/react-query";

type DeHydratedPrefetchQueryOptions<QData = unknown, QError = unknown> = UseQueryOptions<QData, QError> & { dehydrate?: true };
type HydratedPrefetchQueryOptions<QData = unknown, QError = unknown> = UseQueryOptions<QData, QError> & { dehydrate?: false };
type PrefetchQueryOptions<QData = unknown, QError = unknown> = UseQueryOptions<QData, QError> & { dehydrate?: boolean };

export async function prefetchQuery<
  QData = unknown,
  QError = unknown
>(options: DeHydratedPrefetchQueryOptions<QData, QError>): Promise<DehydratedState>;

export async function prefetchQuery<
  QData = unknown,
  QError = unknown
>(options: HydratedPrefetchQueryOptions<QData, QError>): Promise<QueryClient>;

export async function prefetchQuery<
  QData = unknown,
  QError = unknown
>(options: PrefetchQueryOptions<QData, QError>): Promise<DehydratedState | QueryClient> {
  const { dehydrate: requrireDehydrate = true, ...queryOptions } = options;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryOptions);

  if (requrireDehydrate) {
    return dehydrate(queryClient);
  }

  return queryClient;
};