import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "wouter";

export default function PlayButton() {
  return (
    <Link href="/game_picking">
      <Button
        size="lg"
        className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-orange-500 to-primary shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all hover:scale-105 active:scale-95"
        data-testid="button-play"
      >
        <div className="flex flex-col items-center">
          <Play className="w-12 h-12 fill-current" />
          <span className="text-lg font-bold mt-1">PLAY</span>
        </div>
      </Button>
    </Link>
  );
}
