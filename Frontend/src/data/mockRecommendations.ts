import { Recommendation } from "@/components/ResultCard";

export const mockCorpus: Recommendation[] = [
  {
    id: "video_react_1",
    title: "React Hooks: Guide complet et bonnes pratiques",
    description: "Un guide exhaustif sur l'utilisation des Hooks React, incluant useState, useEffect, useContext et les hooks personnalisés. Découvrez comment optimiser vos composants fonctionnels.",
    similarity: 0,
    category: "Frontend",
    type: "video",
    url: "https://youtube.com/watch?v=react_hooks_complete",
    source: "YouTube",
    language: "fr",
    metadata: {
      duration: "45 min",
      level: "Intermédiaire"
    }
  },
  {
    id: "course_react_1",
    title: "React - The Complete Guide 2024",
    description: "Cours complet React avec hooks, Redux, Next.js, et testing. Plus de 50 heures de contenu pour maîtriser React de A à Z.",
    similarity: 0,
    category: "Frontend",
    type: "course",
    url: "https://udemy.com/react-complete-guide",
    source: "Udemy",
    language: "en",
    metadata: {
      duration: "52 hours",
      level: "Débutant à Avancé"
    }
  },
  {
    id: "article_react_1",
    title: "React 18 Features: Un guide complet",
    description: "Découvrez les nouvelles fonctionnalités de React 18 : concurrent rendering, automatic batching, et les nouveaux hooks avec des exemples pratiques.",
    similarity: 0,
    category: "Frontend",
    type: "article",
    url: "https://reactjs.org/blog/2024/react-18",
    source: "React Official Blog",
    language: "en",
    metadata: {
      reading_time: "15 min",
      level: "Avancé"
    }
  },
  {
    id: "book_react_1",
    title: "Learning React: Modern Patterns for Developing React Apps",
    description: "Livre couvrant les patterns modernes React, les meilleures pratiques et l'écosystème complet. Incluant TypeScript et testing.",
    similarity: 0,
    category: "Frontend",
    type: "book",
    url: "https://amazon.com/learning-react-oreilly",
    source: "O'Reilly",
    language: "en",
    metadata: {
      pages: "350",
      author: "Alex Banks & Eve Porcello",
      level: "Intermédiaire"
    }
  },
  {
    id: "video_devops_1",
    title: "Sécuriser vos pipelines CI/CD avec DevSecOps",
    description: "Intégrez la sécurité dès le début du cycle de développement. Apprenez à configurer des scans de vulnérabilités, la gestion des secrets et l'authentification dans vos pipelines.",
    similarity: 0,
    category: "DevOps",
    type: "video",
    url: "https://youtube.com/watch?v=devsecops_pipeline",
    source: "YouTube",
    language: "fr",
    metadata: {
      duration: "35 min",
      level: "Intermédiaire"
    }
  },
  {
    id: "course_python_1",
    title: "Introduction au Machine Learning avec Python",
    description: "Découvrez les fondamentaux du Machine Learning: régression, classification, et réseaux de neurones. Utilisez scikit-learn et TensorFlow pour vos premiers modèles.",
    similarity: 0,
    category: "IA/ML",
    type: "course",
    url: "https://coursera.org/python-ml",
    source: "Coursera",
    language: "fr",
    metadata: {
      duration: "40 hours",
      level: "Débutant"
    }
  },
  {
    id: "video_kubernetes_1",
    title: "Architecture Microservices sur Kubernetes",
    description: "Déployez et orchestrez des microservices avec Kubernetes. Comprenez les concepts de pods, services, ingress et la communication entre services avec démonstration live.",
    similarity: 0,
    category: "Cloud",
    type: "video",
    url: "https://youtube.com/watch?v=kubernetes_microservices",
    source: "YouTube",
    language: "fr",
    metadata: {
      duration: "28 min",
      level: "Avancé"
    }
  },
  {
    id: "book_typescript_1",
    title: "TypeScript avancé: Types génériques et inférence",
    description: "Maîtrisez les types génériques, l'inférence de types, les utility types et les techniques avancées pour écrire du code TypeScript robuste et maintenable.",
    similarity: 0,
    category: "Frontend",
    type: "book",
    url: "https://amazon.com/typescript-avance",
    source: "Amazon",
    language: "fr",
    metadata: {
      pages: "280",
      author: "Marie Martin",
      level: "Avancé"
    }
  },
  {
    id: "article_nextjs_1",
    title: "Optimisation des performances Web avec Next.js",
    description: "Améliorez les performances de vos applications React avec Next.js: SSR, SSG, ISR, et optimisation d'images. Obtenez des scores Lighthouse parfaits.",
    similarity: 0,
    category: "Frontend",
    type: "article",
    url: "https://dev.to/nextjs/performance-optimization",
    source: "DEV Community",
    language: "en",
    metadata: {
      reading_time: "12 min",
      level: "Intermédiaire"
    }
  },
  {
    id: "course_docker_1",
    title: "Docker: Des bases à la production",
    description: "Containerisez vos applications avec Docker. Créez des images optimisées, gérez les volumes, et orchestrez avec Docker Compose pour des environnements de développement reproductibles.",
    similarity: 0,
    category: "DevOps",
    type: "course",
    url: "https://udemy.com/docker-complete",
    source: "Udemy",
    language: "fr",
    metadata: {
      duration: "25 hours",
      level: "Débutant"
    }
  },
  {
    id: "video_graphql_1",
    title: "GraphQL vs REST: Choisir la bonne API",
    description: "Comparez GraphQL et REST pour vos APIs. Découvrez les avantages et inconvénients de chaque approche, et implémentez une API GraphQL avec Apollo Server en direct.",
    similarity: 0,
    category: "Backend",
    type: "video",
    url: "https://youtube.com/watch?v=graphql_vs_rest",
    source: "YouTube",
    language: "en",
    metadata: {
      duration: "32 min",
      level: "Intermédiaire"
    }
  },
  {
    id: "suggestion_typescript",
    title: "Vous pourriez aussi aimer: TypeScript Avancé",
    description: "Contenu recommandé basé sur votre intérêt pour React. Maîtrisez TypeScript pour améliorer votre développement React.",
    similarity: 0,
    category: "Recommandé",
    type: "suggestion",
    url: "#search-typescript",
    source: "AI Suggestion",
    language: "fr"
  }
];

// Fonction pour simuler le calcul de similarité sémantique avec contenu dynamique
export const getRecommendations = (query: string): Recommendation[] => {
  const queryLower = query.toLowerCase();
  
  // Mots-clés étendus pour une meilleure correspondance
  const keywordScores: { [key: string]: string[] } = {
    "video_react_1": ["react", "hooks", "frontend", "javascript", "composant", "useState", "useEffect"],
    "course_react_1": ["react", "frontend", "redux", "next.js", "cours", "formation", "apprendre"],
    "article_react_1": ["react", "react 18", "features", "concurrent", "rendering", "hooks"],
    "book_react_1": ["react", "livre", "patterns", "typescript", "testing", "best practices"],
    "video_devops_1": ["devops", "sécurité", "ci/cd", "pipeline", "devsecops", "scan", "vulnérabilités"],
    "course_python_1": ["python", "machine learning", "ml", "ia", "scikit-learn", "tensorflow", "algorithmes"],
    "video_kubernetes_1": ["kubernetes", "microservices", "cloud", "orchestration", "conteneur", "docker"],
    "book_typescript_1": ["typescript", "types", "générique", "inférence", "advanced", "programmation"],
    "article_nextjs_1": ["next.js", "nextjs", "performance", "react", "optimisation", "ssr", "ssg"],
    "course_docker_1": ["docker", "container", "conteneur", "devops", "production", "compose"],
    "video_graphql_1": ["graphql", "api", "rest", "backend", "apollo", "server"],
    "suggestion_typescript": ["react", "typescript", "javascript", "frontend", "développement"]
  };

  // Calculer un score de similarité basé sur les mots-clés
  const scoredRecommendations = mockCorpus.map((rec) => {
    const keywords = keywordScores[rec.id] || [];
    let score = 0;
    
    keywords.forEach((keyword) => {
      if (queryLower.includes(keyword)) {
        score += 15; // Score réduit pour plus de variété
      }
    });
    
    // Score de base plus variable pour simuler l'IA
    const baseScore = 30 + Math.random() * 40;
    const finalScore = Math.min(Math.round(baseScore + score), 95);
    
    return {
      ...rec,
      similarity: finalScore,
    };
  });

  // Trier par score décroissant et retourner le top 6
  return scoredRecommendations
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 6)
    .filter(rec => rec.similarity > 25); // Filtrer les résultats trop peu pertinents
};

// Fonction pour tester différents types de contenu
export const getRecommendationsByType = (query: string, contentType?: string): Recommendation[] => {
  let recommendations = getRecommendations(query);
  
  if (contentType) {
    recommendations = recommendations.filter(rec => 
      rec.type === contentType || rec.category.toLowerCase().includes(contentType.toLowerCase())
    );
  }
  
  return recommendations;
};

// Fonction pour obtenir des statistiques sur le corpus
export const getCorpusStats = () => {
  const stats = {
    total: mockCorpus.length,
    byType: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
    byLanguage: {} as Record<string, number>
  };
  
  mockCorpus.forEach(rec => {
    stats.byType[rec.type] = (stats.byType[rec.type] || 0) + 1;
    stats.byCategory[rec.category] = (stats.byCategory[rec.category] || 0) + 1;
    stats.byLanguage[rec.language || 'fr'] = (stats.byLanguage[rec.language || 'fr'] || 0) + 1;
  });
  
  return stats;
};

// Exemple d'utilisation des statistiques
console.log('📊 Statistiques du corpus:', getCorpusStats());