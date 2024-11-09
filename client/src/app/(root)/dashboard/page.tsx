"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import Report from "@/components/dashboard/report";
import DashboardTable from "@/components/dashboard/table";

import { rupeeSymbol } from "@/lib/utils";

export default function Dashboard() {
    return (
        <main className="grid items-start gap-4 p-0 sm:p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <Card className="sm:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle>Connect Your Bank</CardTitle>
                            <CardDescription className="text-balance max-w-lg leading-relaxed">
                                Seamlessly connect your bank account for quick
                                and easy transaction management
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="bg-custom-blue hover:bg-blue-600 transition-all">
                                Connect Bank Account
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>This Week</CardDescription>
                            <CardTitle className="text-4xl">
                                10000
                                {rupeeSymbol}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>This Month</CardDescription>
                            <CardTitle className="text-4xl">
                                {rupeeSymbol}
                                10000
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
                        <CardContent className="font-medium">
                            <p>Tips</p>
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardContent className="p-4 h-full">
                            <div className="flex flex-col h-full">
                                <CardTitle className="text-lg capitalize mb-2">
                                    News
                                </CardTitle>
                                <div className="flex flex-1 gap-4">
                                    <div className="w-1/3 relative">
                                        {/* <Image
                                        src={tipsAndNews.news.image || PlaceholderImage}
                                        alt={tipsAndNews.news.headline}
                                        width={100}
                                        height={50}
                                        className="rounded object-fill h-full w-full"
                                        /> */}
                                    </div>
                                    <div className="w-2/3 flex flex-col justify-between">
                                        <CardDescription className="text-base">
                                            News
                                        </CardDescription>
                                        <a
                                            href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline mt-2"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
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
