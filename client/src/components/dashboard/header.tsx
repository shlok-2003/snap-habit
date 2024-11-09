"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import ToggleMode from "@/components/ui/toggle-mode";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import Translation from "../ui/translation";

export default function Header() {
    const { user } = useUser();

    const pathname = usePathname();
    const title = pathname.split("/").slice(1);

    return (
        <header className="flex h-20 items-center gap-4 border-b bg-background px-2 sm:border-0 py-2 sm:bg-transparent justify-between">
            <div className="flex items-center gap-4 justify-center h-full">
                <SidebarTrigger />
                <Breadcrumb className="flex">
                    <BreadcrumbList>
                        {title.map((link, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbPage className="capitalize">
                                        {link}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>

                                {index < title.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-2 h-full">
                {/* <Translation /> */}
                <ToggleMode className="size-7 rounded-xl" />
                {user ? (
                    <UserButton />
                ) : (
                    <Skeleton className="size-7 rounded-full" />
                )}
            </div>
        </header>
    );
}
