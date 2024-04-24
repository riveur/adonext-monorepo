import { User } from "@/lib/validation";

export type PageProps<Params extends Record<string, string> = {}> = {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
};

export type AuthenticatedPageProps<Params extends Record<string, string> = {}> = PageProps<Params> & { user: User };

export type PaginationOptions = {
  page?: string;
  limit?: string;
  sort?: string;
};

export type PaginatedResponse<Item> = {
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  };
  data: Item[];
};