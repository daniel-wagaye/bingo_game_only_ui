import { Card } from "@/components/ui/card";
import { Wallet, Send, ArrowDownToLine, HelpCircle } from "lucide-react";
import { Link } from "wouter";

const navigationItems = [
  { label: "Deposit", icon: ArrowDownToLine, path: "/deposit", color: "text-primary" },
  { label: "Withdraw", icon: Wallet, path: "/withdraw", color: "text-secondary" },
  { label: "Transfer", icon: Send, path: "/transfer", color: "text-[hsl(142_76%_52%)]" },
  { label: "Support", icon: HelpCircle, path: "/support", color: "text-[hsl(48_96%_60%)]" },
];

export default function NavigationGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {navigationItems.map((item) => (
        <Link key={item.label} href={item.path}>
          <Card className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all bg-gradient-to-br from-card to-accent border-card-border">
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-3 rounded-lg bg-background/50 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold" data-testid={`button-${item.label.toLowerCase()}`}>
                {item.label}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
