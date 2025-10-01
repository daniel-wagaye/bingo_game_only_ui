interface GlowingLogoProps {
  className?: string;
}

export default function GlowingLogo({ className = "" }: GlowingLogoProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent animate-pulse">
        DM Bingo
      </h1>
      <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-primary to-orange-400" />
    </div>
  );
}
