import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const pillVariants = cva("pill-base", {
  variants: {
    tone: {
      success: "bg-success text-success-foreground",
      info: "bg-info text-info-foreground",
      caution: "bg-caution text-caution-foreground",
      neutral: "bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export function Pill({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof pillVariants>) {
  return <span className={cn(pillVariants({ tone }), className)} {...props} />;
}
