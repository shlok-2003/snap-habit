/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, ClipboardCopy, Delete, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/ui/loading";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useAuthenticates } from "@/hooks/use-authenticate";
import axios from "axios";
import { GET_USER_DS_COMMIT_COMPLETED_URL } from "@/lib/constants";
import Image from "next/image";

type Commit = {
    id: number;
    title: string;
    caption: string;
    content: string;
};

const ProfilePage = () => {
    const { session, status } = useAuthenticates();

    const [commitToDelete, setCommitToDelete] = useState<Commit | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [commits, setCommits] = useState<Commit[]>([]);

    const handleShare = () => {
        const profileUrl = `${window.location.origin}/profile/username`;
        navigator.clipboard.writeText(profileUrl).then(() => {
            toast({
                title: "Profile URL Copied",
                description:
                    "The profile URL has been copied to your clipboard.",
            });
        });
    };

    // const [openedComit, setOpenedComit] = useState<Comit>()
    const [image, setImage] = useState<File | null>(null);
    const handleFileInput = useRef<HTMLInputElement>(null);

    const handleDeleteClick = (commit: Commit) => {
        setCommitToDelete(commit);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (commitToDelete) {
            setCommits(
                commits.filter((commit) => commit.id !== commitToDelete.id),
            );
        }
        setIsDeleteDialogOpen(false);
        setCommitToDelete(null);
    };

    // const handleImageClick = async () => {

    // }

    const handleCameraClick = () => {
        handleFileInput.current?.click();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (!session) return;

        const fetchCommits = async () => {
            try {
                const response = await axios.get(
                    `${GET_USER_DS_COMMIT_COMPLETED_URL}?email=${session?.user?.email}`,
                );
                const result = response.data.data;
                console.log(response);
                setCommits(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCommits();
    }, [session]);

    if (status === "loading") return <Loading />;

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-24 h-24">
                            {session?.user?.image && (
                                <AvatarImage
                                    src={session?.user?.image}
                                    alt="User profile"
                                />
                            )}
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold">
                            {session?.user?.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {session?.user?.email}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={handleShare}>
                        <ClipboardCopy className="mr-2 h-4 w-4" />
                        Share Profile
                    </Button>
                </CardFooter>
            </Card>

            <div className="mt-6 flex justify-center space-x-8">
                <div className="text-center">
                    <p className="text-2xl font-bold">1.5K</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">500</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">All Rituals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {commits.map((commit, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <CardContent className="p-0">
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={commit.content}
                                        alt={`Image of ${commit.title}`}
                                        className="object-cover"
                                        fill
                                    />
                                    <Trash2 className="absolute top-2 left-2 h-6 w-6 text-red-600 bg-black rounded-full p-1 cursor-pointer" />
                                    <Camera className="absolute top-2 right-2 h-6 w-6 text-white bg-black rounded-full p-1 cursor-pointer" onClick={handleCameraClick}/>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        ref={handleFileInput}
                                    />
                                </div>
                                <div className="p-3 space-y-2">
                                    <h3 className="font-medium text-sm text-gray-800">
                                        {commit.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                        {/* Additional content if needed */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {`Are you sure you want to delete the commit ${commitToDelete?.title}`}
                        ?
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProfilePage;
