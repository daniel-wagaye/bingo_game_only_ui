import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  onComplete?: () => void;
}

export default function CountdownTimer({ seconds: initialSeconds, onComplete }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/20 to-orange-500/20 border-primary/30">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-1">Time Remaining</div>
        <div className="text-4xl font-bold text-primary animate-pulse" data-testid="text-countdown">
          {seconds}s
        </div>
      </div>
    </Card>
  );
}
