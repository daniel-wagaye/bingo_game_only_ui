import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CurrentCallDisplayProps {
  currentCall: string;
  recentCalls: string[];
  status?: string;
}

export default function CurrentCallDisplay({ currentCall, recentCalls, status = "Started" }: CurrentCallDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-center">
        <Badge className="px-3 py-0.5 text-[10px] font-bold bg-[hsl(48_96%_60%)] text-black hover:bg-[hsl(48_96%_60%)]">
          {status}
        </Badge>
      </div>
      
      <Card className="p-2 bg-gradient-to-br from-primary/20 to-orange-500/20 border-primary/30">
        <div className="text-center">
          <div className="text-[10px] text-muted-foreground mb-0.5">Current Call</div>
          <div className="text-lg font-bold text-primary" data-testid="text-current-call">
            {currentCall}
          </div>
        </div>
      </Card>

      <div>
        <div className="text-[10px] text-muted-foreground mb-1 text-center">Recent Calls</div>
        <div className="flex justify-center gap-1">
          {recentCalls.map((call, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-[10px]"
              data-testid={`recent-call-${idx}`}
            >
              {call}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
