import { AllowedMethods, ApiEndpoint, FetchOptions, fetcher } from "../client";

export class RouteObject<
  RequestBody = FetchOptions['body'],
  RequestParams = FetchOptions['params'],
> {
  public async request(
    options?: FetchOptions<RequestBody, RequestParams>,
  ) {
    return fetcher({ method: this.method, path: this.path }, options);
  }

  public method: AllowedMethods;
  public path: string;

  constructor({
    method,
    path,
  }: ApiEndpoint) {
    this.method = method;
    this.path = path;
  }
}