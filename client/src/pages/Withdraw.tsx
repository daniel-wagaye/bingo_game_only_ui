import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const { toast } = useToast();
  
  const withdrawableBalance = 250.50; // TODO: remove mock functionality

  const validateAccountNumber = (bank: string, number: string): boolean => {
    const validations: Record<string, RegExp> = {
      CBE: /^\d{13}$/,
      BOA: /^\d{9}$/,
      Telebirr: /^09\d{8}$/,
      CBEbirr: /^0[79]\d{8}$/,
    };
    
    return validations[bank]?.test(number) || false;
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);

    if (withdrawAmount < 100) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Withdraw amount must be greater than or equal to 100",
      });
      return;
    }

    if (withdrawAmount > withdrawableBalance) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: `Withdrawable balance: ${withdrawableBalance} ETB`,
      });
      return;
    }

    if (accountHolder.length > 20 || !/^[a-zA-Z\s]+$/.test(accountHolder)) {
      toast({
        variant: "destructive",
        title: "Invalid Name",
        description: "Please enter a valid account holder name",
      });
      return;
    }

    if (!validateAccountNumber(bank, accountNumber)) {
      toast({
        variant: "destructive",
        title: "Invalid Account",
        description: "The account number is not correct",
      });
      return;
    }

    toast({
      title: "Processing",
      description: "Your withdrawal is under progress. This may take a few minutes!",
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
          <h1 className="text-2xl font-bold">Withdraw</h1>
        </div>

        <Card className="p-4 bg-gradient-to-br from-card to-accent border-card-border">
          <div className="text-sm text-muted-foreground">Withdrawable Balance</div>
          <div className="text-2xl font-bold text-[hsl(142_76%_52%)]" data-testid="text-balance">
            {withdrawableBalance.toFixed(2)} ETB
          </div>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Amount (min 100 ETB)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              data-testid="input-amount"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Account Holder Full Name</label>
            <Input
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Enter full name"
              maxLength={20}
              data-testid="input-holder-name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Bank</label>
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger data-testid="select-bank">
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBE">CBE</SelectItem>
                <SelectItem value="BOA">BOA</SelectItem>
                <SelectItem value="Telebirr">Telebirr</SelectItem>
                <SelectItem value="CBEbirr">CBE-Birr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Account Number</label>
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              data-testid="input-account-number"
            />
          </div>
        </div>

        <Button 
          onClick={handleWithdraw} 
          className="w-full bg-gradient-to-r from-primary to-orange-500"
          data-testid="button-request-withdrawal"
        >
          Request Withdrawal
        </Button>
      </div>
    </div>
  );
}
