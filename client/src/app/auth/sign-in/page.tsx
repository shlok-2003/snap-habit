"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-4">
                    <Button
                        onClick={() =>
                            signIn("google", { redirectTo: "/dashboard" })
                        }
                        className="w-full"
                    >
                        <FcGoogle className="mr-2 h-4 w-4" />
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        By signing in, you agree to our Terms of Service.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
