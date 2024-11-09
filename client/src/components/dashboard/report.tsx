/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinearChart from "@/components/ui/linear-chart";

export default function Report() {
    const [weekData, setWeekData] = useState([
        { name: "Monday", value: 23 },
        { name: "Tuesday", value: 24 },
        { name: "Wednesday", value: 45 },
        { name: "Thursday", value: 46 },
    ]);
    const [monthData, setMonthData] = useState([
        { name: "January", value: 34 },
        { name: "February", value: 45 },
        { name: "March", value: 56 },
        { name: "April", value: 7 },
    ]);

    return (
        <Tabs defaultValue="week">
            <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>

            <TabsContent value="week">
                <LinearChart
                    data={weekData}
                />
            </TabsContent>

            <TabsContent value="month">
                <LinearChart
                    data={monthData}
                    tickSize={6}
                />
            </TabsContent>
        </Tabs>
    );
}
