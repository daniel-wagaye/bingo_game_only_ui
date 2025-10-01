import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "wouter";

const supportContacts = [
  { username: "@danielwagaye", name: "Daniel Wagaye" },
  { username: "@Natii_lala", name: "Natii Lala" },
  { username: "@desalegn", name: "Desalegn" },
  { username: "@sewagegn", name: "Sewagegn" },
];

export default function Support() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="icon" variant="ghost" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Support</h1>
        </div>

        <Card className="p-6 bg-gradient-to-br from-card to-accent border-card-border text-center space-y-4">
          <MessageCircle className="w-12 h-12 mx-auto text-primary" />
          <div>
            <h2 className="text-xl font-bold mb-2">Need Help?</h2>
            <p className="text-muted-foreground text-sm">
              Contact our support team on Telegram for assistance
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          {supportContacts.map((contact) => (
            <a
              key={contact.username}
              href={`https://t.me/${contact.username.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all bg-gradient-to-br from-card to-accent border-card-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold" data-testid={`text-support-${contact.username}`}>
                      {contact.username}
                    </p>
                    <p className="text-sm text-muted-foreground">{contact.name}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-secondary" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
