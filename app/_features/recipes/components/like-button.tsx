"use client";

import { Button } from "@/app/_components/ui/button";
import { HeartFilledIcon } from "./icons/heart-filled-icon";

import { use, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/app/_lib/utils";
import { toggleLike } from "../lib/actions";

interface LikeButtonProps {
  id: string;
  likeStatusPromise: Promise<{
    count: number;
    isLiked: boolean;
  }>;
}

export function LikeButton({ id, likeStatusPromise }: LikeButtonProps) {
  const { count, isLiked } = use(likeStatusPromise);
  const [likeStatus, setLikeStatus] = useState({ count, isLiked });

  async function handleClick() {
    const state = await toggleLike(id);
    if (!state.success) {
      toast.error(state.error);
    }

    if (state.action === "like") {
      setLikeStatus((prev) => ({ count: prev.count + 1, isLiked: true }));
    } else if (state.action === "unlike") {
      setLikeStatus((prev) => ({ count: prev.count - 1, isLiked: false }));
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      <HeartFilledIcon
        className={cn("size-3.5", likeStatus.isLiked && "text-red-600")}
      />
      {likeStatus.count}
    </Button>
  );
}
