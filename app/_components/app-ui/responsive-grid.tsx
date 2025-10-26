import { cn } from "@/app/_lib/utils";

export function ResponsiveGrid({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
