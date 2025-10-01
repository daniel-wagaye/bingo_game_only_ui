import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BingoCardProps {
  numbers: number[];
  daubed?: number[];
  size?: "sm" | "lg";
}

const columnHeaders = [
  { letter: "B", color: "text-[hsl(220_70%_60%)]" },
  { letter: "I", color: "text-[hsl(340_75%_55%)]" },
  { letter: "N", color: "text-[hsl(142_76%_52%)]" },
  { letter: "G", color: "text-[hsl(48_96%_60%)]" },
  { letter: "O", color: "text-[hsl(271_81%_60%)]" },
];

export default function BingoCard({ numbers, daubed = [], size = "sm" }: BingoCardProps) {
  return (
    <Card className={cn(
      "p-2 bg-gradient-to-br from-card to-accent border-card-border",
      size === "lg" && "p-3"
    )}>
      <div className="grid grid-cols-5 gap-0.5 mb-1">
        {columnHeaders.map((header) => (
          <div
            key={header.letter}
            className={cn(
              "text-center font-bold",
              header.color,
              size === "sm" ? "text-xs" : "text-lg"
            )}
          >
            {header.letter}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-0.5">
        {numbers.map((num, idx) => {
          const isDaubed = daubed.includes(num);
          const isFree = idx === 12;
          
          return (
            <div
              key={idx}
              className={cn(
                "aspect-square rounded-sm flex items-center justify-center font-semibold transition-all",
                size === "sm" ? "text-[10px]" : "text-sm",
                isFree && "bg-[hsl(142_76%_52%)] text-white",
                !isFree && isDaubed && "bg-primary text-white shadow-lg",
                !isFree && !isDaubed && "bg-muted text-foreground"
              )}
              data-testid={`bingo-cell-${idx}`}
            >
              {isFree ? "FREE" : num}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
