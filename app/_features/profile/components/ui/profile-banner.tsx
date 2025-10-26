import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import type { User } from "better-auth";

interface ProfileBannerProps {
  user: User;
  stats: { recipesCount: number; totalLikesCount: number };
}

export function ProfileBanner({ user, stats }: ProfileBannerProps) {
  return (
    <div className="selection:bg-brand selection:text-brand-foreground foods-pattern relative mt-10 grid place-content-center rounded-lg py-8 pt-14 text-center">
      <Avatar className="absolute -top-10 left-1/2 size-20 -translate-x-1/2 border">
        <AvatarImage src={user.image!} />
        <AvatarFallback className="bg-background text-foreground text-4xl">
          {user.name[0]}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <div className="flex items-center justify-center gap-4">
          <div>{stats.recipesCount} recipes</div>
          <div>{stats.totalLikesCount} likes</div>
        </div>
      </div>
    </div>
  );
}
