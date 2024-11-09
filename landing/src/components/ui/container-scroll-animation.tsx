import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.7, 0.9] : [1.05, 1];
    };

    const scaleDimensionForRotate = () => {
        return isMobile ? [40, 35, 30, 10, 0] : [40, 35, 20, 10, 0];
    };

    const rotate = useTransform(
        scrollYProgress,
        [0, 0.1, 0.3, 0.6, 1],
        scaleDimensionForRotate(),
    );
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const rounded = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["999px", "200px", "0px"],
    );
    const size = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["50%", "70%", "100%"],
    );

    return (
        <div
            className="h-[55rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-20 md:pb-0"
            ref={containerRef}
        >
            <BackgroundCircle size={size} rounded={rounded} />
            <div
                className="py-10 md:py-40 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const BackgroundCircle = ({
    size,
    rounded,
}: {
    size: MotionValue<string>;
    rounded: MotionValue<string>;
}) => {
    return (
        <motion.div
            style={{
                height: size,
                width: size,
                borderRadius: rounded,
            }}
            transition={{
                ease: "easeInOut",
            }}
            className="absolute bg-custom-fade-orange/30 rounded-full ring ring-custom-fade-orange"
        />
    );
};

export const Header = ({
    translate,
    titleComponent,
}: {
    translate: MotionValue<number>;
    titleComponent: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
    rotate,
    scale,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 5px #0000004a, 0 37px 8px #00000042, 0 44px 10px #00000026, 0 49px 15px #0000000a, 0 33px 20px #00000003",
            }}
            transition={{
                rotate: {
                    ease: "easeInOut",
                },
            }}
            className="max-w-5xl max-md:-mt-20 -mt-5 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 bg-[#222222] rounded-[30px] shadow-2xl"
        >
            <div className=" h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
                {children}
            </div>
        </motion.div>
    );
};
