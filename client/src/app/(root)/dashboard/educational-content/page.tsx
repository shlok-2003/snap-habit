"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

const videos = [
    {
        id: 1,
        title: "Maximum Points You Can Obtain from Cards | 2 Pointers",
        channel: "take U forward",
        views: "97K views",
        timestamp: "7 months ago",
        duration: "11:13",
        thumbnail: "/placeholder.svg?height=200&width=360",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        title: "I bought my Dream House!",
        channel: "Mrwhosetheboss",
        views: "1.6M views",
        timestamp: "16 hours ago",
        duration: "16:26",
        thumbnail: "/placeholder.svg?height=200&width=360",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        title: "Build your own Zapier - System Design",
        channel: "Piyush Garg",
        views: "5.3K views",
        timestamp: "17 hours ago",
        duration: "22:14",
        thumbnail: "/placeholder.svg?height=200&width=360",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 4,
        title: "*Software Engineer* Day In The Life | OFFICE VLOG",
        channel: "Moshware",
        views: "20K views",
        timestamp: "8 months ago",
        duration: "6:12",
        thumbnail: "/placeholder.svg?height=200&width=360",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 5,
        title: "How to Notify Team on Microsoft Teams for Failed Instamojo Payment",
        channel: "Pabbly",
        views: "43 views",
        timestamp: "2 days ago",
        duration: "13:11",
        thumbnail: "/placeholder.svg?height=200&width=360",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 6,
        title: "MERN Stack E-commerce Integration",
        channel: "6 Pack Programmer",
        views: "39K views",
        timestamp: "10 months ago",
        duration: "7:32:02",
        thumbnail: "/placeholder.svg?height=200&width=360",
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

const VideoCard = ({ video }) => (
    <Card className="bg-transparent border-none shadow-none group cursor-pointer">
        <div className="relative">
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover rounded-xl"
            />
            <div className="absolute bottom-2 right-2 px-1 py-0.5 bg-black/80 text-white text-xs rounded">
                {video.duration}
            </div>
        </div>
        <div className="flex gap-2 mt-3">
            <Avatar className="h-9 w-9 rounded-full">
                <AvatarImage src={video.avatar} />
                <AvatarFallback>{video.channel[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-medium line-clamp-2 text-sm">
                    {video.title}
                </h3>
                <div className="text-sm text-muted-foreground mt-1">
                    <p>{video.channel}</p>
                    <p>
                        {video.views} • {video.timestamp}
                    </p>
                </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </button>
        </div>
    </Card>
);

export default function Component() {
    return (
        <div className="dark p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}
