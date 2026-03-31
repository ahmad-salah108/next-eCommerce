"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function StyledButton({ className, children, ...props }: Props) {
  return (
    <Button
      className={cn(
        "block bg-black text-white dark:border-gray-800 dark:bg-white dark:hover:bg-white/90 dark:text-black",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default StyledButton;
