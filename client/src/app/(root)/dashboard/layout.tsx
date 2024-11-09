"use client";

import { Open_Sans, Poppins } from "next/font/google";

import Header from "@/components/dashboard/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-open-sans",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SidebarProvider
                className={`${openSans.variable} ${poppins.variable} antialiased font-poppins`}
            >
                <AppSidebar />
                <main className="flex min-h-screen flex-col gap-4 w-full">
                    <Header />
                    {children}
                </main>
                <Toaster />
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default DashboardLayout;
