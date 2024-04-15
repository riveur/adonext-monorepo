"use client";

import routes from "@/lib/api/routes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  redirectUrl?: string;
}

export default function LogoutButton({ redirectUrl = '/login' }: LogoutButtonProps) {
  const router = useRouter();
  const onClick = () => {
    routes.auth.logout.request().then(() => {
      router.replace(redirectUrl);
    });
  }

  return (
    <Button onClick={onClick}>
      Logout
    </Button>
  );
}