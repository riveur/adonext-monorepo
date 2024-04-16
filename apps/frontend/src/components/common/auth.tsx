import routes from "@/lib/api/routes";
import { UserSchema } from "@/lib/validation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect, } from "next/navigation";
import * as React from "react";

export function withServerAuth<T extends {}>(Component: React.ComponentType<T>) {
  return async function Wrapper(props: T) {
    const queryClient = new QueryClient();

    const serverCookies = cookies();

    if (!serverCookies.has("adonis-session")) {
      redirect("/login");
    }

    await queryClient.prefetchQuery({
      queryKey: ["auth"],
      queryFn: () => routes.auth.me.request({
        headers: {
          cookie: serverCookies.toString()
        }
      }).then(UserSchema.parse),
    });

    if (!queryClient.getQueryData(["auth"])) {
      redirect("/login");
    }

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  }
}

export function withServerGuest<T extends {}>(Component: React.ComponentType<T>) {
  return async function Wrapper(props: T) {
    try {
      await routes.auth.me.request({
        headers: { cookie: cookies().toString() }
      }).then(UserSchema.parse);
    } catch {
      return <Component {...props} />;
    }

    redirect("/protected");
  }
}