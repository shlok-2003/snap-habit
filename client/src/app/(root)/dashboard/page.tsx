"use client";

import { useUser } from "@clerk/nextjs";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Flame } from "lucide-react";

import Loading from "@/components/ui/loading";
import Report from "@/components/dashboard/report";
import DashboardTable from "@/components/dashboard/table";

export default function Dashboard() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <Loading />;

    return (
        <main className="grid items-start gap-4 p-0 sm:p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <Card className="sm:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="lg:text-3xl md:text-2xl">
                                Good Morning{" "}
                                <span className="text-custom-dark-orange">
                                    {user?.firstName}
                                </span>
                                !
                            </CardTitle>
                            <CardDescription className="text-balance max-w-lg leading-relaxed">
                                Remember, consistency is key. Keep pushing towards
                                your goals every day!
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Commits Completed</CardDescription>
                            <CardTitle className="lg:text-3xl md:text-2xl">
                                {2} / {10}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Daily Streak</CardDescription>
                            <CardTitle className="lg:text-3xl md:text-2xl flex flex-row gap-2">
                                <Flame height={"2.2rem"} width={"2.2rem"} />{" "}
                                {20}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <div className="flex md:flex-row gap-4 flex-col">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Tip of the Day</CardTitle>
                            <CardDescription>Tips</CardDescription>
                        </CardHeader>
                        <CardContent className="font-medium"></CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Tip of the Day</CardTitle>
                            <CardDescription>Tips</CardDescription>
                        </CardHeader>
                        <CardContent className="font-medium"></CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    <DashboardTable weekly={[]} monthly={[]} yearly={[]} />

                    <Report />
                </div>
            </div>
        </main>
    );
}
