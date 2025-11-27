import json
import numpy as np
from sentence_transformers import SentenceTransformer
import os

def create_test_data():
    """Crée des données de test si elles n'existent pas"""
    
    # Contenus de test
    contents = [
        {
            "id": 1,
            "title": "React Hooks: Guide complet et bonnes pratiques",
            "description": "Un guide exhaustif sur l'utilisation des Hooks React, incluant useState, useEffect, useContext et les hooks personnalisés.",
            "type": "article",
            "category": "Frontend",
            "url": "https://example.com/react-hooks",
            "language": "fr",
            "tags": ["react", "hooks", "frontend", "javascript"]
        },
        {
            "id": 2,
            "title": "Python pour la Data Science et l'Analyse",
            "description": "Maîtrisez Pandas, NumPy, Matplotlib et Scikit-learn pour l'analyse de données et la visualisation.",
            "type": "tutorial",
            "category": "Data Science",
            "url": "https://example.com/python-data-science",
            "language": "fr",
            "tags": ["python", "data science", "pandas", "numpy"]
        },
        {
            "id": 3,
            "title": "Docker et Kubernetes pour débutants",
            "description": "Apprenez la containerisation et l'orchestration d'applications avec des exemples concrets.",
            "type": "video",
            "category": "DevOps",
            "url": "https://example.com/docker-kubernetes",
            "language": "fr",
            "tags": ["docker", "kubernetes", "devops", "containers"]
        },
        {
            "id": 4,
            "title": "Machine Learning Fundamentals",
            "description": "Learn the basics of machine learning algorithms and their practical applications.",
            "type": "course",
            "category": "AI/ML",
            "url": "https://example.com/ml-fundamentals",
            "language": "en",
            "tags": ["machine learning", "ai", "algorithms", "python"]
        },
        {
            "id": 5,
            "title": "Sécurité Informatique et Cybersécurité",
            "description": "Protégez vos applications et infrastructures contre les cybermenaces.",
            "type": "article",
            "category": "Sécurité",
            "url": "https://example.com/cybersecurity",
            "language": "fr",
            "tags": ["sécurité", "cybersécurité", "protection", "hacking"]
        }
    ]
    
    # Créer le dossier data s'il n'existe pas
    os.makedirs('data', exist_ok=True)
    
    # Sauvegarder les métadonnées
    with open('data/contents.json', 'w', encoding='utf-8') as f:
        json.dump({"contents": contents}, f, indent=2, ensure_ascii=False)
    
    print("📝 Génération des embeddings...")
    
    # Charger le modèle
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Préparer les textes
    content_texts = []
    for content in contents:
        text = f"{content['title']} {content['description']} {', '.join(content['tags'])}"
        content_texts.append(text)
    
    # Générer les embeddings
    embeddings = model.encode(content_texts)
    
    # Sauvegarder les embeddings
    np.save('data/embeddings.npy', embeddings)
    
    print(f"✅ Données de test créées!")
    print(f"   - {len(contents)} contenus")
    print(f"   - Embeddings: {embeddings.shape}")

if __name__ == "__main__":
    create_test_data()