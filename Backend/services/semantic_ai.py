import requests
import json
from typing import List, Dict
import time
from sentence_transformers import SentenceTransformer, util
import numpy as np
import re

class SemanticAIRecommender:
    def __init__(self):
        # Modèle plus puissant pour la compréhension sémantique
        self.model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
        self.knowledge_base = self._initialize_knowledge_base()
        print("🧠 Modèle IA sémantique chargé - Prêt à comprendre n'importe quelle requête!")
    
    def _initialize_knowledge_base(self) -> Dict:
        """Base de connaissances éducative large et diversifiée"""
        return {
            "programming": {
                "python": ["débutant", "data science", "web", "automatisation", "machine learning"],
                "javascript": ["frontend", "backend", "react", "node.js", "applications web"],
                "java": ["entreprise", "android", "spring", "applications mobiles"],
                "c++": ["performance", "jeux vidéo", "systèmes embarqués"],
                "go": ["concurrent", "microservices", "cloud", "performance"]
            },
            "web_development": {
                "frontend": ["react", "vue", "angular", "html", "css", "javascript"],
                "backend": ["node.js", "python", "java", "php", "apis", "bases de données"],
                "fullstack": ["mern", "mean", "django", "ruby on rails"],
                "responsive": ["mobile", "tablette", "design adaptatif", "css grid"]
            },
            "data_science": {
                "machine_learning": ["supervisé", "non supervisé", "deep learning", "réseaux neuronaux"],
                "data_analysis": ["pandas", "numpy", "visualisation", "statistiques"],
                "big_data": ["spark", "hadoop", "traitement distribué", "data lakes"],
                "ai": ["intelligence artificielle", "nlp", "computer vision", "robotics"]
            },
            "devops": {
                "containers": ["docker", "kubernetes", "orchestration", "microservices"],
                "cloud": ["aws", "azure", "google cloud", "infrastructure as code"],
                "ci_cd": ["intégration continue", "déploiement continu", "jenkins", "gitlab"],
                "monitoring": ["logs", "métriques", "alertes", "performance"]
            },
            "mobile": {
                "android": ["kotlin", "java", "android studio", "applications natives"],
                "ios": ["swift", "objective-c", "xcode", "applications apple"],
                "cross_platform": ["react native", "flutter", "xamarin", "développement hybride"]
            },
            "design": {
                "ui_ux": ["interface utilisateur", "expérience utilisateur", "figma", "prototypage"],
                "graphic_design": ["photoshop", "illustrator", "design graphique", "branding"],
                "web_design": ["responsive", "accessibilité", "design system", "wireframes"]
            },
            "business": {
                "marketing": ["digital", "réseaux sociaux", "seo", "content marketing"],
                "management": ["gestion de projet", "agile", "scrum", "leadership"],
                "entrepreneuriat": ["startup", "business model", "levée de fonds", "growth hacking"]
            },
            "languages": {
                "english": ["débutant", "intermédiaire", "avancé", "business", "conversation"],
                "spanish": ["basique", "intermédiaire", "voyage", "business"],
                "french": ["langue maternelle", "perfectionnement", "professionnel"]
            },
            "soft_skills": {
                "communication": ["présentation", "négociation", "écriture", "écoute active"],
                "leadership": ["management", "motivation", "délégation", "prise de décision"],
                "productivity": ["gestion du temps", "organisation", "objectifs", "priorisation"]
            }
        }
    
    def understand_query(self, query: str) -> Dict:
        """Comprend sémantiquement la requête utilisateur"""
        # Encoder la requête
        query_embedding = self.model.encode([query])
        
        # Analyser les concepts dans la requête
        concepts = self._extract_concepts(query)
        intent = self._detect_intent(query)
        difficulty = self._detect_difficulty(query)
        
        return {
            "query": query,
            "embedding": query_embedding,
            "concepts": concepts,
            "intent": intent,
            "difficulty": difficulty,
            "timestamp": time.time()
        }
    
    def _extract_concepts(self, query: str) -> List[str]:
        """Extrait les concepts clés de la requête"""
        query_lower = query.lower()
        concepts = []
        
        # Parcourir la base de connaissances pour trouver des correspondances
        for domain, topics in self.knowledge_base.items():
            for topic, keywords in topics.items():
                # Vérifier les mots-clés exacts
                for keyword in keywords:
                    if keyword in query_lower:
                        concepts.append(f"{domain}.{topic}.{keyword}")
                
                # Vérifier le topic lui-même
                if topic.replace('_', ' ') in query_lower:
                    concepts.append(f"{domain}.{topic}")
            
            # Vérifier le domaine lui-même
            if domain.replace('_', ' ') in query_lower:
                concepts.append(domain)
        
        # Ajouter des concepts généraux basés sur des patterns
        if any(word in query_lower for word in ['apprendre', 'débutant', 'commencer']):
            concepts.append("learning.beginner")
        if any(word in query_lower for word in ['avancé', 'expert', 'maîtriser']):
            concepts.append("learning.advanced")
        if any(word in query_lower for word in ['projet', 'pratique', 'construire']):
            concepts.append("learning.project_based")
        
        return list(set(concepts))
    
    def _detect_intent(self, query: str) -> str:
        """Détecte l'intention de l'utilisateur"""
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['comment', 'faire', 'créer', 'construire']):
            return "hands_on"
        elif any(word in query_lower for word in ['apprendre', 'débutant', 'basique']):
            return "learn_basics"
        elif any(word in query_lower for word in ['améliorer', 'perfectionner', 'avancé']):
            return "improve_skills"
        elif any(word in query_lower for word in ['projet', 'portfolio', 'réaliser']):
            return "build_project"
        else:
            return "general_learning"
    
    def _detect_difficulty(self, query: str) -> str:
        """Détecte le niveau de difficulté souhaité"""
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['débutant', 'commencer', 'basique', 'premiers pas']):
            return "beginner"
        elif any(word in query_lower for word in ['intermédiaire', 'avancé', 'expert', 'maîtriser']):
            return "advanced"
        else:
            return "all_levels"
    
    def find_semantic_matches(self, query: str, top_k: int = 8) -> List[Dict]:
        """Trouve des correspondances sémantiques dans la base de connaissances"""
        query_analysis = self.understand_query(query)
        print(f"🧠 Analyse IA: {len(query_analysis['concepts'])} concepts détectés")
        print(f"   Intent: {query_analysis['intent']}, Difficulty: {query_analysis['difficulty']}")
        
        # Générer des recommandations basées sur l'analyse sémantique
        recommendations = self._generate_semantic_recommendations(query_analysis)
        
        # Trier par pertinence sémantique
        sorted_recommendations = self._rank_by_semantic_similarity(
            query_analysis['embedding'], 
            recommendations
        )
        
        return sorted_recommendations[:top_k]
    
    def _generate_semantic_recommendations(self, analysis: Dict) -> List[Dict]:
        """Génère des recommandations basées sur l'analyse sémantique"""
        recommendations = []
        
        # Générer du contenu basé sur les concepts détectés
        for concept in analysis['concepts']:
            domain_topic = concept.split('.')
            if len(domain_topic) >= 2:
                domain = domain_topic[0]
                topic = domain_topic[1]
                
                # Générer des recommandations spécifiques au concept
                concept_recommendations = self._generate_concept_content(
                    domain, topic, analysis
                )
                recommendations.extend(concept_recommendations)
        
        # Ajouter des recommandations générales si peu de concepts détectés
        if len(recommendations) < 4:
            general_recommendations = self._generate_general_content(analysis)
            recommendations.extend(general_recommendations)
        
        return recommendations
    
    def _generate_concept_content(self, domain: str, topic: str, analysis: Dict) -> List[Dict]:
        """Génère du contenu spécifique à un concept"""
        content = []
        base_id = f"{domain}_{topic}_{int(time.time())}"
        
        # Contenu basé sur le domaine et le topic
        if domain == "programming":
            content.extend(self._generate_programming_content(topic, analysis, base_id))
        elif domain == "web_development":
            content.extend(self._generate_web_content(topic, analysis, base_id))
        elif domain == "data_science":
            content.extend(self._generate_data_science_content(topic, analysis, base_id))
        elif domain == "devops":
            content.extend(self._generate_devops_content(topic, analysis, base_id))
        elif domain == "business":
            content.extend(self._generate_business_content(topic, analysis, base_id))
        else:
            # Contenu général pour les autres domaines
            content.extend(self._generate_domain_content(domain, topic, analysis, base_id))
        
        return content
    
    def _generate_programming_content(self, language: str, analysis: Dict, base_id: str) -> List[Dict]:
        """Génère du contenu pour la programmation"""
        content = []
        
        # URLs de recherche réels basés sur le langage et le niveau
        search_query = f"{language} programming {analysis['difficulty']}"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_course",
            "title": f"Apprendre {language.title()} - Cours {analysis['difficulty'].title()}",
            "description": f"Cours complet pour {analysis['difficulty']} en {language}. Programmation pratique avec projets réels.",
            "type": "course",
            "category": "Programmation",
            "url": f"https://www.coursera.org/search?query={encoded_query}",
            "source": "Coursera",
            "language": "multilingue",
            "duration": "20-60 heures",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.95
        })
        
        content.append({
            "id": f"{base_id}_tutorial",
            "title": f"Tutoriels {language.title()} - YouTube",
            "description": f"Collection de tutoriels vidéo pour maîtriser {language} à travers des exemples concrets.",
            "type": "video",
            "category": "Tutoriels",
            "url": f"https://www.youtube.com/results?search_query={encoded_query}+tutorial",
            "source": "YouTube",
            "language": "multilingue",
            "duration": "5-30 min/vidéo",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.88
        })
        
        return content
    
    def _generate_web_content(self, topic: str, analysis: Dict, base_id: str) -> List[Dict]:
        """Génère du contenu pour le développement web"""
        content = []
        
        search_query = f"web development {topic} {analysis['difficulty']}"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_course",
            "title": f"Développement Web {topic.title()} - Formation Complète",
            "description": f"Maîtrisez {topic} en développement web. {analysis['intent'].replace('_', ' ').title()} avec projets pratiques.",
            "type": "course",
            "category": "Développement Web",
            "url": f"https://www.udemy.com/courses/search/?q={encoded_query}",
            "source": "Udemy",
            "language": "multilingue",
            "duration": "15-40 heures",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.92
        })
        
        return content
    
    def _generate_data_science_content(self, topic: str, analysis: Dict, base_id: str) -> List[Dict]:
        """Génère du contenu pour la data science"""
        content = []
        
        search_query = f"data science {topic} {analysis['difficulty']}"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_specialization",
            "title": f"Data Science - {topic.title()} Spécialisation",
            "description": f"Spécialisation en {topic} pour la data science. Apprentissage progressif avec cas réels.",
            "type": "course",
            "category": "Data Science",
            "url": f"https://www.coursera.org/search?query={encoded_query}",
            "source": "Coursera",
            "language": "en",
            "duration": "3-6 mois",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.90
        })
        
        return content
    
    def _generate_devops_content(self, topic: str, analysis: Dict, base_id: str) -> List[Dict]:
        """Génère du contenu pour DevOps"""
        content = []
        
        search_query = f"devops {topic} {analysis['difficulty']}"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_course",
            "title": f"DevOps - {topic.title()} Mastery",
            "description": f"Maîtrisez {topic} en DevOps. Déploiement, monitoring et best practices.",
            "type": "course",
            "category": "DevOps",
            "url": f"https://www.udemy.com/courses/search/?q={encoded_query}",
            "source": "Udemy",
            "language": "en",
            "duration": "10-25 heures",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.87
        })
        
        return content
    
    def _generate_business_content(self, topic: str, analysis: Dict, base_id: str) -> List[Dict]:
        """Génère du contenu pour le business"""
        content = []
        
        search_query = f"{topic} {analysis['difficulty']} business"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_course",
            "title": f"{topic.title()} - Compétences Business",
            "description": f"Développez vos compétences en {topic} pour le monde professionnel.",
            "type": "course",
            "category": "Business",
            "url": f"https://www.coursera.org/search?query={encoded_query}",
            "source": "Coursera",
            "language": "multilingue",
            "duration": "15-30 heures",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.85
        })
        
        return content
    
    def _generate_domain_content(self, domain: str, topic: str, analysis: Dict, base_id: str) -> List[Dict]:
        """Génère du contenu pour les domaines généraux"""
        content = []
        
        search_query = f"{domain} {topic} {analysis['difficulty']} learning"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_general",
            "title": f"{topic.title()} - Apprentissage {analysis['difficulty'].title()}",
            "description": f"Ressources complètes pour apprendre {topic} en {domain}. Adapté aux {analysis['difficulty']}.",
            "type": "course",
            "category": domain.title(),
            "url": f"https://www.google.com/search?q={encoded_query}",
            "source": "Ressources Éducatives",
            "language": "multilingue",
            "duration": "Variable",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.80
        })
        
        return content
    
    def _generate_general_content(self, analysis: Dict) -> List[Dict]:
        """Génère du contenu général basé sur l'intention"""
        content = []
        base_id = f"general_{int(time.time())}"
        
        search_query = f"{analysis['query']} {analysis['difficulty']} learning"
        encoded_query = search_query.replace(' ', '+')
        
        content.append({
            "id": f"{base_id}_search",
            "title": f"Ressources pour: {analysis['query']}",
            "description": f"Contenu éducatif personnalisé pour votre recherche. Niveau {analysis['difficulty']}.",
            "type": "course",
            "category": "Apprentissage Personnalisé",
            "url": f"https://www.coursera.org/search?query={encoded_query}",
            "source": "Coursera",
            "language": "multilingue",
            "duration": "Variable",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.75
        })
        
        content.append({
            "id": f"{base_id}_youtube",
            "title": f"Tutoriels: {analysis['query']}",
            "description": f"Tutoriels vidéo adaptés à votre niveau {analysis['difficulty']}.",
            "type": "video",
            "category": "Tutoriels Vidéo",
            "url": f"https://www.youtube.com/results?search_query={encoded_query}",
            "source": "YouTube",
            "language": "multilingue",
            "duration": "5-60 min",
            "level": analysis['difficulty'].title(),
            "semantic_score": 0.72
        })
        
        return content
    
    def _rank_by_semantic_similarity(self, query_embedding, recommendations: List[Dict]) -> List[Dict]:
        """Classe les recommandations par similarité sémantique"""
        if not recommendations:
            return []
        
        # Extraire les textes pour l'embedding
        texts = [f"{rec['title']} {rec['description']} {rec['category']}" for rec in recommendations]
        
        # Calculer les embeddings
        rec_embeddings = self.model.encode(texts)
        
        # Calculer les similarités cosinus
        similarities = util.cos_sim(query_embedding, rec_embeddings)[0]
        
        # Associer les scores aux recommandations
        for i, rec in enumerate(recommendations):
            rec['semantic_similarity'] = float(similarities[i])
            # Convertir en pourcentage pour l'affichage
            rec['similarity'] = round(float(similarities[i]) * 100, 1)
        
        # Trier par similarité décroissante
        return sorted(recommendations, key=lambda x: x['semantic_similarity'], reverse=True)