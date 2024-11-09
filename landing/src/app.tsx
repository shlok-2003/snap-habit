import Hero from "@/components/hero";
import About from "@/components/about";
import Navbar from "@/components/navbar";
import TryNow from "@/components/try-now";
import Features from "@/components/features";

export default function App() {
    return (
        <main className="flex min-h-screen flex-col bg-custom-white space-y-5 font-helvetica">
            <Navbar />
            <Hero />
            <About />
            <Features />
            <TryNow />
        </main>
    );
}
