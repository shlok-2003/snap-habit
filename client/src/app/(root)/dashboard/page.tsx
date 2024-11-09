"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Flame } from "lucide-react";

import Loading from "@/components/ui/loading";
import LinearChart from "@/components/ui/linear-chart";
import CircularProgress from "@/components/ui/circular-progress";
import { useAuthenticates } from "@/hooks/use-authenticate";

export default function Dashboard() {
    const { session, status } = useAuthenticates();

    if (status === "loading") return <Loading />;

    console.log(session);

    return (
        <main className="grid items-start gap-4 p-0 sm:p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                    <Card className="col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="lg:text-3xl md:text-2xl">
                                Good Morning{" "}
                                <span className="text-custom-dark-orange">
                                    {session?.user?.name?.split(" ")[0]}
                                </span>
                                !
                            </CardTitle>
                            <CardDescription className="text-balance max-w-lg leading-relaxed">
                                Remember, consistency is key. Keep pushing
                                towards your goals every day!
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Commits Completed</CardDescription>
                            <CardTitle className="lg:text-3xl md:text-2xl text-xl">
                                {2} / {10}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Daily Streak</CardDescription>
                            <CardTitle className="lg:text-3xl md:text-2xl text-xl flex flex-row items-center justify-start gap-2">
                                <Flame className="" />{" "}
                                {20}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <div className="flex md:flex-row gap-4 flex-col">
                    <Card className="flex-1">
                        <CardContent className="font-medium h-full relative">
                            <CardHeader>
                                <CardTitle>Daily Score</CardTitle>
                            </CardHeader>
                            <CircularProgress
                                progress={61}
                                className="flex justify-center items-center"
                            />
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Weekly Score</CardTitle>
                        </CardHeader>
                        <CardContent className="font-medium">
                            <LinearChart
                                data={[
                                    { name: "Mon", value: 10 },
                                    { name: "Tue", value: 50 },
                                    { name: "Wed", value: 20 },
                                    { name: "Thu", value: 60 },
                                    { name: "Fri", value: 10 },
                                    { name: "Sat", value: 60 },
                                    { name: "Sun", value: 70 },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    
                </div>
            </div>
        </main>
    );
}
