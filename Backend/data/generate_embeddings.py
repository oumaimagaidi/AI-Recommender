import json
import numpy as np
from sentence_transformers import SentenceTransformer
from pathlib import Path
import time

def generate_semantic_embeddings():
    """Génère les embeddings sémantiques avec le modèle Hugging Face"""
    
    print("🧠 Initialisation du modèle Hugging Face pour l'embedding sémantique...")
    
    # Modèle multilingue pour une meilleure compréhension
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-mpnet-base-v2')
    
    # Charger les contenus
    with open('contents.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        contents = data["contents"]
    
    print(f"📖 Chargement de {len(contents)} contenus pour l'analyse sémantique...")
    
    # Préparer les textes enrichis pour une meilleure compréhension
    content_texts = []
    for content in contents:
        # Texte enrichi pour capturer la sémantique complète
        semantic_text = f"""
        TITRE: {content['title']}
        DESCRIPTION: {content['description']}
        CATÉGORIE: {content['category']}
        TYPE: {content.get('type', 'article')}
        TAGS: {', '.join(content.get('tags', []))}
        LANGUE: {content.get('language', 'fr')}
        DOMAINE: {content['category']}
        """
        content_texts.append(semantic_text.strip())
    
    print("🔍 Génération des embeddings sémantiques...")
    start_time = time.time()
    
    # Générer les embeddings avec le modèle puissant
    embeddings = model.encode(
        content_texts,
        batch_size=32,
        show_progress_bar=True,
        convert_to_tensor=False,
        normalize_embeddings=True
    )
    
    generation_time = time.time() - start_time
    
    # Sauvegarder les embeddings
    np.save('embeddings.npy', embeddings)
    
    print(f"✅ Embeddings sémantiques générés avec succès!")
    print(f"   - Modèle: paraphrase-multilingual-mpnet-base-v2")
    print(f"   - Dimensions: {embeddings.shape}")
    print(f"   - Temps de génération: {generation_time:.2f} secondes")
    print(f"   - Fichier: embeddings.npy")
    
    # Test de similarité
    test_query = "apprendre la programmation"
    test_embedding = model.encode([test_query])
    similarities = np.dot(embeddings, test_embedding.T).flatten()
    max_similarity = np.max(similarities)
    
    print(f"   - Test sémantique: similarité max = {max_similarity:.3f}")

if __name__ == "__main__":
    generate_semantic_embeddings()