import { Role } from "@/generated/prisma/enums";
import {
  GalleryVerticalEndIcon,
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
      role: [Role.ADMIN],
      isActive: true,
      items: [
        {
          title: "Volunteer",
          url: "/dashboard/volunteer",
        },
      ],
    },

    {
      title: "Settings",
      url: "/dashboard/profile",
      role: [Role.ADMIN, Role.VOLUNTEER, Role.USER],
      icon: Settings2Icon,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
      ],
    },
  ],
};
