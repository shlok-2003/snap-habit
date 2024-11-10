"use client";

import { useState, Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Search, Mail, UserPlus, Star } from "lucide-react";
import Link from "next/link";

const UserCard = ({ user, onClick }) => (
    <Card
        className="w-full max-w-sm cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={onClick}
    >
        <CardContent className="p-6">
            <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={user.imageUrl || "/placeholder.svg"}
                        alt={user.fullName}
                    />
                    <AvatarFallback>
                        {user.fullName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="font-semibold">{user.fullName}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-4 w-4" />
                        {user.primaryEmailAddress.emailAddress}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

const UserDialog = ({ user, isOpen, setIsOpen }) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex justify-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage
                            src={user.imageUrl || "/placeholder.svg"}
                            alt={user.fullName}
                        />
                        <AvatarFallback>
                            {user.fullName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="grid gap-2">
                    <div className="font-semibold">{user.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                        {user.primaryEmailAddress.emailAddress}
                    </div>
                    <div className="flex items-center">
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>Score: {user.score}</span>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);

const FollowDialog = ({ users, isOpen, setIsOpen, onFollow }) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Follow Other Users</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-4"
                    >
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={user.imageUrl || "/placeholder.svg"}
                                    alt={user.fullName}
                                />
                                <AvatarFallback>
                                    {user.fullName.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">
                                    {user.fullName}
                                </h4>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Star className="mr-1 h-3 w-3 text-yellow-500" />
                                    <span>Score: {user.score}</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => onFollow(user)}
                            variant="outline"
                            size="sm"
                        >
                            Follow
                        </Button>
                    </div>
                ))}
            </div>
        </DialogContent>
    </Dialog>
);

const UsersComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [isFollowDialogOpen, setIsFollowDialogOpen] = useState(false);

    const result = {
        users: [
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: { emailAddress: "sanskarv2004@gmail.com" },
                score: 85,
            },
            {
                imageUrl: "",
                fullName: "John",
                primaryEmailAddress: { emailAddress: "john@example.com" },
                score: 92,
            },
            {
                imageUrl: "",
                fullName: "Doe",
                primaryEmailAddress: { emailAddress: "doe@example.com" },
                score: 78,
            },
        ],
    };

    const filteredUsers = result.users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsUserDialogOpen(true);
    };

    const handleFollowClick = () => {
        setIsFollowDialogOpen(true);
    };

    const handleFollow = (user) => {
        // Implement follow logic here
        console.log(`Following ${user.fullName}`);
    };

    return (
        <Fragment>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <h1 className="text-3xl font-bold">Amazing Minds</h1>
                    <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
                        <Button
                            onClick={handleFollowClick}
                            className="w-full sm:w-auto"
                        >
                            Follow Other Users
                        </Button>
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for amazing minds"
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <UserCard
                                key={index}
                                user={user}
                                onClick={() => handleUserClick(user)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <p className="mb-4 text-lg text-muted-foreground">
                                No users found.
                            </p>
                            <Button asChild>
                                <Link href="/sign-up">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Join to be the first
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {selectedUser && (
                <UserDialog
                    user={selectedUser}
                    isOpen={isUserDialogOpen}
                    setIsOpen={setIsUserDialogOpen}
                />
            )}
            <FollowDialog
                users={result.users}
                isOpen={isFollowDialogOpen}
                setIsOpen={setIsFollowDialogOpen}
                onFollow={handleFollow}
            />
        </Fragment>
    );
};

export default UsersComponent;
