import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
    const { userId } = await auth();

    if (userId) {
        redirect("/dashboard");
    }

    return (
        <main className="flex justify-center items-center h-screen">
            <SignIn />
        </main>
    );
}
