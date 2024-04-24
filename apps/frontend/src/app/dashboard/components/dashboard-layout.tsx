import * as React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main
          className={cn("flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6", className)}
          {...props}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
