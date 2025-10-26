"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function AppOrderSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentOrder = searchParams.get("order") ?? "latest";
  const [order, setOrder] = useState(currentOrder);

  useEffect(() => {
    setOrder(currentOrder);
  }, [currentOrder]);

  function handleChange(value: string) {
    setOrder(value);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("order", value);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={order} onValueChange={handleChange}>
      <SelectTrigger className="w-30">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">Latest</SelectItem>
        <SelectItem value="popular">Popular</SelectItem>
      </SelectContent>
    </Select>
  );
}
