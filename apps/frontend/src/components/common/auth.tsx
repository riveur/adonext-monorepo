import routes from "@/lib/api/routes";
import { UserSchema } from "@/lib/validation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect, } from "next/navigation";
import { FC } from "react";

export function withServerAuth(Component: FC) {
  return async function Wrapper() {
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
        <Component />
      </HydrationBoundary>
    );
  }
}

export function withServerGuest(Component: FC) {
  return async function Wrapper() {
    try {
      await routes.auth.me.request({
        headers: { cookie: cookies().toString() }
      }).then(UserSchema.parse);
    } catch {
      return <Component />;
    }

    redirect("/protected");
  }
}