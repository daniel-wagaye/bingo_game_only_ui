import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import GameStatsBar from "@/components/GameStatsBar";
import MasterCallingSheet from "@/components/MasterCallingSheet";
import CurrentCallDisplay from "@/components/CurrentCallDisplay";
import BingoCard from "@/components/BingoCard";
import WinnerPopup from "@/components/WinnerPopup";

export default function GameStarted() {
  const [showBingoButton, setShowBingoButton] = useState(true);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  
  const calledNumbers = [5, 12, 23, 34, 45, 56, 67]; // TODO: remove mock functionality
  const currentNumber = 67; // TODO: remove mock functionality
  const recentCalls = ["B5", "I23", "G56"]; // TODO: remove mock functionality
  
  const playerBingoNumbers = [
    1, 16, 31, 46, 61,
    2, 17, 32, 47, 62,
    3, 18, 0, 48, 63,
    4, 19, 33, 49, 64,
    5, 20, 34, 50, 65
  ]; // TODO: remove mock functionality
  
  const daubedNumbers = [5]; // TODO: remove mock functionality

  const handleBingo = () => {
    console.log("BINGO claimed!"); // TODO: remove mock functionality
    setShowWinnerPopup(true);
  };

  return (
    <div className="min-h-screen p-3 pb-24">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button size="icon" variant="ghost" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Bingo Game</h1>
        </div>

        <GameStatsBar prize={1000} players={24} bet={50} calls={calledNumbers.length} />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold">Master Sheet</h3>
            <MasterCallingSheet 
              calledNumbers={calledNumbers}
              currentNumber={currentNumber}
            />
          </div>

          <div className="space-y-2">
            <CurrentCallDisplay
              currentCall="N67"
              recentCalls={recentCalls}
              status="Started"
            />

            <div>
              <h3 className="text-xs font-semibold mb-1 text-center">Your Card</h3>
              <BingoCard 
                numbers={playerBingoNumbers}
                daubed={daubedNumbers}
                size="sm"
              />
            </div>
          </div>
        </div>

        {showBingoButton && (
          <div className="fixed bottom-4 left-0 right-0 flex justify-center px-3">
            <Button
              size="lg"
              onClick={handleBingo}
              className="w-full max-w-md h-14 text-xl font-bold bg-gradient-to-r from-primary via-orange-500 to-primary shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all hover:scale-105 active:scale-95"
              data-testid="button-bingo"
            >
              BINGO!
            </Button>
          </div>
        )}

        {showWinnerPopup && (
          <WinnerPopup
            winners={["John Doe"]}
            winningCard={playerBingoNumbers}
            prize={1000}
            countdown={10}
            onClose={() => setShowWinnerPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
