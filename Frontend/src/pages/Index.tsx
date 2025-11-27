import { useState, useEffect } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ResultCard, Recommendation } from "@/components/ResultCard";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getRecommendations } from "@/data/mockRecommendations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Brain, Zap, MessageCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AIRecommendationService } from "@/services/aiRecommendationService";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [showAvatar, setShowAvatar] = useState(true);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setCurrentQuery(query);
    setShowAvatar(false);
    
    try {
      const results = await AIRecommendationService.getSemanticRecommendations(query);
      setRecommendations(results.recommendations);
      
      console.log(`🎯 Analyse sémantique réussie: ${results.recommendations_found} résultats`);
      console.log(`⚡ Temps de traitement: ${results.processing_time_ms}ms`);
      
    } catch (error) {
      console.error('❌ Erreur analyse IA:', error);
      const fallbackResults = getRecommendations(query);
      setRecommendations(fallbackResults);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setCurrentQuery("");
    setShowAvatar(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      {/* Header avec contrôles de thème */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        {/* Header avec effet glassmorphism */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary-glow rounded-full blur-2xl opacity-30 animate-pulse-glow" />
            <div className="relative flex items-center justify-center gap-4 px-8 py-4 glass-effect rounded-full border-2 border-primary/20 backdrop-blur-sm">
              <Brain className="h-10 w-10 text-primary animate-float" />
              <h1 className="text-5xl md:text-6xl font-black gradient-text">
                AI-Recs
              </h1>
              <Zap className="h-10 w-10 text-accent animate-float" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              Personalized Content Recommender
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="font-medium">Alimenté par l'intelligence artificielle sémantique</span>
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            </div>
          </div>
        </header>

        {/* Avatar flottant amélioré */}
        {showAvatar && !isLoading && recommendations.length === 0 && (
          <FloatingAvatar />
        )}

        {/* État initial: Formulaire de recherche */}
        {!isLoading && recommendations.length === 0 && (
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        )}

        {/* État de chargement */}
        {isLoading && <LoadingAnimation />}

        {/* État avec résultats */}
        {!isLoading && recommendations.length > 0 && (
          <div className="space-y-10 animate-fade-in">
            {/* Récapitulatif de la requête avec effet glassmorphism */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary-glow rounded-2xl blur opacity-20" />
              <Card className="relative glass-effect border-2 border-primary/20 p-8 shadow-elegant backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        Votre requête analysée
                      </h2>
                    </div>
                    <p className="text-base font-medium text-foreground leading-relaxed">
                      "{currentQuery}"
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="shrink-0 border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Nouvelle recherche
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Liste des recommandations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="gradient-text">Recommandations personnalisées</span>
                  <span className="text-muted-foreground text-xl">
                    ({recommendations.length})
                  </span>
                </h2>
              </div>
              
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {recommendations.map((rec, index) => (
                  <ResultCard 
                    key={rec.id} 
                    recommendation={rec} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer amélioré */}
        <footer className="mt-20 text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-border/50 backdrop-blur-sm">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
            <p className="text-sm font-medium text-muted-foreground">
              Powered by semantic AI matching
            </p>
            <span className="text-xs text-muted-foreground/60">•</span>
            <span className="text-xs font-semibold text-primary">Version 1.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

// Composant Avatar Flottant Amélioré
const FloatingAvatar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const messages = [
    "💡 Décrivez vos passions en détail pour des recommandations plus précises !",
    "🚀 Utilisez des mots-clés spécifiques pour améliorer les résultats",
    "🎯 Plus votre description est précise, mieux je peux vous aider !",
    "✨ N'hésitez pas à mentionner vos compétences et objectifs",
    "🔍 L'IA analyse le contexte sémantique de votre demande"
  ];

  // Rotation automatique des messages
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, messages.length]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 bottom-8 z-30 animate-slide-in-right">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Bulle de message améliorée */}
        <div className="absolute bottom-full right-0 mb-4 w-80 px-4 py-3 glass-effect rounded-2xl border-2 border-primary/20 backdrop-blur-sm shadow-elegant animate-fade-in">
          {/* En-tête de la bulle */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                Assistant IA
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleNextMessage}
                className="w-6 h-6 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Sparkles className="w-3 h-3 text-primary" />
              </button>
              <button 
                onClick={handleClose}
                className="w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          {/* Contenu du message */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full animate-pulse" />
            <p className="text-sm font-medium text-foreground leading-relaxed flex-1">
              {messages[currentMessage]}
            </p>
          </div>
          
          {/* Indicateur de progression */}
          <div className="flex gap-1 mt-3">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentMessage 
                    ? "bg-primary flex-1" 
                    : "bg-primary/20 flex-1"
                }`}
              />
            ))}
          </div>
          
          {/* Flèche de la bulle positionnée à droite */}
          <div className="absolute top-full right-6 border-8 border-transparent border-t-primary/20" />
        </div>

        {/* Avatar amélioré */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-2xl p-1.5 shadow-glow group-hover:scale-110 transition-all duration-300 cursor-pointer">
          <div className="w-full h-full bg-background rounded-xl flex items-center justify-center backdrop-blur-sm">
            <div className="relative">
              {/* Visage amélioré */}
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                
                {/* Yeux animés */}
                <div className="flex gap-2 -mt-1 relative z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-blink" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-blink" style={{ animationDelay: "0.1s" }} />
                </div>
                
                {/* Sourire expressif */}
                <div className="absolute bottom-2 w-4 h-0.5 bg-white rounded-full animate-smile" />
              </div>
              
              {/* Élément décoratif animé */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" style={{ animationDuration: "2s" }} />
            </div>
          </div>
          
          {/* Effet de pulsation externe */}
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
        </div>

        {/* Badge animé amélioré */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-accent rounded-full flex items-center justify-center animate-bounce shadow-lg">
          <MessageCircle className="w-2.5 h-2.5 text-white" />
        </div>

        {/* Effet de halo au survol */}
        <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default Index;