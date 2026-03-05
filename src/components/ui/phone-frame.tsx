import { cn } from "@/lib/utils"

interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    color?: "black" | "white"
}

export function PhoneFrame({ children, className, color = "black", ...props }: PhoneFrameProps) {
    return (
        <div
            className={cn(
                "relative mx-auto aspect-[9/19.5] w-[300px] rounded-[3rem] border-[8px] bg-slate-900 shadow-2xl",
                color === "black" ? "border-slate-800" : "border-slate-200",
                className
            )}
            {...props}
        >
            {/* Outer Glow/Shadow for realism */}
            <div className="absolute -inset-[1px] rounded-[3.1rem] border border-white/10 pointer-events-none z-50"></div>

            {/* Notch (Dynamic Island style) */}
            <div className="absolute top-0 inset-x-0 h-8 bg-black z-20 rounded-b-2xl w-32 mx-auto flex items-center justify-center gap-2">
                <div className="w-16 h-4 bg-black rounded-full grid place-items-center">
                    <div className="w-12 h-1.5 bg-slate-800 rounded-full"></div>
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-800/80"></div>
            </div>

            {/* Screen Content */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white">
                {children}
            </div>

            {/* Buttons (Side) */}
            <div className="absolute top-24 -left-[10px] h-10 w-[3px] bg-slate-700/50 rounded-l-md"></div>
            <div className="absolute top-40 -left-[10px] h-16 w-[3px] bg-slate-700/50 rounded-l-md"></div>
            <div className="absolute top-32 -right-[10px] h-20 w-[3px] bg-slate-700/50 rounded-r-md"></div>
        </div>
    )
}
