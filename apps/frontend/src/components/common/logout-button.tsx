"use client";

import routes from "@/lib/api/routes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onClick = () => {
    routes.auth.logout.request()
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.refresh();
      });
  }

  return (
    <Button onClick={onClick}>
      Logout
    </Button>
  );
}