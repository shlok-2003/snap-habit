/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface Video {
    title: string;
    yt_url: string;
    image: string;
    channel_name: string;
    publish_date: string;
    view_count: number;
    like_count: number;
}

const videos: Video[] = [
    {
        "title": "Understanding Carbon Footprints",
        "yt_url": "http://www.youtube.com/watch?v=a9yO-K8mwL0",
        "image": "/educational/carbon-footprint.jpg",
        "channel_name": "BBC News",
        "publish_date": "2021-04-22",
        "view_count": 274169,
        "like_count": 2784
    },
    {
        "title": "Sustainable Living 101",
        "yt_url": "http://www.youtube.com/watch?v=YLHqQabOuac",
        "image": "/educational/sustainable-living.jpg",
        "channel_name": "Eco Bravo",
        "publish_date": "2024-01-17",
        "view_count": 102,
        "like_count": 4
    },
    {
        "title": "How to Reduce Waste in Daily Life",
        "yt_url": "http://www.youtube.com/watch?v=OagTXWfaXEo",
        "image": "/educational/reduce-waste.jpg",
        "channel_name": "Lavendaire",
        "publish_date": "2017-10-18",
        "view_count": 4371918,
        "like_count": 169927
    },
    {
        "title": "Eco-Friendly Transportation Options",
        "yt_url": "http://www.youtube.com/watch?v=LVYvnsw6fGQ",
        "image": "/educational/eco-transport.jpg",
        "channel_name": "Living in Colorado",
        "publish_date": "2024-03-19",
        "view_count": 2,
        "like_count": 0
    },
    {
        "title": "Recycling Best Practices",
        "yt_url": "http://www.youtube.com/watch?v=9f-UE3xel0U",
        "image": "/educational/recycling.jpg",
        "channel_name": "ORNL Supplementary Videos",
        "publish_date": "2015-04-10",
        "view_count": 273,
        "like_count": 4
    },
    {
        "title": "The Importance of Green Energy",
        "yt_url": "http://www.youtube.com/watch?v=RnvCbquYeIM",
        "image": "/educational/green-energy.jpg",
        "channel_name": "TED-Ed",
        "publish_date": "2017-12-07",
        "view_count": 2616518,
        "like_count": 42696
    },
    {
        "title": "Water Conservation Tips",
        "yt_url": "http://www.youtube.com/watch?v=5J3cw4biWWo",
        "image": "/educational/water-conservation.jpg",
        "channel_name": "DwrCymruWelshWater",
        "publish_date": "2018-06-28",
        "view_count": 198204,
        "like_count": 1388
    },
    {
        "title": "Eco-Friendly Shopping Guide",
        "yt_url": "http://www.youtube.com/watch?v=3jQWEXuR9Yw",
        "image": "/educational/eco-shopping.jpg",
        "channel_name": "Elfinic",
        "publish_date": "2024-05-29",
        "view_count": 104,
        "like_count": 0
    }
]

const VideoCard = ({ video }: { video: Video }) => (
    <Card className="bg-transparent border-none shadow-none group cursor-pointer">
        <div className="relative">
            <Link href={video.yt_url} target="_blank">
                <img
                    src={video.image}
                    alt={video.title}
                    className="w-full aspect-video object-cover rounded-xl"
                />
                </Link>
            {/* <Link href={video.yt_url} target="_blank">
                <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-white" />
            </Link> */}
        </div>
        <div className="flex gap-2 mt-3 px-2">
            <Avatar className="h-9 w-9 rounded-full">
                <AvatarImage src={video.image} />
                <AvatarFallback>{video.channel_name}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-medium line-clamp-2 text-sm">
                    {video.title}
                </h3>
                <div className="text-sm text-muted-foreground mt-1">
                    <p>{video.channel_name}</p>
                    <p>
                        {video.view_count} • {video.publish_date}
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
                    <VideoCard key={video.yt_url} video={video} />
                ))}
            </div>
        </div>
    );
}
