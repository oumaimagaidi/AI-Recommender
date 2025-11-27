from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer, util
import numpy as np
import json
import time

# Import du vrai système IA
from services.semantic_ai import SemanticAIRecommender

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🧠 Démarrage du système IA sémantique...")
    load_ai_model()
    print("✅ Système IA sémantique chargé!")
    yield
    # Shutdown
    print("🔴 Application arrêtée")

app = FastAPI(
    title="AI-Recs - Vrai Système IA Sémantique",
    description="Système de recommandation intelligent avec compréhension sémantique réelle",
    version="3.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variables globales
ai_recommender = None

def load_ai_model():
    """Charge le vrai modèle IA sémantique"""
    global ai_recommender
    print("🧠 Initialisation de l'IA sémantique...")
    ai_recommender = SemanticAIRecommender()
    print("✅ IA sémantique prête! Capable de comprendre n'importe quelle requête.")

@app.get("/")
async def root():
    return {
        "message": "AI-Recs - Vrai Système IA de Recommandation Sémantique",
        "status": "🟢 En ligne",
        "technology": "Compréhension sémantique Hugging Face",
        "model": "all-mpnet-base-v2",
        "version": "3.0.0",
        "capabilities": [
            "Compréhension sémantique avancée",
            "Analyse d'intention utilisateur", 
            "Détection de niveau de difficulté",
            "Recommandations contextuelles intelligentes",
            "Base de connaissances étendue"
        ]
    }

@app.post("/recommend")
async def recommend_content(request: dict):
    """
    VRAI endpoint IA - Comprend sémantiquement la requête
    """
    try:
        user_text = request.get("text", "").strip()
        
        if not user_text:
            return {
                "query": user_text,
                "recommendations_found": 0,
                "recommendations": [],
                "message": "Veuillez décrire ce que vous souhaitez apprendre"
            }
        
        print(f"🧠 Traitement IA de: '{user_text}'")
        start_time = time.time()
        
        # Utiliser le VRAI système IA sémantique
        recommendations = ai_recommender.find_semantic_matches(user_text, top_k=8)
        
        processing_time = round((time.time() - start_time) * 1000, 2)
        
        print(f"✅ Analyse IA terminée en {processing_time}ms")
        print(f"   - {len(recommendations)} recommandations sémantiques générées")
        
        return {
            "query": user_text,
            "recommendations_found": len(recommendations),
            "recommendations": recommendations,
            "processing_time_ms": processing_time,
            "ai_analysis": True,
            "search_type": "semantic_ai"
        }
        
    except Exception as e:
        print(f"❌ Erreur IA sémantique: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analyze")
async def analyze_query(q: str = "apprendre la programmation"):
    """Endpoint pour analyser une requête (debug)"""
    analysis = ai_recommender.understand_query(q)
    return {
        "query": q,
        "analysis": analysis
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)