import { cn } from "@/app/_lib/utils";

// Should be replaced with an ectual logo image later
export function Logo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-xl font-semibold", className)} {...props}>
      Dish<span className="text-brand">ly</span>
    </div>
  );
}
