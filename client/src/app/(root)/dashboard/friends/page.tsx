"use client";

import { useState, Fragment, useEffect } from "react";
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
import axios from "axios";
import { useAuthenticates } from "@/hooks/use-authenticate";
import {
    FOLLOW_USERS_URL,
    GET_ALL_USERS_URL,
    GET_FOLLOWER_URL,
    GET_FOLLOWING_URL,
} from "@/lib/constants";
import Loading from "@/components/ui/loading";
import { Session } from "next-auth";

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    score: number;
}

interface UserCardProps {
    user: User;
    onClick: () => void;
}

const UserCard = ({ user, onClick }: UserCardProps) => (
    <Card
        className="w-full max-w-sm cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={onClick}
    >
        <CardContent className="p-6">
            <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                    />
                    <AvatarFallback>
                        {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-4 w-4" />
                        {user.email}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

interface UserDialogProps {
    user: User;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const UserDialog = ({ user, isOpen, setIsOpen }: UserDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex justify-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage
                            src={user.image || "/placeholder.svg"}
                            alt={user.name}
                        />
                        <AvatarFallback>
                            {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="grid gap-2">
                    <div className="font-semibold">{user.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                        {user.email}
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

interface FollowDialogProps {
    users: User[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onFollow: (user: User) => void;
    session: Session;
}

const FollowDialog = ({
    users,
    isOpen,
    setIsOpen,
    onFollow,
    session,
}: FollowDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Follow Other Users</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
                {users &&
                    users?.map((user, index) => {
                        if (session.user?.email === user.email) return null;

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between py-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage
                                            src={
                                                user.image || "/placeholder.svg"
                                            }
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {user?.name &&
                                                user.name
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">
                                            {user.name}
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
                        );
                    })}
            </div>
        </DialogContent>
    </Dialog>
);

const UsersComponent = () => {
    const { session, status } = useAuthenticates();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [isFollowDialogOpen, setIsFollowDialogOpen] = useState(false);

    const [result, setResult] = useState([]); // set followers
    const [allUsers, setAllUsers] = useState([]); // set all Users

    useEffect(() => {
        if (!session) return;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${GET_FOLLOWING_URL}?email=${session?.user?.email}`,
                );
                const { data: allUsers } = await axios.get(
                    `${GET_ALL_USERS_URL}`,
                );

                setResult(data.data);
                setAllUsers(allUsers.data);

                console.log(allUsers.data, "allUsers");
                console.log(data.data, "data");
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [session]);

    console.log(result);
    const filteredUsers = result.users?.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsUserDialogOpen(true);
    };

    const handleFollowClick = () => {
        setIsFollowDialogOpen(true);
    };

    const handleFollow = async (user) => {
        // Implement follow logic here
        if (!session && !user) return;
        try {
            const { data } = await axios.post(
                `${FOLLOW_USERS_URL}/${user._id}?email=${session?.user?.email}`,
            );
            console.log(`Following ${data}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (status === "loading") return <Loading />;

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
                    {filteredUsers?.length > 0 ? (
                        filteredUsers?.map((user, index) => (
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
                users={allUsers}
                isOpen={isFollowDialogOpen}
                setIsOpen={setIsFollowDialogOpen}
                onFollow={handleFollow}
                session={session}
            />
        </Fragment>
    );
};

export default UsersComponent;
