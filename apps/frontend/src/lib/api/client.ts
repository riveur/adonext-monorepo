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
    { params: RequestParams } : { params?: RequestParams });

function buildEndpoint(path: string, params: FetchOptions['params'] = {}) {
  const apiUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3333';

  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key].toString());
  });

  return apiUrl + path;
}

export async function fetcher(endpoint: ApiEndpoint, options: FetchOptions = {}) {
  const url = buildEndpoint(endpoint.path, options.params);

  const fetchOptions: Options = {
    method: endpoint.method,
    headers: {
      'Accept': 'application/json',
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
    };
  }

  return ky(url, fetchOptions).json();
}