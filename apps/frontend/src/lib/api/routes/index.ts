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

const routes = {
  auth,
}

export default routes;