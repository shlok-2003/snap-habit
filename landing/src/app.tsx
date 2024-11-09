import About from "./components/about";
import Navbar from "@/components/navbar";
import TryNow from "./components/try-now";

export default function App() {
    return (
        <main className="flex min-h-screen flex-col bg-custom-white space-y-5 font-helvetica">
            <Navbar />
            <About />
            <TryNow />
        </main>
    );
}
