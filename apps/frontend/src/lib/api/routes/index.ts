/*
 * 
 * Example of a route:
 * 
 * `
 * const auth = {
 *  login: new RouteObject<{ email: string, password: string }>({ method: 'POST', path: '/login' }),
 * } satisfies Record<string, RouteObject>;
 * `
 * 
 * `auth` object will be add to the `routes` object.
 * 
 * 
 */

import { auth } from "./auth";
import { todo } from "./todo";

const routes = {
  auth,
  todo,
}

export default routes;