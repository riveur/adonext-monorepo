import { LoginInput, RegisterInput } from "@/lib/validation";
import { RouteObject } from "./route-object";

export const auth = {
  login: new RouteObject<LoginInput>({ method: 'POST', path: '/login' }),
  register: new RouteObject<RegisterInput>({ method: 'PUT', path: '/register' }),
  logout: new RouteObject({ method: 'DELETE', path: '/logout' }),
  me: new RouteObject({ method: 'GET', path: '/me' }),
} satisfies Record<string, RouteObject>;