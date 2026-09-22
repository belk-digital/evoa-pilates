import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      content: "max-w-[46rem] px-6 md:px-10",
      prose: "max-w-[60rem] px-6 md:px-10",
      page: "max-w-[80rem] px-6 md:px-10 lg:px-16",
      wide: "max-w-[90rem] px-6 md:px-10 lg:px-16",
      bleed: "max-w-full px-0",
    },
  },
  defaultVariants: {
    size: "page",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return <div ref={ref} className={cn(containerVariants({ size }), className)} {...props} />;
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
