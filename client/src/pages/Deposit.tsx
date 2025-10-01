import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import BankInfoCard from "@/components/BankInfoCard";

export default function Deposit() {
  const [sms, setSms] = useState("");
  const { toast } = useToast();

  const parseSMS = (text: string): string | null => {
    const patterns = [
      /\?id=([A-Z0-9]+)$/,
      /\?trx=([A-Z0-9]+)/,
      /Txn ID ([A-Z0-9]+)/,
      /transaction number is ([A-Z0-9]+)/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleValidate = () => {
    const txRef = parseSMS(sms);
    
    if (!txRef) {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "Unable to parse transaction reference from SMS",
      });
      return;
    }

    console.log("Transaction Reference:", txRef); // TODO: remove mock functionality
    toast({
      title: "Validating...",
      description: "Your deposit is being processed",
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
          <h1 className="text-2xl font-bold">Deposit</h1>
        </div>

        <BankInfoCard />

        <div className="space-y-3">
          <label className="text-sm font-semibold">Paste Bank SMS Confirmation</label>
          <Textarea
            value={sms}
            onChange={(e) => setSms(e.target.value)}
            placeholder="Paste your full bank SMS here..."
            className="min-h-[150px] bg-input"
            data-testid="input-sms"
          />
        </div>

        <Button 
          onClick={handleValidate} 
          className="w-full bg-gradient-to-r from-primary to-orange-500"
          data-testid="button-validate"
        >
          Validate Deposit
        </Button>
      </div>
    </div>
  );
}
