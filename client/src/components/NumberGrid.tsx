import { cn } from "@/lib/utils";

interface NumberGridProps {
  max: number;
  selected: number | null;
  othersSelected: number[];
  onSelect: (num: number) => void;
}

export default function NumberGrid({ max, selected, othersSelected, onSelect }: NumberGridProps) {
  return (
    <div className="grid grid-cols-8 gap-2 p-4 bg-card/50 rounded-lg border border-card-border max-h-[400px] overflow-y-auto">
      {Array.from({ length: max }, (_, i) => i + 1).map((num) => {
        const isSelected = selected === num;
        const isOthersSelected = othersSelected.includes(num);
        
        return (
          <button
            key={num}
            onClick={() => !isOthersSelected && onSelect(num)}
            disabled={isOthersSelected}
            className={cn(
              "aspect-square rounded-md font-semibold text-sm transition-all",
              isSelected && "bg-[hsl(142_76%_52%)] text-white scale-105 shadow-lg shadow-[hsl(142_76%_52%)]/50",
              isOthersSelected && "bg-primary text-white cursor-not-allowed opacity-60",
              !isSelected && !isOthersSelected && "bg-muted text-foreground hover-elevate active-elevate-2"
            )}
            data-testid={`button-number-${num}`}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
