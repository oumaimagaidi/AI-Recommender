import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, User, Globe, Star, Play, Book, FileText, Video, Zap, Search, Filter, Sparkles, Heart, Share2, BarChart3, Target } from "lucide-react";
import { useState, useEffect } from "react";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  similarity: number;
  category: string;
  type: string;
  url: string;
  language?: string;
  source?: string;
  metadata?: {
    duration?: string;
    level?: string;
    author?: string;
    pages?: string;
    reading_time?: string;
    website_preview?: string;
    rating?: number;
    students?: number;
  };
}

interface ResultCardProps {
  recommendation: Recommendation;
  index: number;
}

export const ResultCard = ({ recommendation, index }: ResultCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getSimilarityColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 75) return "text-cyan-400";
    if (score >= 60) return "text-amber-400";
    return "text-slate-400";
  };

  const getSimilarityBg = (score: number) => {
    if (score >= 90) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 75) return "bg-cyan-500/10 border-cyan-500/20";
    if (score >= 60) return "bg-amber-500/10 border-amber-500/20";
    return "bg-slate-500/10 border-slate-500/20";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return { icon: Video, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Vidéo' };
      case 'course':
        return { icon: Play, color: 'text-violet-400', bg: 'bg-violet-500/10', label: 'Cours' };
      case 'book':
        return { icon: Book, color: 'text-sky-400', bg: 'bg-sky-500/10', label: 'Livre' };
      case 'article':
        return { icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Article' };
      default:
        return { icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/10', label: 'Contenu' };
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return '';
    return duration
      .replace('hours', 'h')
      .replace('hour', 'h')
      .replace('minutes', 'min')
      .replace('min', 'min')
      .replace(' ', '');
  };

  const getSourceLogo = (source: string) => {
    const s = source.toLowerCase();
    
    const logos = {
      youtube: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png",
      udemy: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/640px-Udemy_logo.svg.png",
      coursera: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/640px-Coursera-Logo_600x600.svg.png",
      medium: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/640px-Medium_logo_Monogram.svg.png",
      amazon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png",
      pluralsight: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pluralsight_logo.svg/640px-Pluralsight_logo.svg.png",
      'frontend masters': "https://static.frontendmasters.com/assets/fm/js/static/frontendmasters.8dfc4049.svg",
      'harvard business review': "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Harvard_Business_Review_logo.svg/640px-Harvard_Business_Review_logo.svg.png"
    };

    if (s.includes('youtube')) return logos.youtube;
    if (s.includes('udemy')) return logos.udemy;
    if (s.includes('coursera')) return logos.coursera;
    if (s.includes('medium')) return logos.medium;
    if (s.includes('amazon')) return logos.amazon;
    if (s.includes('pluralsight')) return logos.pluralsight;
    if (s.includes('frontend masters')) return logos['frontend masters'];
    if (s.includes('harvard')) return logos['harvard business review'];

    return null;
  };

  const getWebsitePreview = () => {
    // Priorité 1: Image personnalisée dans les métadonnées
    if (recommendation.metadata?.website_preview) {
      return recommendation.metadata.website_preview;
    }

    // Priorité 2: Logo de la source
    if (recommendation.source) {
      const sourceLogo = getSourceLogo(recommendation.source);
      if (sourceLogo) return sourceLogo;
    }

    // Priorité 3: Image par défaut basée sur la catégorie
    const category = recommendation.category.toLowerCase();
    
    const images = {
      programming: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&auto=format",
      development: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&auto=format",
      design: "https://images.unsplash.com/photo-1561073543-7d0c2f732e57?w=400&h=250&fit=crop&auto=format",
      business: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&auto=format",
      data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format",
      devops: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format",
      architecture: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=250&fit=crop&auto=format",
      default: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&auto=format"
    };

    if (category.includes('program') || category.includes('code') || category.includes('développement')) return images.development;
    if (category.includes('web') || category.includes('frontend') || category.includes('backend')) return images.development;
    if (category.includes('design') || category.includes('ui') || category.includes('ux')) return images.design;
    if (category.includes('business') || category.includes('marketing')) return images.business;
    if (category.includes('data') || category.includes('ai') || category.includes('machine')) return images.data;
    if (category.includes('devops') || category.includes('cloud')) return images.devops;
    if (category.includes('architecture')) return images.architecture;
    
    return images.default;
  };

  const handleVisitContent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (recommendation.url && recommendation.url !== '#') {
      window.open(recommendation.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const websitePreviewUrl = getWebsitePreview();
  const typeInfo = getTypeIcon(recommendation.type);
  const TypeIcon = typeInfo.icon;
  const isLogo = !!recommendation.source && !!getSourceLogo(recommendation.source);

  useEffect(() => {
    const img = new Image();
    img.src = websitePreviewUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [websitePreviewUrl]);

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 border border-slate-200/60 bg-white/90 backdrop-blur-sm overflow-hidden hover:border-cyan-300/50 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header avec image/logo */}
        <div className={`relative h-48 overflow-hidden ${
          isLogo ? 'bg-white' : 'bg-gradient-to-br from-slate-100/50 to-slate-200/30'
        }`}>
          {!imageError ? (
            <img 
              src={websitePreviewUrl} 
              alt={`${recommendation.title} preview`}
              className={`w-full h-full transition-all duration-700 ${
                isLogo 
                  ? 'object-contain p-6' 
                  : 'object-cover'
              } ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered && !isLogo ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-50/50 to-violet-50/50">
              <Globe className="h-12 w-12 text-cyan-400/60" />
            </div>
          )}
          
          {/* Overlay gradient seulement pour les images, pas pour les logos */}
          {!isLogo && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          )}
          
          {/* Badges en overlay */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge className="bg-white/90 backdrop-blur-sm text-slate-700 border-0 font-semibold text-xs shadow-lg">
              {recommendation.category}
            </Badge>
            
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-full ${getSimilarityBg(recommendation.similarity)} backdrop-blur-sm border shadow-lg`}>
                <span className={`text-sm font-bold ${getSimilarityColor(recommendation.similarity)} flex items-center gap-1`}>
                  <Star className="h-3 w-3 fill-current" />
                  {recommendation.similarity}%
                </span>
              </div>
            </div>
          </div>

          {/* Type badge en bas */}
          <div className="absolute bottom-3 left-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${typeInfo.bg} ${typeInfo.color} text-xs font-semibold backdrop-blur-sm shadow-lg`}>
              <TypeIcon className="h-3 w-3" />
              <span>{typeInfo.label}</span>
            </div>
          </div>

          {/* Bouton like */}
          <button
            onClick={handleLike}
            className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-rose-500 text-white shadow-lg' 
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500 shadow-md'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 p-6">
          <CardHeader className="p-0 pb-4 space-y-3">
            {/* Titre */}
            <CardTitle className="text-lg font-bold text-slate-800 leading-tight line-clamp-2 group-hover:text-cyan-600 transition-colors">
              {recommendation.title}
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {recommendation.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            {/* Métadonnées */}
            <div className="flex flex-wrap gap-2">
              {recommendation.metadata?.duration && (
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/60 px-3 py-2 rounded-lg border border-slate-100">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="font-medium">{formatDuration(recommendation.metadata.duration)}</span>
                </div>
              )}
              
              {recommendation.metadata?.level && (
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/60 px-3 py-2 rounded-lg border border-slate-100">
                  <Target className="h-3 w-3 text-slate-400" />
                  <span className="font-medium">{recommendation.metadata.level}</span>
                </div>
              )}
              
              {recommendation.metadata?.rating && (
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/60 px-3 py-2 rounded-lg border border-slate-100">
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <span className="font-medium">{recommendation.metadata.rating}</span>
                </div>
              )}
            </div>

            {/* Source et domaine */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100/60">
              {recommendation.source && (
                <span className="font-semibold text-slate-700">Source: {recommendation.source}</span>
              )}
              
              {recommendation.url && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-slate-400" />
                  <span className="font-medium truncate max-w-[120px]">
                    {new URL(recommendation.url).hostname.replace('www.', '')}
                  </span>
                </div>
              )}
            </div>

            {/* Bouton d'action */}
            <Button 
              onClick={handleVisitContent}
              className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold py-3 text-sm transition-all duration-300 group/btn shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ExternalLink className="h-4 w-4 mr-2 transition-transform group-hover/btn:translate-x-0.5" />
              Découvrir
              <Sparkles className="h-4 w-4 ml-2 text-amber-200 animate-pulse" />
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

// Composant de grille avec header moderne
export const RecommendationsGrid = ({ recommendations }: { recommendations: Recommendation[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("similarity");

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rec.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || rec.category === selectedCategory;
    const matchesType = selectedType === "all" || rec.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case "similarity":
        return b.similarity - a.similarity;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const categories = ["all", ...new Set(recommendations.map(rec => rec.category))];
  const types = ["all", ...new Set(recommendations.map(rec => rec.type))];

  const averageSimilarity = Math.round(recommendations.reduce((acc, rec) => acc + rec.similarity, 0) / recommendations.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/20 to-violet-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      {/* Header moderne */}
      <header className="relative bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
            {/* Titre principal */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl shadow-2xl">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-cyan-600 bg-clip-text text-transparent mb-2">
                    Recommandations Intelligentes
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Des ressources personnalisées sélectionnées pour vous
                  </p>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="flex items-center justify-center lg:justify-end gap-6">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200/40">
                <div className="text-2xl font-bold text-cyan-600">{recommendations.length}</div>
                <div className="text-sm text-slate-500 font-medium">Ressources</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200/40">
                <div className="text-2xl font-bold text-emerald-500">{averageSimilarity}%</div>
                <div className="text-sm text-slate-500 font-medium">Pertinence</div>
              </div>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="space-y-6">
            {/* Barre de recherche */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher des cours, articles, vidéos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300/60 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-lg shadow-sm transition-all duration-300 focus:shadow-md"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200/40">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">Filtrer:</span>
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300/60 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white shadow-sm transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "Toutes catégories" : category}
                  </option>
                ))}
              </select>

              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-slate-300/60 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white shadow-sm transition-all duration-300"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "Tous types" : type}
                  </option>
                ))}
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-300/60 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white shadow-sm transition-all duration-300"
              >
                <option value="similarity">Pertinence</option>
                <option value="title">Alphabétique</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="relative container mx-auto px-6 py-12">
        {/* En-tête des résultats */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {filteredRecommendations.length} ressource{filteredRecommendations.length > 1 ? 's' : ''} trouvée{filteredRecommendations.length > 1 ? 's' : ''}
            </h2>
            <p className="text-slate-600 text-sm">
              Classées par {sortBy === "similarity" ? "pertinence" : "ordre alphabétique"}
            </p>
          </div>
          {(searchQuery || selectedCategory !== "all" || selectedType !== "all") && (
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
              }}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span>Effacer les filtres</span>
            </button>
          )}
        </div>

        {/* Grille de cartes */}
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecommendations.map((recommendation, index) => (
              <div 
                key={recommendation.id}
                className="opacity-0 animate-fade-in"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <ResultCard recommendation={recommendation} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-slate-200/60 max-w-md mx-auto shadow-lg">
              <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Aucun résultat trouvé</h3>
              <p className="text-slate-600 mb-8">
                Essayez de modifier vos critères de recherche ou vos filtres.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-slate-600 text-sm font-medium">
              🚀 Des recommandations intelligentes générées en temps réel par notre IA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Nouvelles données d'exemple avec des sources variées
export const exampleRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "React Moderne - Les Hooks Avancés",
    description: "Maîtrisez les hooks React avancés avec des projets pratiques et des cas réels d'entreprise.",
    similarity: 94,
    category: "Développement",
    type: "course",
    url: "https://example.com/react-course",
    source: "Udemy",
    metadata: {
      duration: "15 hours",
      level: "Intermédiaire",
      author: "Martin Developer",
      rating: 4.8,
      students: 12500
    }
  },
  {
    id: "2",
    title: "Design System avec Figma",
    description: "Créez des systèmes de design cohérents et évolutifs pour vos applications web et mobiles.",
    similarity: 88,
    category: "Design",
    type: "video",
    url: "https://example.com/figma-design",
    source: "YouTube",
    metadata: {
      duration: "8 hours",
      level: "Débutant",
      author: "Sarah Designer",
      rating: 4.9
    }
  },
  {
    id: "3",
    title: "Architecture Microservices",
    description: "Apprenez les principes des architectures microservices avec des exemples concrets et des bonnes pratiques.",
    similarity: 85,
    category: "Architecture",
    type: "article",
    url: "https://example.com/microservices",
    source: "Medium",
    metadata: {
      reading_time: "18 min",
      level: "Avancé",
      author: "Tech Lead Pro",
      rating: 4.7
    }
  },
  {
    id: "4",
    title: "JavaScript Moderne ES2024",
    description: "Découvrez les dernières fonctionnalités JavaScript et les patterns modernes de développement.",
    similarity: 92,
    category: "Développement",
    type: "book",
    url: "https://example.com/js-book",
    source: "Amazon",
    metadata: {
      pages: "420 pages",
      level: "Tous niveaux",
      author: "Dr. Code",
      rating: 4.6
    }
  },
  {
    id: "5",
    title: "UI/UX Design Patterns",
    description: "Les meilleurs patterns de design pour créer des expériences utilisateur exceptionnelles.",
    similarity: 87,
    category: "Design",
    type: "course",
    url: "https://example.com/uiux-patterns",
    source: "Coursera",
    metadata: {
      duration: "12 hours",
      level: "Intermédiaire",
      author: "Alex Creative",
      rating: 4.8,
      students: 8900
    }
  },
  {
    id: "6",
    title: "DevOps et CI/CD Moderne",
    description: "Automatisez vos pipelines de déploiement avec les outils DevOps les plus populaires.",
    similarity: 83,
    category: "DevOps",
    type: "video",
    url: "https://example.com/devops-course",
    source: "Pluralsight",
    metadata: {
      duration: "10 hours",
      level: "Intermédiaire",
      author: "DevOps Expert",
      rating: 4.5
    }
  },
  {
    id: "7",
    title: "TypeScript Avancé",
    description: "Maîtrisez TypeScript avec les types avancés, les génériques et les meilleures pratiques.",
    similarity: 91,
    category: "Développement",
    type: "course",
    url: "https://example.com/typescript",
    source: "Frontend Masters",
    metadata: {
      duration: "16 hours",
      level: "Avancé",
      author: "TypeScript Master",
      rating: 4.9,
      students: 15600
    }
  },
  {
    id: "8",
    title: "Product Management Agile",
    description: "Les fondamentaux du product management dans un environnement agile et moderne.",
    similarity: 78,
    category: "Business",
    type: "article",
    url: "https://example.com/product-mgmt",
    source: "Harvard Business Review",
    metadata: {
      reading_time: "25 min",
      level: "Débutant",
      author: "Product Leader",
      rating: 4.4
    }
  }
];

// Page d'exemple complète
export const ModernPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <RecommendationsGrid recommendations={exampleRecommendations} />
    </div>
  );
};

export default ModernPage;