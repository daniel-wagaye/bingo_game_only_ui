import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Transfer() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const { toast } = useToast();
  
  const withdrawableBalance = 250.50; // TODO: remove mock functionality
  const nonWithdrawableBalance = 120.75; // TODO: remove mock functionality

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);

    if (!Number.isInteger(transferAmount)) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Only whole number please",
      });
      return;
    }

    if (transferAmount < 10) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Transfer amount must be greater than or equal to 10",
      });
      return;
    }

    const commission = transferAmount * 0.005;
    const total = transferAmount + commission;
    const balance = wallet === "withdrawable" ? withdrawableBalance : nonWithdrawableBalance;

    if (total > balance) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: "Insufficient Balance",
      });
      return;
    }

    if (!/^0[79]\d{8}$/.test(recipientPhone)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone",
        description: "The user number is not correct",
      });
      return;
    }

    console.log("Transfer successful"); // TODO: remove mock functionality
    toast({
      title: "Success",
      description: `You have successfully transferred ${transferAmount} ETB to ${recipientPhone}. Transfer fee: ${commission.toFixed(2)} ETB`,
    });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="icon" variant="ghost" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Transfer</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-card to-accent border-card-border">
            <div className="text-xs text-muted-foreground">Withdrawable</div>
            <div className="text-lg font-bold text-[hsl(142_76%_52%)]" data-testid="text-withdrawable-balance">
              {withdrawableBalance.toFixed(2)} ETB
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-card to-accent border-card-border">
            <div className="text-xs text-muted-foreground">Non-Withdrawable</div>
            <div className="text-lg font-bold" data-testid="text-non-withdrawable-balance">
              {nonWithdrawableBalance.toFixed(2)} ETB
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Wallet Source</label>
            <Select value={wallet} onValueChange={setWallet}>
              <SelectTrigger data-testid="select-wallet">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="withdrawable">Withdrawable</SelectItem>
                <SelectItem value="non-withdrawable">Non-Withdrawable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Amount (min 10 ETB)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              data-testid="input-amount"
            />
            <p className="text-xs text-muted-foreground">0.5% commission will be applied</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Recipient Phone Number</label>
            <Input
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="09XXXXXXXX or 07XXXXXXXX"
              data-testid="input-recipient-phone"
            />
          </div>
        </div>

        <Button 
          onClick={handleTransfer} 
          className="w-full bg-gradient-to-r from-primary to-orange-500"
          data-testid="button-send-transfer"
        >
          Send Transfer
        </Button>
      </div>
    </div>
  );
}
