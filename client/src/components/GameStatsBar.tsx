import { Card } from "@/components/ui/card";

interface GameStatsBarProps {
  prize: number;
  players: number;
  bet: number;
  calls: number;
}

export default function GameStatsBar({ prize, players, bet, calls }: GameStatsBarProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Card className="p-2 bg-gradient-to-br from-card to-accent border-card-border">
        <div className="text-xs text-muted-foreground">Prize</div>
        <div className="text-sm font-bold text-primary" data-testid="text-prize">
          {prize} ETB
        </div>
      </Card>
      <Card className="p-2 bg-gradient-to-br from-card to-accent border-card-border">
        <div className="text-xs text-muted-foreground">Players</div>
        <div className="text-sm font-bold" data-testid="text-players">{players}</div>
      </Card>
      <Card className="p-2 bg-gradient-to-br from-card to-accent border-card-border">
        <div className="text-xs text-muted-foreground">Bet</div>
        <div className="text-sm font-bold" data-testid="text-bet">{bet} ETB</div>
      </Card>
      <Card className="p-2 bg-gradient-to-br from-card to-accent border-card-border">
        <div className="text-xs text-muted-foreground">Calls</div>
        <div className="text-sm font-bold text-secondary" data-testid="text-calls">{calls}</div>
      </Card>
    </div>
  );
}
