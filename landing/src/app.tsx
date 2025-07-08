import Hero from "@/components/hero";
import About from "@/components/about";
import Navbar from "@/components/navbar";
import TryNow from "@/components/try-now";
import Features from "@/components/features";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="landing-ui-theme">
            <main className="flex min-h-screen flex-col bg-background space-y-5 font-helvetica">
                <Navbar />
                <Hero />
                <About />
                <Features />
                <TryNow />
            </main>
        </ThemeProvider>
    );
}
