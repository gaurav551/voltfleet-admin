"use client";

import { type ReactNode } from "react";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

export function MainContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        // Mobile: no left margin (sidebar is an overlay)
        "ml-0",
        // Desktop: margin matches sidebar width
        collapsed ? "lg:ml-20" : "lg:ml-72"
      )}
    >
      {children}
    </div>
  );
}