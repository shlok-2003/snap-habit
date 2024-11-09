"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear area chart";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--custom-orange)",
    },
} satisfies ChartConfig;

interface LinearChartProps {
    data: { name: string; value: number }[];
    tickSize?: number;
}

export default function LinearChart({ data, tickSize = 3 }: LinearChartProps) {
    return (
        <Card>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            interval={0}
                            tickFormatter={(value) => value.slice(0, tickSize)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="value"
                            type="linear"
                            fill="var(--custom-dark-orange)"
                            fillOpacity={0.4}
                            stroke="var(--custom-dark-orange)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
