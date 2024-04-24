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
