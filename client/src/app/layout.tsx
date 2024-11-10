import type { Metadata } from "next";
import SessionWrapper from "@/components/session-provider";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
    title: "Snap Habit",
    description: "Track your habits with ease",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <SessionWrapper>
                    {/* <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}> */}
                            {children}
                        {/* </PersistGate>
                    </Provider> */}
                    <Toaster />
                </SessionWrapper>
            </body>
        </html>
    );
}
