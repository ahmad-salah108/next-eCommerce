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
        "block bg-black text-white dark:border-gray-800 dark:bg-cyan-900",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default StyledButton;
