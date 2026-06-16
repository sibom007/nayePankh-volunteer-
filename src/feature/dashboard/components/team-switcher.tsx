"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
  }[];
}) {
  // Use the first team as the active display
  const activeTeam = teams[0];

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-accent-foreground/10 cursor-default active:bg-transparent"
          asChild>
          <Link href={"/"}>
            <div className="flex aspect-square  items-center justify-center rounded-lg bg-accent/50 text-sidebar-primary-foreground p-0.5  shrink-0">
              <Image alt="logo" src={"/logo.svg"} width={40} height={40} />
            </div>

            {/* Company Name */}
            <div className="flex-1 text-left text-sm leading-tight truncate">
              <span className="font-medium">{activeTeam.name}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
