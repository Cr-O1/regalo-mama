import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function GlassButton({ children, icon, variant = "primary", className, ...props }: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn(
        "glass-button px-10 py-4 rounded-full font-medium tracking-wide flex items-center gap-3",
        variant === "primary" ? "text-primary hover:text-primary/80" : "text-foreground hover:text-foreground/80",
        className
      )}
      {...props}
    >
      {children}
      {icon && <span className="text-current">{icon}</span>}
    </motion.button>
  );
}
