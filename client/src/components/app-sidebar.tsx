import { Contact, Gift, Home, School, Search, User } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Educational Content",
        url: "/dashboard/educational-content",
        icon: School,
    },
    {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
    },
    {
        title: "Bounty",
        url: "/dashboard/bounty",
        icon: Gift,
    },
    {
        title: "Explore",
        url: "/dashboard/explore",
        icon: Search,
    },
    {
        title: "Friends",
        url: "/dashboard/friends",
        icon: Contact,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="font-open-sans">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Snap Habit</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="">
                <SignOutButton>
                    <span className="bg-custom-orange w-full px-2 py-1 rounded-lg overflow-hidden">
                        Sign Out
                    </span>
                </SignOutButton>
            </SidebarFooter>
        </Sidebar>
    );
}
