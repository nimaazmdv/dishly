import { cn } from "@/app/_lib/utils";

export function IconBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-brand/20 [&>svg]:text-brand grid size-9 place-content-center rounded-full [&>svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}
