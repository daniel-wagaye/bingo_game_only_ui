import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import NumberGrid from "@/components/NumberGrid";
import BingoCard from "@/components/BingoCard";
import CountdownTimer from "@/components/CountdownTimer";

export default function GamePicking() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(30); // TODO: remove mock functionality
  const totalWallet = 371.25; // TODO: remove mock functionality
  const stake = 50; // TODO: remove mock functionality
  const othersSelected = [5, 12, 23, 45, 67, 89, 134, 256]; // TODO: remove mock functionality
  
  const sampleBingoNumbers = [
    1, 16, 31, 46, 61,
    2, 17, 32, 47, 62,
    3, 18, 0, 48, 63,
    4, 19, 33, 49, 64,
    5, 20, 34, 50, 65
  ]; // TODO: remove mock functionality

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="icon" variant="ghost" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Pick Your Number</h1>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 bg-gradient-to-br from-card to-accent border-card-border">
            <div className="text-xs text-muted-foreground">Wallet</div>
            <div className="text-lg font-bold" data-testid="text-wallet">{totalWallet.toFixed(2)} ETB</div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-card to-accent border-card-border">
            <div className="text-xs text-muted-foreground">Stake</div>
            <div className="text-lg font-bold text-primary" data-testid="text-stake">{stake} ETB</div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-primary/20 to-orange-500/20 border-primary/30">
            <div className="text-xs text-muted-foreground">Time</div>
            <div className="text-lg font-bold text-primary animate-pulse" data-testid="text-remaining-time">{remainingTime}s</div>
          </Card>
        </div>

        <NumberGrid
          max={400}
          selected={selectedNumber}
          othersSelected={othersSelected}
          onSelect={(num) => {
            console.log("Selected:", num);
            setSelectedNumber(selectedNumber === num ? null : num);
          }}
        />

        <div>
          <h3 className="text-sm font-semibold mb-3 text-center">Your Bingo Card Preview</h3>
          <div className="flex justify-center">
            <BingoCard numbers={sampleBingoNumbers} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
