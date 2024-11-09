import { ContainerScroll } from "./ui/container-scroll-animation";

export default function Hero() {
    return (
        <div className="flex flex-col overflow-hidden" id="home">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black dark:text-white">
                            Unleash the power of <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Snap Habit
                            </span>
                        </h1>
                    </>
                }
            >
                <img
                    src={`/dashboard.avif`}
                    alt="hero"
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
