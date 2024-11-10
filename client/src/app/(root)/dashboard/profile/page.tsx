/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
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
import { GET_FOLLOWER_URL, GET_FOLLOWING_URL, GET_USER_DS_COMMIT_COMPLETED_URL } from "@/lib/constants";
import Image from "next/image";
import WebcamComponent from "@/components/ui/webcam";
import { cn } from "@/lib/utils";

type Commit = {
    _id: string;
    title: string;
    caption: string;
    content: string;
    isCompleted: boolean;
};

const ProfilePage = () => {
    const { session, status } = useAuthenticates();

    const [cameraShown, setCameraShown] = useState(false);
    const [commitToDelete, setCommitToDelete] = useState<Commit | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [commits, setCommits] = useState<Commit[]>([]);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

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

    const [image, setImage] = useState<File | null>(null);

    const handleDeleteClick = (commit: Commit) => {
        setCommitToDelete(commit);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (commitToDelete) {
            setCommits(
                commits.filter((commit) => commit._id !== commitToDelete._id),
            );
        }
        setIsDeleteDialogOpen(false);
        setCommitToDelete(null);
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

                const followerResponse = await axios.get(
                    `${GET_FOLLOWER_URL}?email=${session?.user?.email}`,
                );
                setFollowerCount(followerResponse.data.data.length);

                const followingResponse = await axios.get(
                    `${GET_FOLLOWING_URL}?email=${session?.user?.email}`,
                );
                setFollowingCount(followingResponse.data.data.length);
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
                    <p className="text-2xl font-bold">{followerCount}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">{followingCount}</p>
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
                            {cameraShown && (
                                <WebcamComponent
                                    image={image}
                                    setImage={setImage}
                                    show={cameraShown}
                                    setShow={setCameraShown}
                                    session={session}
                                    commitCaption={commit.caption}
                                    postId={commit._id}
                                />
                            )}
                            <CardContent className="p-0">
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={commit.content}
                                        alt={`Image of ${commit.title}`}
                                        className="object-cover"
                                        fill
                                    />
                                    <Trash2 className="absolute top-2 left-2 h-6 w-6 text-red-600 bg-black rounded-full p-1 cursor-pointer" />
                                    <Camera
                                        className={cn("absolute top-2 right-2 h-6 w-6 text-white bg-black rounded-full p-1 cursor-pointer", commit.isCompleted ? "hidden" : "")}
                                        onClick={() =>
                                            setCameraShown(!cameraShown)
                                        }
                                    />
                                </div>
                                <div className="p-3 space-y-2">
                                    <h3 className={cn("font-medium text-sm text-gray-800", commit.isCompleted ? "line-through" : "")}>
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
