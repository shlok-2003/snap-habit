"use client";

import Image from "next/image";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
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
import Loading from "@/components/ui/loading";
import { GET_USER_URL } from "@/lib/constants";
import { useAuthenticates } from "@/hooks/use-authenticate";

const bountyArr = [
    {
        title: "Plant a Tree",
        description: "We will plant one tree on your behalf",
        icon: <TreePine className="h-8 w-8" />,
        points: 70,
        image: "/images/plant-a-tree.avif",
    },
    {
        title: "Snap-Habit T Shirt",
        description: "Redeem high quality t-shirts",
        icon: <Shirt className="h-8 w-8" />,
        points: 5000,
        image: "/images/tshirt.jpeg",
    },
    {
        title: "Snap-Habit Cap",
        description: "Redeem high quality cap",
        icon: <ShoppingBag className="h-8 w-8" />,
        points: 6000,
        image: "/images/tshirt-cap.jpeg",
    },
    {
        title: "Premium Bundle",
        description: "T-shirt + Cap",
        icon: <Star className="h-8 w-8" />,
        points: 8000,
        image: "/images/tshirt-cap.jpeg",
    },
    {
        title: "Digital Badge",
        description: "Exclusive Snap-habit Badge",
        icon: <Award className="h-8 w-8" />,
        points: 2000,
        image: "/images/badge.jpeg",
    },
    {
        title: "Mystery Box",
        description: "Random Premium Reward",
        icon: <Gift className="h-8 w-8" />,
        points: 5500,
        image: "/images/mystery-box.jpeg",
    },
    {
        title: "Premium Stickers",
        description: "Limited Edition Pack",
        icon: <Sticker className="h-8 w-8" />,
        points: 1500,
        image: "/images/green-stickers.jpg",
    },
];

const BountyPage = () => {
    const { session, status } = useAuthenticates();

    const [score, setScore] = useState(0);

    useEffect(() => {
        if (status === "loading") return;

        const getScore = async () => {
            const response = await axios.get(`${GET_USER_URL}?email=${session?.user?.email}`);
            setScore(response.data.data.score);
        };

        getScore();
    }, [status, session]);

    if (status === "loading") return <Loading />;

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
                        <span className="text-3xl font-bold">{score}</span>
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
                                    objectFit="contain"
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
