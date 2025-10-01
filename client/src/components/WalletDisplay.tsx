import { Card } from "@/components/ui/card";

interface WalletDisplayProps {
  withdrawable: number;
  nonWithdrawable: number;
}

export default function WalletDisplay({ withdrawable, nonWithdrawable }: WalletDisplayProps) {
  const total = withdrawable + nonWithdrawable;

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-accent border-card-border">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Withdrawable</span>
          <span className="text-lg font-bold text-[hsl(142_76%_52%)]" data-testid="text-withdrawable">
            {withdrawable.toFixed(2)} ETB
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Non-Withdrawable</span>
          <span className="text-lg font-semibold" data-testid="text-non-withdrawable">
            {nonWithdrawable.toFixed(2)} ETB
          </span>
        </div>
        <div className="pt-3 border-t border-border flex justify-between items-center">
          <span className="text-sm font-medium">Total Wallet</span>
          <span className="text-xl font-bold text-primary" data-testid="text-total">
            {total.toFixed(2)} ETB
          </span>
        </div>
      </div>
    </Card>
  );
}
