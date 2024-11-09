import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="flex items-center px-4 py-4 border-b md:px-8 lg:px-20 justify-around">
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
        </header>
    );
}
