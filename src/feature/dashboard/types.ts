import { Role } from "@/generated/prisma/enums";
import {
  GalleryVerticalEndIcon,
  LucideIcon,
  Settings2Icon,
  ShieldUserIcon,
} from "lucide-react";

export const linksInfo = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    role: Role.VOLUNTEER,
  },

  teams: [
    {
      name: "NayePankh Foundation",
      logo: GalleryVerticalEndIcon,
      plan: "Enterprise",
    },
  ],

  Links: [
    {
      title: "Playground",
      url: "/dashboard/volunteer",
      icon: ShieldUserIcon,
      isActive: true,
      items: [
        {
          title: "Applies",
          url: "/dashboard/admin/applies",
          role: [Role.ADMIN],
        },
      ],
    },

    {
      title: "Settings",
      url: "/dashboard/profile",
      icon: Settings2Icon,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
          role: [Role.ADMIN, Role.USER, Role.VOLUNTEER],
        },
        {
          title: "Roles",
          url: "/dashboard/admin/roles",
          role: [Role.ADMIN],
        },
      ],
    },
  ],
};
export interface SidebarSubItem {
  title: string;
  url: string;
  role: Role[];
}

export interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarSubItem[];
}