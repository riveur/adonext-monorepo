"use client";

import routes from "@/lib/api/routes";
import { UserSchema } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: () => routes.auth.me.request().then(UserSchema.parse),
    retry: false,
  });

  return query.data;
}