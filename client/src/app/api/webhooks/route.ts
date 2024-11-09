import axios from "axios";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { SIGN_UP_BACKEND_URL, UPDATE_USER_BACKEND_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const eventType = evt.type;
    
    if(eventType === "user.created")
    {
        const {
            id: clerkId,
            username,
            last_name,
            image_url,
            first_name,
            email_addresses,
        } = evt.data;

        const mongoUser = await axios.post(SIGN_UP_BACKEND_URL, {
            clerkId,
            email: email_addresses[0].email_address,
            fullName: `${first_name} ${last_name}`,
            username,
            image: image_url,
        });

        const data = mongoUser.data;

        return NextResponse.json({ message: "OK", user: data });
    }

    if(eventType === "user.updated") {
        const {
            id: clerkId,
            username,
            last_name,
            image_url,
            first_name,
        } = evt.data;

        const mongoUser = await axios.patch(UPDATE_USER_BACKEND_URL, {
            clerkId,
            fullName: `${first_name} ${last_name}`,
            username,
            image: image_url,
        });

        const data = mongoUser.data;

        return NextResponse.json({ message: "OK", user: data });
    }

    return new Response("", { status: 200 });
}
