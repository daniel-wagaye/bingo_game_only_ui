import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface PhoneNumberRequestProps {
  onRequest: () => void;
}

export default function PhoneNumberRequest({ onRequest }: PhoneNumberRequestProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 bg-gradient-to-br from-card to-accent border-card-border">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <Phone className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Welcome to DM Bingo!</h2>
          <p className="text-muted-foreground">
            To continue playing, we need your phone number to register your account.
          </p>
        </div>

        <Button 
          onClick={onRequest} 
          className="w-full bg-gradient-to-r from-primary to-orange-500"
          data-testid="button-share-phone"
        >
          <Phone className="w-4 h-4 mr-2" />
          Share Phone Number
        </Button>
      </Card>
    </div>
  );
}
