import ky, { type Options } from "ky";

const isProduction = process.env.NODE_ENV === "production";

export type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE";

export type ApiEndpoint = {
  method: AllowedMethods;
  path: string;
};

export type FetchOptions<
  RequestBody = any,
  RequestParams = any,
> = (RequestBody extends Record<string, unknown> ?
  { body: RequestBody } : { body?: RequestBody }) &
  (RequestParams extends Record<string, string | number> ?
    { params: RequestParams } : { params?: RequestParams }) & {
      headers?: Options["headers"];
      searchParams?: Record<string, string | string[] | undefined>;
    };

function parseSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  const search = new URLSearchParams();
  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        search.append(key, v);
      });
    } else if (value !== undefined) {
      search.append(key, value);
    }
  });
  return search;
}

function buildEndpoint(path: string, options: Pick<FetchOptions, "params" | "searchParams"> = {}) {
  const params = options.params || {};
  const apiUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3333';
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key].toString());
  });
  if (options.searchParams) {
    const searchParams = parseSearchParams(options.searchParams);
    path += `?${searchParams.toString()}`;
  }
  return apiUrl + path;
}

export async function fetcher(endpoint: ApiEndpoint, options: FetchOptions = {}) {
  const url = buildEndpoint(endpoint.path, { params: options.params, searchParams: options.searchParams });
  const fetchOptions: Options = {
    method: endpoint.method,
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include'
  };

  if (options.headers) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      ...options.headers,
    };
  }

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
    };
  }

  return ky(url, fetchOptions).json();
}