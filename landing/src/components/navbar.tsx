import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
                        <a
                            href="#home"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </a>
                        <a
                            href="#features"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </a>
                        <a
                            href="#testimonials"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Testimonials
                        </a>
                        <a
                            href="#trynow"
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Try Now
                        </a>
                    </nav>
                </SheetContent>
            </Sheet>

            <img src="/logo.png" alt="logo" />
            <nav className="hidden gap-2 lg:flex [&>*]:text-black [&>*]:font-medium [&>*]:rounded-xl [&>*]:px-3 [&>*]:py-1 [&>*]:transition-colors [&>*]:duration-300">
                <a
                    href="#home"
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Home
                </a>
                <a
                    href="#features"
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Features
                </a>
                <a
                    href="#about"
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    About
                </a>
                <a
                    href="#testimonials"
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Testimonials
                </a>
                <a
                    href="#trynow"
                    className="text-base font-medium hover:bg-custom-fade-orange"
                >
                    Try Now
                </a>
            </nav>
            <div className="flex items-center gap-4 max-md:gap-2 text-base">
                <Button
                    variant="outline"
                    className="flex font-semibold max-md:text-sm max-md:px-3 max-md:py-0"
                >
                    Log in
                </Button>
                <Button className="bg-custom-orange text-white font-semibold hover:bg-custom-orange/90 max-md:text-sm flex max-md:px-3 max-md:py-0">
                    Sign up
                </Button>
            </div>
        </header>
    );
}
