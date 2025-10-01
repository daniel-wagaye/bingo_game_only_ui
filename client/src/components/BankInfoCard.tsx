import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const bankAccounts = [
  { bank: "CBE", account: "1000061649046", name: "Daniel Wagaye" },
  { bank: "BOA", account: "175278729", name: "Daniel Wagaye" },
  { bank: "Telebirr", account: "0924570285", name: "Daniel Wagaye" },
  { bank: "CBE-Birr", account: "0940067850", name: "Daniel Wagaye" },
];

export default function BankInfoCard() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (account: string, index: number) => {
    navigator.clipboard.writeText(account);
    setCopiedIndex(index);
    toast({
      title: "Copied!",
      description: `Account number ${account} copied to clipboard`,
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="p-4 space-y-3 bg-gradient-to-br from-card to-accent border-card-border">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">Bank Information</h3>
      {bankAccounts.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-md bg-background/30">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">{item.bank}</p>
            <p className="font-semibold" data-testid={`text-account-${item.bank.toLowerCase()}`}>
              {item.account}
            </p>
            <p className="text-xs text-muted-foreground">{item.name}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => copyToClipboard(item.account, index)}
            data-testid={`button-copy-${item.bank.toLowerCase()}`}
          >
            {copiedIndex === index ? (
              <Check className="w-4 h-4 text-[hsl(142_76%_52%)]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      ))}
    </Card>
  );
}
