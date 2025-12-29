"use client";

import { useSidebar } from "@/context/admin/SidebarContext";
import React from "react";
import AppHeader from "./layout/AppHeader";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]" // Sidebar expanded or hovered
    : "lg:ml-[90px]"; // Sidebar collapsed

  return (
    <div
      className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
    >
      {/* Header */}
      <AppHeader />
      {/* Page Content */}
      <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
    </div>
  );
}
