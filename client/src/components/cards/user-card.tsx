"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

// import { IUser } from "@/database/user.model";

interface UserCardProps {
    user: {
        imageUrl: string;
        fullName: string;
        primaryEmailAddress: {
            emailAddress: string;
        };
    };
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className="shadow-light100_darknone xs:w-[260px] w-full max-sm:w-full xl:max-w-[350px]">
            <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
                <Image
                    src={String(user?.imageUrl)}
                    alt={user?.fullName as string}
                    width={100}
                    height={100}
                    className="rounded-full"
                />

                {/* User info */}
                <div className="mt-4 text-center">
                    <h3 className="h3-bold text-dark200_light900 line-clamp-1">
                        {user?.fullName}
                    </h3>
                    <p className="body-regular text-dark500_light500 mt-2">
                        @{user?.primaryEmailAddress?.emailAddress}
                    </p>
                </div>
            </article>
        </div>
    );
};

export default UserCard;
