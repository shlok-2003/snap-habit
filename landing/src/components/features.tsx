import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
    title: string;
    description: string;
    features: string[];
    image: string;
    flexDirection: "flex-row" | "flex-row-reverse";
};

const cards: FeatureCardProps[] = [
    {
        title: "Dashboard",
        description:
            "Dive into a detailed overview of your coding activity. Track your daily and weekly commits to monitor consistency, keep up streaks, and visualize progress over time. Stay motivated by viewing trends that help you set and reach your development goals.",
        features: [
            "Daily Commit Tracker",
            "Weekly Progress Overview",
            "Streak Maintenance",
        ],
        image: "/dashboard.png",
        flexDirection: "flex-row",
    },
    {
        title: "Profile",
        description:
            "Your personal space for live updates, sharing achievements, and collecting badges. Track your growth with live commits, make your journey shareable with friends, and earn badges to celebrate coding milestones, reflecting your ongoing accomplishments.",
        features: [
            "Live Commit Updates",
            "Shareable Profile",
            "Achievement Badges",
        ],
        image: "/dashboard.png",
        flexDirection: "flex-row-reverse",
    },
    {
        title: "Explore",
        description:
            "Discover new commit ideas and expand your coding repertoire. Explore recommended commits tailored to your skills, add personal goals, and create custom commits. This feature empowers you to build a coding journey that’s unique to you.",
        features: [
            "Recommended Commits",
            "Add New Commit",
            "Create Custom Commit",
        ],
        image: "/dashboard.png",
        flexDirection: "flex-row",
    },
];

export default function Features() {
    return (
        <section id="features" className="flex flex-col gap-8 mt-5">
            <Button
                className="self-center w-fit rounded-xl"
                style={{
                    mask: `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgb(0, 0, 0) 100%)`,
                }}
            >
                Features
            </Button>
            <div className="container self-center text-center max-w-2xl flex flex-col gap-4">
                <div className="text-4xl font-semibold max-lg:text-3xl max-md:text-xl max-md:px-2">
                    <span className="text-custom-orange">
                        Save time and energy
                    </span>{" "}
                    with Snap Habit
                </div>
                <div className="max-w-lg mx-auto text-lg max-md:text-sm m">
                    Reduce energy consumption, streamline sustainability
                    initiatives, and access all the data you need to drive
                    meaningful environmental impact effortlessly.
                </div>
            </div>

            <div className="flex flex-col gap-10 self-center">
                {cards.map((card, index) => (
                    <FeatureCard {...card} key={`card-${index}`} />
                ))}
            </div>
        </section>
    );
}

function FeatureCard({
    title,
    description,
    features,
    image,
    flexDirection,
}: FeatureCardProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <Card className="overflow-hidden max-w-5xl shadow-none border-none rounded-2xl max-md:divide-y-[0.5px] divide-black">
            <CardHeader className="sr-only">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="p-0 max-md:px-2">
                <div className={cn("flex", flexDirection, "max-md:flex-col")}>
                    <div className="p-6 md:p-8 lg:p-12">
                        <h2 className="text-2xl font-semibold tracking-tighter sm:text-3xl mb-4">
                            {title}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {description}
                        </p>
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li
                                    key={`feature-${index}`}
                                    className="flex items-center gap-3"
                                >
                                    <div className="rounded-full bg-primary/10 p-1">
                                        <Check className="size-5 text-custom-orange rounded-full ring-1 p-1 ring-custom-orange bg-custom-fade-orange" />
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-custom-fade-orange p-5 rounded-2xl overflow-hidden border">
                        {isMobile ? (
                            <img
                                src={image}
                                alt={image}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        ) : (
                            <motion.img
                                src={image}
                                alt={image}
                                className="w-full h-full object-cover rounded-2xl"
                                initial={{
                                    x:
                                        flexDirection === "flex-row"
                                            ? 300
                                            : -300,
                                    y: 300,
                                }}
                                whileInView={{
                                    x: flexDirection === "flex-row" ? 50 : -50,
                                    y: 50,
                                }}
                                viewport={{ once: true }}
                            />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
