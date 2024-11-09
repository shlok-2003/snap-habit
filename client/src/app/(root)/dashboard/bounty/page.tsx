"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Gift,
    Star,
    TreePine,
    ShoppingBag,
    Shirt,
    Award,
    Sticker,
} from "lucide-react";
import useScoreStore from "@/store/useScoreStore";

const bountyArr = [
    {
        title: "Plant a Tree",
        description: "We will plant one tree on your behalf",
        icon: <TreePine className="h-8 w-8" />,
        points: 70,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        title: "Snap-Habit T Shirt",
        description: "Redeem high quality t-shirts",
        icon: <Shirt className="h-8 w-8" />,
        points: 5000,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        title: "Snap-Habit Cap",
        description: "Redeem high quality cap",
        icon: <ShoppingBag className="h-8 w-8" />,
        points: 6000,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        title: "Premium Bundle",
        description: "T-shirt + Cap",
        icon: <Star className="h-8 w-8" />,
        points: 8000,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        title: "Digital Badge",
        description: "Exclusive Snap-habit Badge",
        icon: <Award className="h-8 w-8" />,
        points: 2000,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        title: "Mystery Box",
        description: "Random Premium Reward",
        icon: <Gift className="h-8 w-8" />,
        points: 5500,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        title: "Premium Stickers",
        description: "Limited Edition Pack",
        icon: <Sticker className="h-8 w-8" />,
        points: 1500,
        image: "/placeholder.svg?height=200&width=200",
    },
];

const BountyPage = () => {
    const score = useScoreStore((state) => state.score);

    return (
        <div className="min-h-screen bg-background p-6">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Your Points
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-yellow-500" />
                        <span className="text-3xl font-bold">263</span>
                    </div>
                </CardContent>
            </Card>

            <Separator className="my-8" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bountyArr.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="mb-4 flex justify-between">
                                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                                        {item.icon}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="h-4 w-4 rounded-full bg-yellow-500" />
                                        <span className="font-bold">
                                            {item.points}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-2 font-bold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                                <Button
                                    className={`mt-4 w-full ${score < item.points ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={score < item.points}
                                >
                                    Redeem
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BountyPage;
