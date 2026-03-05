"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    className?: string
    direction?: "up" | "down" | "left" | "right"
}

export function FadeIn({ children, delay = 0, className, direction = "up" }: FadeInProps) {
    const directions = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={cn(className)}
            style={{ willChange: "opacity, transform" }}
        >
            {children}
        </motion.div>
    )
}
