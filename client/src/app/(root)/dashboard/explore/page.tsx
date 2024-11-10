"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
    COMMIT_RITUAL_URL,
    CREATE_RITUAL_URL,
    GET_RITUALS_URL,
} from "@/lib/constants";
import { useAuthenticates } from "@/hooks/use-authenticate";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/ui/loading";

interface Ritual {
    title: string;
    content: string;
    caption: string;
}

type RitualWithScore = Ritual & { score: number };

export default function Component() {
    const { session, status } = useAuthenticates();

    const [ritual, setRitual] = useState<RitualWithScore[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [opennewRitual, setOpenNewRitual] = useState(false);

    const [openSelectedRitual, setOpenSelectedRitual] = useState(false);

    const [selectedRitual, setSelectedRitual] = useState<RitualWithScore | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSave = async () => {
        if (status === "loading") return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("caption", description);
        if (image) {
            formData.append("content", image);
        }

        const newRitualObject = {
            title,
            content: image,
            caption: description,
        };

        await axios.post(
            `${CREATE_RITUAL_URL}?email=${session?.user?.email}`,
            newRitualObject,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        toast({
            title: "Ritual Created Successfully",
            description: "You can now view your ritual in your dashboard",
            variant: "default",
        });

        setTitle("");
        setDescription("");
        setImage(null);
        setOpenNewRitual(false);
    };

    const openFileExplorer = () => {
        fileInputRef.current?.click();
    };

    const handleCommitRitual = async () => {
        if (status === "loading") return;

        console.log("selectedRitual", selectedRitual);

        try {
            await axios.post(`${COMMIT_RITUAL_URL}?email=${session?.user?.email}`, {
                title: selectedRitual?.title,
                caption: selectedRitual?.caption,
                content: selectedRitual?.content,
                score: selectedRitual?.score,
            });
        } catch (error) {
            console.log(error);
        }

        toast({
            title: "Ritual Added Successfully",
            description: "You can preview view your ritual in your dashboard",
            variant: "default",
        });
        setOpenSelectedRitual(false);
    };

    useEffect(() => {
        if (!session) return;

        const fetchRituals = async () => {
            try {
                const response = await axios.get(
                    `${GET_RITUALS_URL}?email=levelupmonk18@gmail.com`,
            );
            const result = response.data.data;
                // console.log(response.data);
                setRitual(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRituals();
    }, [session]);

    if (status === "loading") return <Loading />;

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ritual.map((ritual, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => {
                            console.log(ritual);
                            setSelectedRitual(ritual);
                            setOpenSelectedRitual(true);
                        }}
                    >
                        <CardContent className="p-0">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={ritual.content}
                                    alt={`Image of ${ritual.title}`}
                                    className="object-cover rounded-lg"
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
                                {selectedRitual && (
                                    <Image
                                        src={selectedRitual.content}
                                        alt={`Selected Ritual: ${selectedRitual.title}`}
                                        className="object-cover rounded-lg"
                                        fill
                                        objectFit="cover"
                                    />
                                )}
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {selectedRitual.title}
                                </h2>
                                <p className="text-sm text-gray-700">
                                    {selectedRitual.caption}
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
                                onClick={() => handleCommitRitual()} // Close dialog on button click
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
                            <div className="flex items-center justify-center h-full">
                                {image === null && (
                                    <Button onClick={openFileExplorer}>
                                        Add Image
                                    </Button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="content"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {image && (
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Selected Ritual"
                                        layout="fill"
                                        objectFit="contain"
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
