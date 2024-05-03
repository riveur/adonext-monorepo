import { RouteObject } from "./route-object";

export const todo = {
  list: new RouteObject({ method: "GET", path: "/todos" }),
  store: new RouteObject({ method: "POST", path: "/todos" }),
  show: new RouteObject({ method: "GET", path: "/todos/:id" }),
  update: new RouteObject({ method: "PUT", path: "/todos/:id" }),
  destroy: new RouteObject({ method: "DELETE", path: "/todos/:id" }),
} satisfies Record<string, RouteObject>;