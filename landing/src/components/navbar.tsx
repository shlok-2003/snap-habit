import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Link } from "react-scroll";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="flex items-center px-4 py-4 border-b md:px-8 lg:px-20 justify-around">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full">
                    <nav className="grid gap-4 py-4">
                        <Link
                            to="home"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                            smooth={true}
                        >
                            Home
                        </Link>
                        <Link
                            to="about"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                            smooth={true}
                        >
                            About
                        </Link>
                        <Link
                            to="features"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                            smooth={true}
                        >
                            Features
                        </Link>
                        <Link
                            to="testimonials"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                            smooth={true}
                        >
                            Testimonials
                        </Link>
                        <Link
                            to="trynow"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                            smooth={true}
                        >
                            Try Now
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>

            <img src="/logo.png" alt="logo" />
            <nav className="hidden gap-2 lg:flex [&>*]:text-black [&>*]:font-medium [&>*]:rounded-xl [&>*]:px-3 [&>*]:py-1 [&>*]:transition-colors [&>*]:duration-300">
                <Link
                    to="home"
                    smooth={true}
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Home
                </Link>
                <Link
                    to="about"
                    smooth={true}
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    About
                </Link>
                <Link
                    to="features"
                    smooth={true}
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Features
                </Link>
                <Link
                    to="testimonials"
                    smooth={true}
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Testimonials
                </Link>
                <Link
                    to="trynow"
                    smooth={true}
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Try Now
                </Link>
            </nav>
            <div className="flex items-center gap-4 max-md:gap-2 text-base">
                <a href={import.meta.env.VITE_PUBLIC_CLIENT_BASE_LOGIN_URL}>
                    <Button
                        variant="outline"
                        className="flex font-semibold max-md:text-sm max-md:px-3 max-md:py-0"
                    >
                        Log in
                    </Button>
                </a>
                <a href={import.meta.env.VITE_PUBLIC_CLIENT_BASE_SIGNUP_URL}>
                    <Button className="bg-custom-orange text-white font-semibold hover:bg-custom-orange/90 max-md:text-sm flex max-md:px-3 max-md:py-0">
                        Sign up
                </Button>
                </a>
            </div>
        </header>
    );
}
