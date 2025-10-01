import { cn } from "@/lib/utils";

interface MasterCallingSheetProps {
  calledNumbers: number[];
  currentNumber?: number;
}

const columnHeaders = [
  { letter: "B", range: [1, 15], color: "text-[hsl(220_70%_60%)]" },
  { letter: "I", range: [16, 30], color: "text-[hsl(340_75%_55%)]" },
  { letter: "N", range: [31, 45], color: "text-[hsl(142_76%_52%)]" },
  { letter: "G", range: [46, 60], color: "text-[hsl(48_96%_60%)]" },
  { letter: "O", range: [61, 75], color: "text-[hsl(271_81%_60%)]" },
];

export default function MasterCallingSheet({ calledNumbers, currentNumber }: MasterCallingSheetProps) {
  return (
    <div className="p-2 bg-card/50 rounded-lg border border-card-border">
      <div className="grid grid-cols-5 gap-1">
        {columnHeaders.map((col) => (
          <div key={col.letter} className="space-y-0.5">
            <div className={cn("text-center font-bold text-[10px]", col.color)}>
              {col.letter}
            </div>
            <div className="space-y-0.5">
              {Array.from({ length: 15 }, (_, i) => col.range[0] + i).map((num) => {
                const isCalled = calledNumbers.includes(num);
                const isCurrent = currentNumber === num;
                
                return (
                  <div
                    key={num}
                    className={cn(
                      "aspect-square rounded-sm flex items-center justify-center text-[9px] font-semibold transition-all",
                      isCurrent && "bg-[hsl(142_76%_52%)] text-white scale-105 shadow-sm shadow-[hsl(142_76%_52%)]/50",
                      isCalled && !isCurrent && "bg-primary text-white",
                      !isCalled && !isCurrent && "bg-muted/50 text-muted-foreground"
                    )}
                    data-testid={`master-number-${num}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
