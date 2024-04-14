"use client";

import { FC, ReactNode } from "react";
import QueryProvider from "./query-provider";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}

export default Providers;