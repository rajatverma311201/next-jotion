import { Loader2 } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("text-primary animate-spin", {
    variants: {
        size: {
            default: "h-5 w-5",
            sm: "h-3 w-3",
            lg: "h-10 w-10",
            icon: "h-8 w-8",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner: React.FC<SpinnerProps> = ({ size }) => {
    return <Loader2 className={cn(spinnerVariants({ size }))} />;
};
