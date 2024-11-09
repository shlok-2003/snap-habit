import { Button } from "@/components/ui/button";

export default function TryNow() {
    return (
        <section className="py-24 px-4 text-center" id="trynow">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl max-md:text-3xl font-bold tracking-tight sm:text-5xl">
                    <span className="bg-gradient-to-r from-custom-orange to-custom-orange/40 text-transparent bg-clip-text">
                        Step into something amazing
                    </span>{" "}
                    - use our app and get started!
                </h1>
                <div className="flex items-center justify-center gap-4">
                    <a href={import.meta.env.VITE_PUBLIC_CLIENT_BASE_LOGIN_URL}>
                        <Button
                            size="lg"
                            className="bg-custom-orange text-white font-semibold hover:bg-custom-orange/90 max-md:text-sm flex max-md:px-3 max-md:py-0"
                        >
                            Log in
                        </Button>
                    </a>
                    <a
                        href={
                            import.meta.env.VITE_PUBLIC_CLIENT_BASE_SIGNUP_URL
                        }
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex font-semibold max-md:text-sm max-md:px-3 max-md:py-0"
                        >
                            Sign up
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}
