import { Brain, Sparkles, Zap, Code2 } from "lucide-react";

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-fade-in">
      {/* Animated brain with orbiting particles */}
      <div className="relative w-32 h-32">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary-glow rounded-full blur-3xl opacity-50 animate-pulse-glow" />
        
        {/* Main brain icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="h-20 w-20 text-primary animate-float" />
        </div>
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-rotate-gradient">
          <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-5 text-accent animate-pulse" />
          <Zap className="absolute top-1/2 right-0 -translate-y-1/2 h-5 w-5 text-primary-glow animate-pulse" style={{ animationDelay: "0.3s" }} />
          <Code2 className="absolute bottom-0 left-1/2 -translate-x-1/2 h-5 w-5 text-primary animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
      
      {/* Text content with shimmer effect */}
      <div className="text-center space-y-4 max-w-xl">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
          Analyse sémantique en cours...
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed px-4">
          Notre IA analyse votre requête et recherche les contenus les plus pertinents dans notre corpus de connaissances
        </p>
      </div>
      
      {/* Progress steps */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-elegant">
            <span className="text-white font-bold">1</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">Analyse</span>
        </div>
        
        <div className="flex-1 h-1 bg-gradient-to-r from-primary via-accent to-primary-glow rounded-full animate-shimmer bg-[length:200%_100%]" />
        
        <div className="flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary-glow flex items-center justify-center shadow-elegant">
            <span className="text-white font-bold">2</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">Recherche</span>
        </div>
        
        <div className="flex-1 h-1 bg-gradient-to-r from-accent via-primary-glow to-primary rounded-full animate-shimmer bg-[length:200%_100%]" style={{ animationDelay: "0.2s" }} />
        
        <div className="flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-glow to-primary flex items-center justify-center shadow-elegant">
            <span className="text-white font-bold">3</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">Classement</span>
        </div>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-3 pt-4">
        <div className="h-3 w-3 bg-gradient-to-br from-primary to-primary-glow rounded-full animate-bounce shadow-lg" />
        <div className="h-3 w-3 bg-gradient-to-br from-accent to-primary-glow rounded-full animate-bounce shadow-lg" style={{ animationDelay: "0.2s" }} />
        <div className="h-3 w-3 bg-gradient-to-br from-primary-glow to-primary rounded-full animate-bounce shadow-lg" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
};
