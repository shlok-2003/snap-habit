"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from "react";
import Link from "next/link";

import LocalSearch from "@/components/shared/search/local-search";
import UserCard from "@/components/cards/user-card";
// import axios from "axios";
import search from "@/assets/icons/search.svg";

interface SearchParamsProps {
    searchParams: { [key: string]: string | undefined };
}

const Community = ({ searchParams }: SearchParamsProps) => {
    // const result = await getAllUsers({
    //     searchQuery: searchParams.q,
    // });

    const result = {
        users: [
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
            {
                imageUrl: "",
                fullName: "Sanskar",
                primaryEmailAddress: {
                    emailAddress: "sanskarv2004@gmail.com",
                },
            },
        ],
    };

    return (
        <Fragment>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/community"
                    iconPosition="left"
                    imgSrc={search}
                    placeholder="Search for amazing minds"
                    className="flex-1"
                />
            </div>

            <section className="m-12 flex flex-wrap gap-4 m">
                {result.users.length > 0 ? (
                    result.users.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))
                ) : (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>No users yet.</p>
                        <Link
                            href="/sign-up"
                            className="mt-1 font-bold text-accent-blue"
                        >
                            Join to be the first
                        </Link>
                    </div>
                )}
            </section>
        </Fragment>
    );
};
export default Community;
