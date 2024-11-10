"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

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
import { useAuthenticates } from "@/hooks/use-authenticate";
import Loading from "../ui/loading";
import Image from "next/image";

export default function Header() {
    const { session, status } = useAuthenticates();

    const pathname = usePathname();
    const title = pathname.split("/").slice(1);

    if (status === "loading") return <Loading />;

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
                {session?.user?.image ? (
                    <Image
                        src={session?.user?.image}
                        alt="User profile"
                        width={40}
                        height={40}
                        objectFit="cover"
                        style={{ borderRadius: "50%" }}
                    />
                ) : (
                    <Skeleton className="size-7 rounded-full" />
                )}
            </div>
        </header>
    );
}
