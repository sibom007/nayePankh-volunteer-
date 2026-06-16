"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserAvatar } from "@/lib/user-avatar";
import { SignOutButton } from "@clerk/nextjs";

export function DashboardButtomUser({
  user,
}: {
  user?: {
    name: string | null;
    email: string;
    avatar?: string;
  } | null;
}) {
  console.log(user);
  const { isMobile } = useSidebar();

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="animate-pulse">
            <div className="h-8 w-8 rounded-lg bg-sidebar-accent/50 shrink-0" />
            <div className="space-y-1 flex-1">
              <div className="h-4 w-24 rounded bg-sidebar-accent/50" />
              <div className="h-3 w-32 rounded bg-sidebar-accent/50" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              {/* 👈 Fix 3: Show uploaded image if exists, otherwise show UserAvatar letter block */}
              {user.avatar ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name || user.email}
                  />
                  <AvatarFallback className="rounded-lg uppercase font-semibold">
                    {user.name
                      ? user?.name.slice(0, 2)
                      : user.email.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <UserAvatar
                  name={user.name || user.email}
                  className="h-8 w-8 text-xs rounded-lg"
                />
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {/* 👈 Fix 4: Handled identical image logic inside the dropdown menu panel label */}
                {user.avatar ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name || user.email}
                    />
                    <AvatarFallback className="rounded-lg uppercase font-semibold">
                      {user.name
                        ? user?.name.slice(0, 2)
                        : user.email.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <UserAvatar
                    name={user.name || user.email}
                    className="h-8 w-8 text-xs rounded-lg"
                  />
                )}

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <Sparkles className="size-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck className="size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Bell className="size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" asChild>
              <LogOut className="size-4" />
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
