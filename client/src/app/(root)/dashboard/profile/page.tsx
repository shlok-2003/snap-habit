"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ClipboardCopy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import Loading from "@/components/ui/loading";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Commit = {
    id: number;
    title: string;
    description: string;
    checked: boolean;
};

const ProfilePage = () => {
    const { user, isLoaded } = useUser();

    const [imageUrl, setImageUrl] = useState(
        "/placeholder.svg?height=100&width=100",
    );
    const [commitToDelete, setCommitToDelete] = useState<Commit | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { toast } = useToast();

    const [commits, setCommits] = useState<Commit[]>([
        {
            id: 1,
            title: "Initial commit",
            description: "Set up project structure",
            checked: false,
        },
        {
            id: 2,
            title: "Add user authentication",
            description: "Implemented login and registration",
            checked: false,
        },
        {
            id: 3,
            title: "Create profile page",
            description: "Added user profile page with edit functionality",
            checked: false,
        },
    ]);

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

    if (!user && !isLoaded) return <Loading />;

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage
                                src={user?.imageUrl}
                                alt="User profile"
                            />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold">{user?.fullName}</h2>
                        <p className="text-sm text-muted-foreground">
                            {user?.primaryEmailAddress?.emailAddress}
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
                <h3 className="text-xl font-bold mb-4">All Commits</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {commits.map((commit) => (
                            <TableRow
                                key={commit.id}
                                className={
                                    commit.checked
                                        ? "line-through opacity-50"
                                        : ""
                                }
                            >
                                <TableCell>{commit.title}</TableCell>
                                <TableCell>{commit.description}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            handleDeleteClick(commit)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
