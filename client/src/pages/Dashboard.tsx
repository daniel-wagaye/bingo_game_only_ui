import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GlowingLogo from "@/components/GlowingLogo";
import WalletDisplay from "@/components/WalletDisplay";
import NavigationGrid from "@/components/NavigationGrid";
import PlayButton from "@/components/PlayButton";

export default function Dashboard() {
  const [name, setName] = useState("John Doe"); // TODO: remove mock functionality
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const { toast } = useToast();

  const handleEditName = () => {
    if (editName.length > 8) {
      toast({
        variant: "destructive",
        title: "Invalid Name",
        description: "Name must be 8 characters or less",
      });
      return;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(editName)) {
      toast({
        variant: "destructive",
        title: "Invalid Name",
        description: "Name cannot contain emojis or special characters",
      });
      return;
    }

    setName(editName);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Name updated successfully",
    });
  };

  return (
    <div className="min-h-screen p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center pt-4">
          <GlowingLogo />
        </div>

        <Card className="p-6 bg-gradient-to-br from-card to-accent border-card-border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg">
                  Hi, <span className="font-bold" data-testid="text-user-name">{name}</span>!
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditName(name);
                  setIsEditing(true);
                }}
                data-testid="button-edit-name"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter name"
                  maxLength={8}
                  data-testid="input-edit-name"
                />
                <Button onClick={handleEditName} data-testid="button-save-name">Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} data-testid="button-cancel-edit">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card>

        <WalletDisplay withdrawable={250.50} nonWithdrawable={120.75} />

        <NavigationGrid />

        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <PlayButton />
        </div>
      </div>
    </div>
  );
}
