import * as React from "react";
import { cn } from "@/lib/utils";

export default function DashboardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <div className="flex items-center">
      <h1
        className={cn("text-lg font-semibold md:text-2xl", className)}
        {...props}
      >
        {children}
      </h1>
    </div>
  );
}
