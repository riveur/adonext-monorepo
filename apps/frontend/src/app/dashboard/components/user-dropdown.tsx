"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { default as useAuth, useLogoutMutation } from "@/hooks/use-auth";
import { CircleUser } from "lucide-react";

export default function UserDropdown() {
  const user = useAuth();
  const { mutate: logout } = useLogoutMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <>
            <DropdownMenuLabel className="pb-0">{user.username}</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs leading-none text-muted-foreground">{user.email}</DropdownMenuLabel>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Guest</DropdownMenuLabel>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
