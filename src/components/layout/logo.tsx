import { cn } from "@/lib/utils"
import Image from "next/image"

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative h-12 w-12 overflow-hidden rounded-lg shrink-0">
                <Image
                    src="/logo.jpg"
                    alt="SceneReady Logo"
                    fill
                    className="object-cover"
                />
            </div>
            <span className="text-2xl font-bold text-foreground">试戏</span>
        </div>
    )
}
