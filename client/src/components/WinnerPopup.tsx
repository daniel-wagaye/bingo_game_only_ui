import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BingoCard from "./BingoCard";

interface WinnerPopupProps {
  winners: string[];
  winningCard?: number[];
  prize: number;
  countdown?: number;
  onClose?: () => void;
}

export default function WinnerPopup({ winners, winningCard, prize, countdown = 10, onClose }: WinnerPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="max-w-md w-full p-6 bg-gradient-to-br from-card to-accent border-primary/30 space-y-4">
        <div className="bg-gradient-to-r from-primary via-orange-500 to-primary p-4 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white">BINGO!</h2>
        </div>

        <div className="text-center space-y-2">
          {winners.length === 1 ? (
            <p className="text-lg">
              <span className="text-[hsl(142_76%_52%)] font-bold" data-testid="text-winner-name">
                {winners[0]}
              </span>
              {" "}has won the game!
            </p>
          ) : (
            <p className="text-lg">
              <span className="text-[hsl(142_76%_52%)] font-bold" data-testid="text-winner-names">
                {winners[0]}
              </span>
              {" "}and {winners.length - 1} other{winners.length > 2 ? "s" : ""} won the game!
            </p>
          )}
          <p className="text-2xl font-bold text-primary" data-testid="text-prize-amount">
            Prize: {prize} ETB
          </p>
        </div>

        {winningCard && (
          <div className="flex justify-center">
            <BingoCard numbers={winningCard} size="sm" />
          </div>
        )}

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Next game starts in{" "}
            <span className="font-bold text-primary" data-testid="text-countdown">
              {countdown}s
            </span>
          </p>
          {onClose && (
            <Button onClick={onClose} className="w-full" data-testid="button-close-popup">
              Close
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
