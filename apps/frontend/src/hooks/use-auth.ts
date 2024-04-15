import routes from "@/lib/api/routes";
import { UserSchema } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth() {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: () => routes.auth.me.request().then(UserSchema.parse),
    retry: 1,
  });

  useEffect(() => {
    if (query.error) {
      console.log(query.error);
      router.replace("/login");
    }
  }, [query.error, router]);

  return query.data!;
}