import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { BarChart2, Globe2, Heart, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
    const values = [
        {
            title: "Innovation for Sustainable Growth",
            icon: Globe2,
        },
        {
            title: "Commitment to Quality and Integrity",
            icon: Shield,
        },
        {
            title: "Building Long-Term Partnerships",
            icon: Heart,
        },
        {
            title: "Reducing Environmental Impact",
            icon: BarChart2,
        },
    ];

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
                <div className="flex flex-col flex-1 justify-center space-y-4 max-md:bg-custom-fade-orange rounded-xl p-4 max-md:border-2 max-md:border-custom-orange">
                    <p className="text-2xl max-md:text-xl text-black italic">
                        <span className="font-bold italic">"</span>
                        <span className="bg-custom-orange/30">
                            The global green technology and sustainability
                            market, valued at $17.21 billion in 2023, is
                            projected to grow to $105.26 billion by 2032, with
                            an impressive CAGR of 22.4%.
                        </span>
                        <span className="font-bold italic">"</span>
                    </p>
                    <p className="text-lg">
                        We are a team of dedicated professionals committed to
                        sustainable innovation. By 2030, adopting eco-friendly
                        practices could help reduce global greenhouse gas
                        emissions by up to 25%, significantly contributing to a
                        healthier environment and lower operational costs for
                        businesses.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">Our Values</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1 * (index + 3),
                                    }}
                                >
                                    <Card
                                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg`}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-full bg-green-100 p-3">
                                                    <value.icon className="h-6 w-6 text-green-700" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {value.title}
                                                </h3>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-end items-center overflow-hidden"
                >
                    <img
                        src="/dashboard-mobile-2.png"
                        alt="dashboard"
                        className="aspect-[9/16] max-md:h-[450px] max-lg:h-[550px] h-[600px]"
                    />
                </motion.div>
            </div>
        </section>
    );
}
