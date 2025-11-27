import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, MessageCircle, Lightbulb } from "lucide-react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const exampleTags = [
  "Développement React",
  "Sécurité DevOps",
  "Machine Learning",
  "Cloud Computing",
  "Architecture Microservices",
];

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Carte principale avec design moderne */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500">
          <div className="space-y-6">
            {/* En-tête avec icône et titre */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  Décrivez vos centres d'intérêt
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  Soyez précis pour des recommandations optimales
                </p>
              </div>
            </div>

            {/* Zone de texte améliorée */}
            <div className="relative">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value.slice(0, maxLength))}
                placeholder="Exemple: Je suis passionné par le développement d'applications web modernes avec React, TypeScript et les architectures cloud natives. J'aimerais approfondir mes connaissances en optimisation des performances et en sécurité applicative..."
                className="min-h-[140px] resize-none text-base border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                disabled={isLoading}
              />
              
              {/* Indicateur de caractères */}
              <div className="absolute bottom-3 right-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  query.length >= maxLength 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                }`}>
                  {query.length}/{maxLength}
                </div>
              </div>
            </div>

            {/* Conseils contextuels */}
            {query.length === 0 && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 Décrivez vos passions en détail pour des recommandations plus précises !
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section des suggestions améliorée */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl shadow-purple-500/5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Suggestions rapides
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cliquez pour insérer automatiquement
                  </p>
                </div>
              </div>
            </div>
            
            {/* Grille de tags améliorée */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {exampleTags.map((tag, index) => (
                <div
                  key={tag}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleTagClick(tag)}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-2xl p-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {tag}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <Sparkles className="h-3 w-3 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bouton de soumission premium */}
        <Button
          type="submit"
          size="lg"
          disabled={!query.trim() || isLoading}
          className="w-full text-base font-semibold py-7 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-0 relative overflow-hidden group"
        >
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyse sémantique en cours...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 animate-pulse" />
                Générer des Recommandations Intelligentes
                <span className="text-lg">🧠</span>
              </>
            )}
          </span>
        </Button>

        {/* Indicateur de statut */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">
              Système IA prêt à analyser votre requête
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};