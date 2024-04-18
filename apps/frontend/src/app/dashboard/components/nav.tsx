"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, LucideIcon, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = {
  path: string;
  label: string;
  icon: React.ReactNode;
}

function createIconLink(Icon: LucideIcon) {
  return <Icon className="h-4 w-4" />
}

const LINKS: Array<LinkProps> = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: createIconLink(Home)
  },
];

export function SideNav() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {LINKS.map((link) => (
        <Link

          className={cn(pathname === link.path && "bg-muted", "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground")}
          key={link.path}
          href={link.path}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium pt-6">
          {LINKS.map((link) => (
            <Link
              className={cn(
                pathname === link.path && "bg-muted",
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              )}
              key={link.path}
              href={link.path}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
