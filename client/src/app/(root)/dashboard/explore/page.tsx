"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Component() {
    const rituals = [
        {
            title: "Drink Water",
            image: "/placeholder.svg?height=200&width=300",
            description: "sdfsdfsdf",
        },
        {
            title: "Watch Sunrise",
            image: "/placeholder.svg?height=200&width=300",
            description: "sdfsdfsdf",
        },
        {
            title: "Breakfast",
            image: "/placeholder.svg?height=200&width=300",
            description: "sdfsdfsdf",
        },
        {
            title: "Walk pet 🐕",
            image: "/placeholder.svg?height=200&width=300",
            description: "sdfsdfsdf",
        },
        {
            title: "Yoga morning",
            image: "/placeholder.svg?height=200&width=300",
            description: "sdfsdfsdf",
        },
        {
            title: "Coffee time ☕",
            image: "/placeholder.svg?height=200&width=300",
            description: "sdfsdfsdf",
        },
    ];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [opennewRitual, setOpenNewRitual] = useState(false);
    const [openSelectedRitual, setOpenSelectedRitual] = useState(false);

    const [selectedRitual, setSelectedRitual] = useState({
        title: "",
        description: "",
        image: "",
    });

    const [newRitual, setNewRitual] = useState(rituals);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const newRitualObject = {
            title,
            image: image || "/placeholder.svg?height=200&width=300",
            description,
        };
        setNewRitual([...rituals, newRitualObject]);
        setTitle("");
        setDescription("");
        setImage("");
        setOpenNewRitual(false);
    };

    const openFileExplorer = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="space-y-2 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                    <span className="inline-block animate-bounce-slow">🌟</span>{" "}
                    Ritual Revolution
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Transform your day with powerful rituals. Choose your first
                    or create your own journey.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {newRitual.map((ritual, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => {
                            setSelectedRitual(ritual);
                            setOpenSelectedRitual(true);
                        }}
                    >
                        <CardContent className="p-0">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={ritual.image}
                                    alt={`Image of ${ritual.title}`}
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <div className="p-3 space-y-2">
                                <h3 className="font-medium text-sm text-gray-800">
                                    {ritual.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                    {/* Additional content if needed */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog
                open={openSelectedRitual}
                onOpenChange={(open) => setOpenSelectedRitual(open)}
            >
                {selectedRitual && (
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-gray-700">
                                I hereby commit to
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                            <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                <Image
                                    src={selectedRitual.image}
                                    alt={`Selected Ritual: ${selectedRitual.title}`}
                                    className="object-cover"
                                    fill
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {selectedRitual.title}
                                </h2>
                                <p className="text-sm text-gray-700">
                                    {selectedRitual.description}
                                </p>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    {/* Additional content if needed */}
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() => setSelectedRitual(null)} // Close dialog on button click
                            >
                                Commit to Ritual
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>

            <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
                <Card className="bg-gray-100 border-gray-200 shadow-md">
                    <CardContent className="py-2 px-4">
                        <p
                            className="text-sm text-gray-700"
                            onClick={() => setOpenNewRitual(true)}
                        >
                            Couldn&apos;t find what you want?
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={opennewRitual}
                onOpenChange={(open) => setOpenNewRitual(open)}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl text-gray-700">
                            Create a New Ritual
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="relative h-64 w-full rounded-lg overflow-hidden">
                            <div>
                                <Button onClick={openFileExplorer}>
                                    Add Image
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {image && (
                                    <Image
                                        src={image}
                                        alt="Selected Ritual"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                placeholder="Ritual Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// <style>
//   @keyframes bounce-slow {
//     0%, 100% {
//       transform: translateY(-25%);
//       animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
//     }
//     50% {
//       transform: translateY(0);
//       animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
//     }
//   }
//   .animate-bounce-slow {
//     animation: bounce-slow 3s infinite;
//   }
// </style>
