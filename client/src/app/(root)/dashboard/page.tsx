/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { Activity, Flame, Footprints, Moon } from "lucide-react";
import { useEffect, useState } from "react";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import Loading from "@/components/ui/loading";
import LinearChart from "@/components/ui/linear-chart";
import CircularProgress from "@/components/ui/circular-progress";

import { useAuthenticates } from "@/hooks/use-authenticate";
import {
    GET_FIT_ACTIVITIES_URL,
    GET_FIT_CALORIES_URL,
    GET_FIT_SLEEP_URL,
    GET_FIT_STEPS_URL,
    GET_USER_DS_COMMIT_COMPLETED_URL,
    GET_USER_STREAK_URL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { makeAuthenticatedRequest } from "@/lib/axios-config";

interface FitnessData {
    steps: number;
    activities: string;
    sleep: number;
    calories: number;
}

export default function Dashboard() {
    const { session, status } = useAuthenticates();

    const [commitsCompleted, setCommitsCompleted] = useState<number>(0);
    const [totalCommits, setTotalCommits] = useState<number>(0);
    const [dailyStreak, setDailyStreak] = useState<number>(0);
    const [fitnessData, setFitnessData] = useState<FitnessData>({
        steps: 0,
        activities: "",
        sleep: 0,
        calories: 0,
    });

    const healthData = [
        {
            title: "Steps",
            icon: Footprints,
            value: "10,234",
            color: "text-blue-500",
        },
        {
            title: "Activities",
            icon: Activity,
            value: "5 hours",
            color: "text-green-500",
        },
        {
            title: "Sleep",
            icon: Moon,
            value: "7h 24m",
            color: "text-purple-500",
        },
        {
            title: "Calories",
            icon: Flame,
            value: "2,543",
            color: "text-orange-500",
        },
    ];

    useEffect(() => {
        if (status === "loading") return;

        const fetch = async () => {
            try {
                const response = await axios.get(
                    `${GET_USER_DS_COMMIT_COMPLETED_URL}?email=${session?.user?.email}`,
                );
                const result = response.data.data;

                console.log(result);
                const completed = result.filter(
                    (post: any) => post.isCompleted,
                );
                console.log(completed);
                setCommitsCompleted(completed.length);
                setTotalCommits(result.length);

                const dailyStreakResponse = await axios.get(
                    `${GET_USER_STREAK_URL}?email=${session?.user?.email}`,
                );
                const dailyStreakResult = dailyStreakResponse.data.data.streak;
                console.log(dailyStreakResult);
                setDailyStreak(dailyStreakResult);

                const gFittSteps = await makeAuthenticatedRequest(GET_FIT_STEPS_URL);
                const gFittActivities = await makeAuthenticatedRequest(GET_FIT_ACTIVITIES_URL);
                const gFittSleep = await makeAuthenticatedRequest(GET_FIT_SLEEP_URL);
                const gFittCalories = await makeAuthenticatedRequest(GET_FIT_CALORIES_URL);

                setFitnessData({
                    steps: gFittSteps.steps[gFittSteps.steps.length - 1].value,
                    activities: gFittActivities.activities[gFittActivities.activities.length - 1].activities[0].type,
                    sleep: 0,
                    calories: gFittCalories.calories[gFittCalories.calories.length - 1].value,
                });
                console.log({
                    gFittSteps,
                    gFittActivities,
                    gFittSleep,
                    gFittCalories,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetch();
    }, [status, session]);

    if (status === "loading") return <Loading />;

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
                                {commitsCompleted} / {totalCommits}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Daily Streak</CardDescription>
                            <CardTitle className="lg:text-3xl md:text-2xl text-xl flex flex-row items-center justify-start gap-2">
                                <Flame
                                    className={cn(
                                        dailyStreak > 0 &&
                                            "text-custom-dark-orange fill-custom-dark-orange",
                                    )}
                                />{" "}
                                {dailyStreak}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(fitnessData).map(([key, value]) => (
                        <Card key={key} className="overflow-hidden">
                            <CardHeader
                                className={`flex flex-row items-center justify-between space-y-0 pb-2 text-custom-dark-orange`}
                            >
                                <CardTitle className="text-sm font-medium">
                                    {key}
                                </CardTitle>
                                {/* <item.icon className="h-4 w-4" /> */}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {value}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="flex md:flex-row gap-4 flex-col pb-5">
                    <Card className="flex-1">
                        <CardContent className="font-medium h-full relative">
                            <CardHeader>
                                <CardTitle>Daily Score</CardTitle>
                            </CardHeader>
                            <CircularProgress
                                progress={
                                    (commitsCompleted /
                                        (totalCommits == 0
                                            ? 1
                                            : totalCommits)) *
                                    100
                                }
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
            </div>
        </main>
    );
}
