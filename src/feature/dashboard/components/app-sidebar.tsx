"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { DashboardLinks } from "./dashboard-links";
import { DashboardButtomUser } from "./dasboard-buttom-user";
import { linksInfo } from "../types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const trpc = useTRPC();
  const user = useQuery(trpc.user.me.queryOptions());

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={linksInfo.teams} />
      </SidebarHeader>
      <SidebarContent>
        {user.isLoading ? (
          <div className="space-y-1 px-2 py-4">
            {Array.from({ length: linksInfo.Links.length }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-2 py-1.5 animate-pulse">
                {/* Mimics the Menu Item Icon */}
                <Skeleton className="h-7 w-7 rounded shrink-0 bg-sidebar-accent" />
                {/* Mimics the Menu Item Text */}
                <Skeleton className="h-7 flex-1 rounded bg-sidebar-accent-foreground/20" />
              </div>
            ))}
          </div>
        ) : user.data?.role ? (
          <DashboardLinks items={linksInfo.Links} userRole={user.data.role} />
        ) : (
          <div className="text-xs text-center text-muted-foreground py-2">
            No access permissions found.
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <DashboardButtomUser user={user.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
