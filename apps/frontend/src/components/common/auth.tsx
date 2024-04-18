import routes from "@/lib/api/routes";
import { prefetchQuery } from "@/lib/query";
import { User, UserSchema } from "@/lib/validation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect, } from "next/navigation";
import * as React from "react";

type HocAuthOptions = {
  redirect?: string;
}

export function withServerAuth<T extends {}>(Component: React.ComponentType<T>, options: HocAuthOptions = {}) {
  const { redirect: redirectUrl = "/login" } = options;
  return async function Wrapper(props: T) {

    const serverCookies = cookies();

    if (!serverCookies.has("adonis-session")) {
      redirect(redirectUrl);
    }

    const queryClient = await prefetchQuery({
      dehydrate: false,
      queryKey: ["auth"],
      queryFn: () => routes.auth.me.request({
        headers: {
          cookie: serverCookies.toString()
        }
      }).then(UserSchema.parse),
    });

    const user = queryClient.getQueryData<User>(["auth"]);

    if (!user) {
      redirect(redirectUrl);
    }

    props = { ...props, user: user! };

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  }
}

export function withServerGuest<T extends {}>(Component: React.ComponentType<T>, options: HocAuthOptions = {}) {
  const { redirect: redirectUrl = "/dashboard" } = options;
  return async function Wrapper(props: T) {
    try {
      await routes.auth.me.request({
        headers: { cookie: cookies().toString() }
      }).then(UserSchema.parse);
    } catch {
      return <Component {...props} />;
    }

    redirect(redirectUrl);
  }
}