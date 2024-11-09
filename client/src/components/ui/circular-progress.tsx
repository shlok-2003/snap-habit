import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    progress: number;
}

export default function CircularProgress({ progress, className, ...props }: CircularProgressProps) {
    const radius = 120;
    const strokeWidth = 20;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className={cn("flex items-center justify-center relative", className)} {...props}>
            <div className="relative">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    <circle
                        stroke="#"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#ff4f00"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference + " " + circumference}
                        style={{
                            strokeDashoffset,
                            transition: "stroke-dashoffset 0.5s ease-in-out",
                        }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-black dark:text-white">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    );
}
