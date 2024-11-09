import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function About() {
    return (
        <section className="flex flex-col gap-8" id="about">
            <Button
                className="self-center w-fit rounded-xl"
                style={{
                    mask: `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgb(0, 0, 0) 100%)`,
                }}
            >
                About
            </Button>
            <div className="flex flex-row max-md:flex-col pt-10 overflow-hidden justify-center items-center px-40 max-lg:px-10 max-md:px-4 gap-4 flex-wrap">
                <div className="flex flex-col flex-1 justify-center space-y-4">
                    <h2 className="text-4xl font-bold">Who We Are</h2>
                    <p className="text-lg text-gray-700">
                        We're a passionate team dedicated to delivering
                        exceptional solutions that make a real difference. Our
                        mission is to innovate, inspire, and create value for
                        our clients and community.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">Our Values</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>Innovation at our core</li>
                            <li>Commitment to quality and integrity</li>
                            <li>Client-centric approach</li>
                            <li>Building lasting relationships</li>
                        </ul>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="flex-1 flex justify-end items-center"
                >
                    <img
                        src="/temp-dashboard-portrait.png"
                        alt="dashboard"
                        className="aspect-[9/16] max-md:h-[450px] max-lg:h-[550px] h-[600px]"
                    />
                </motion.div>
            </div>
        </section>
    );
}
