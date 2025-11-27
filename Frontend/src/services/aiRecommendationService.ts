export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  similarity: number;
  category: string;
  type: string;
  url: string;
  language: string;
  tags: string[];
}

export interface AIRecommendationResponse {
  query: string;
  recommendations_found: number;
  recommendations: AIRecommendation[];
  processing_time_ms: number; // CHANGÉ : directement au niveau racine
}

export class AIRecommendationService {
  // CORRIGEZ : Remplacez process.env par l'URL directe
  private static API_BASE_URL = 'http://localhost:8000';

  static async getSemanticRecommendations(query: string): Promise<AIRecommendationResponse> {
    try {
      console.log(`🧠 Envoi de la requête sémantique: "${query}"`);

      const response = await fetch(`${this.API_BASE_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: query }),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data: AIRecommendationResponse = await response.json();

      console.log(`✅ Réponse IA reçue: ${data.recommendations_found} recommandations`);
      console.log(`📊 Temps de traitement: ${data.processing_time_ms}ms`);

      return data;

    } catch (error) {
      console.error('❌ Erreur service IA:', error);
      throw new Error('Erreur de connexion au système de recommandation IA');
    }
  }

  static async testConnection(): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Erreur test connexion:', error);
      return null;
    }
  }
}