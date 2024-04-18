"use client";

import routes from "@/lib/api/routes";
import { UserSchema } from "@/lib/validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: () => routes.auth.me.request().then(UserSchema.parse),
    retry: false,
  });

  return query.data;
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => routes.auth.logout.request(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.refresh();
    }
  });
}