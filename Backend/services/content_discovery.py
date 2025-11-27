import requests
import json
from typing import List, Dict
import time
from sentence_transformers import SentenceTransformer, util
import numpy as np

class ContentDiscovery:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
    def search_educational_content(self, query: str) -> List[Dict]:
        """Recherche intelligente de contenu éducatif pour n'importe quelle requête"""
        
        print(f"🔍 Recherche intelligente pour: '{query}'")
        
        # Analyser la requête pour déterminer le type de contenu
        query_analysis = self._analyze_query(query)
        print(f"📊 Analyse de la requête: {query_analysis}")
        
        # Recherche basée sur l'analyse
        content_sources = self._search_by_category(query, query_analysis)
        
        # Enrichir avec des suggestions IA
        ai_suggestions = self._generate_ai_suggestions(query, query_analysis)
        
        all_content = content_sources + ai_suggestions
        
        print(f"📦 Contenu trouvé: {len(all_content)} éléments")
        return all_content
    
    def _analyze_query(self, query: str) -> Dict:
        """Analyse la requête pour déterminer le domaine et le type de contenu"""
        query_lower = query.lower()
        
        # Domaines techniques
        tech_domains = {
            'programmation': ['python', 'javascript', 'java', 'c++', 'programmation', 'coder', 'développement', 'code'],
            'web': ['react', 'vue', 'angular', 'html', 'css', 'frontend', 'backend', 'fullstack', 'web'],
            'data': ['machine learning', 'data science', 'analyse données', 'big data', 'ai', 'intelligence artificielle', 'ml'],
            'devops': ['docker', 'kubernetes', 'cloud', 'aws', 'azure', 'ci/cd', 'devops', 'infrastructure'],
            'mobile': ['android', 'ios', 'react native', 'flutter', 'mobile', 'application mobile'],
            'base de données': ['sql', 'mysql', 'postgresql', 'mongodb', 'database', 'bdd'],
            'cybersécurité': ['sécurité', 'cybersécurité', 'hacking', 'pentest', 'sécurisation', 'security'],
            'design': ['ui', 'ux', 'design', 'figma', 'interface', 'utilisateur']
        }
        
        # Types d'apprentissage
        learning_types = {
            'débutant': ['débutant', 'commencer', 'apprendre', 'basique', 'fondamentaux', 'introduction', 'premiers pas'],
            'avancé': ['avancé', 'expert', 'professionnel', 'master', 'deep', 'avancée', 'expertise'],
            'projet': ['projet', 'portfolio', 'application', 'créer', 'construire', 'développer', 'réaliser'],
            'théorie': ['théorie', 'concept', 'principe', 'fondamentaux', 'base théorique', 'concepts']
        }
        
        detected_domains = []
        detected_levels = []
        
        for domain, keywords in tech_domains.items():
            if any(keyword in query_lower for keyword in keywords):
                detected_domains.append(domain)
                
        for level, keywords in learning_types.items():
            if any(keyword in query_lower for keyword in keywords):
                detected_levels.append(level)
        
        return {
            'domains': detected_domains if detected_domains else ['général'],
            'levels': detected_levels if detected_levels else ['débutant'],
            'is_technical': any(domain in detected_domains for domain in tech_domains.keys())
        }
    
    def _search_by_category(self, query: str, analysis: Dict) -> List[Dict]:
        """Recherche de contenu basée sur la catégorie détectée"""
        all_content = []
        
        # Recherche dans tous les domaines détectés
        for domain in analysis['domains']:
            if domain == 'programmation':
                all_content.extend(self._search_programming_content(query, analysis))
            elif domain == 'web':
                all_content.extend(self._search_web_content(query, analysis))
            elif domain == 'data':
                all_content.extend(self._search_data_science_content(query, analysis))
            elif domain == 'devops':
                all_content.extend(self._search_devops_content(query, analysis))
            elif domain == 'mobile':
                all_content.extend(self._search_mobile_content(query, analysis))
            elif domain == 'design':
                all_content.extend(self._search_design_content(query, analysis))
            else:
                # Recherche générale
                all_content.extend(self._search_general_content(query, analysis))
        
        return all_content
    
    def _search_general_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu éducatif général pour n'importe quelle requête avec URLs réels"""
        search_query = query.replace(' ', '+')
        general_content = [
            {
                "id": f"general_course_{int(time.time())}",
                "title": f"Apprendre {query.title()} - Cours Complet",
                "description": f"Ressource éducative complète pour maîtriser {query}. Contenu adapté pour les {analysis['levels'][0]} avec exercices pratiques.",
                "type": "course",
                "category": "Formation en Ligne",
                "url": f"https://www.coursera.org/search?query={search_query}",
                "source": "Coursera",
                "language": "multilingue",
                "duration": "Variable",
                "level": analysis['levels'][0].title()
            },
            {
                "id": f"general_video_{int(time.time())}",
                "title": f"Tutoriels {query.title()} - YouTube",
                "description": f"Collection de vidéos éducatives pour apprendre {query} pas à pas avec des exemples concrets.",
                "type": "video",
                "category": "Tutoriels Vidéo",
                "url": f"https://www.youtube.com/results?search_query={search_query}+tutorial+apprendre",
                "source": "YouTube",
                "language": "multilingue",
                "duration": "5-60 min",
                "level": analysis['levels'][0].title()
            },
            {
                "id": f"general_article_{int(time.time())}",
                "title": f"Guide {query.title()} - Documentation",
                "description": f"Articles détaillés et documentation technique pour comprendre les concepts de {query}.",
                "type": "article",
                "category": "Documentation",
                "url": f"https://medium.com/search?q={search_query}",
                "source": "Medium",
                "language": "en",
                "reading_time": "10-20 min",
                "level": "Intermédiaire"
            },
            {
                "id": f"general_book_{int(time.time())}",
                "title": f"Livres sur {query.title()}",
                "description": f"Sélection de livres et eBooks pour approfondir vos connaissances en {query}.",
                "type": "book",
                "category": "Ressources Écrites",
                "url": f"https://www.amazon.fr/s?k={search_query}+apprentissage+livre",
                "source": "Amazon",
                "language": "multilingue",
                "pages": "200-500",
                "level": analysis['levels'][0].title()
            }
        ]
        
        return general_content
    
    def _search_programming_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu pour la programmation avec URLs réels"""
        programming_content = [
            {
                "id": "prog_python_course",
                "title": "Python for Everybody",
                "description": "Cours complet Python pour débutants. Apprenez la programmation avec des projets pratiques.",
                "type": "course",
                "category": "Programmation",
                "url": "https://www.coursera.org/specializations/python",
                "source": "Coursera",
                "language": "en",
                "duration": "8 mois",
                "level": "Débutant"
            },
            {
                "id": "prog_js_video",
                "title": "JavaScript Moderno - Tutoriel Complet",
                "description": "Maîtrisez JavaScript ES6+ avec les dernières fonctionnalités et bonnes pratiques.",
                "type": "video",
                "category": "Programmation",
                "url": "https://www.youtube.com/watch?v=PkZNo7MFNFg",
                "source": "YouTube",
                "language": "en",
                "duration": "3h 26min",
                "level": "Débutant"
            },
            {
                "id": "prog_java_course",
                "title": "Java Programming Masterclass",
                "description": "Devenez développeur Java avec ce cours complet incluant Spring Boot et microservices.",
                "type": "course",
                "category": "Programmation",
                "url": "https://www.udemy.com/course/java-the-complete-java-developer-course/",
                "source": "Udemy",
                "language": "en",
                "duration": "80 hours",
                "level": "Débutant à Avancé"
            }
        ]
        return programming_content
    
    def _search_web_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu pour le développement web avec URLs réels"""
        web_content = [
            {
                "id": "web_react_course",
                "title": "React - The Complete Guide",
                "description": "Développez des applications modernes avec React, hooks, context et Redux Toolkit.",
                "type": "course",
                "category": "Développement Web",
                "url": "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
                "source": "Udemy",
                "language": "en",
                "duration": "48 hours",
                "level": "Débutant à Avancé"
            },
            {
                "id": "web_html_css",
                "title": "HTML & CSS Full Course",
                "description": "Apprenez le développement web frontend avec HTML5, CSS3 et responsive design.",
                "type": "video",
                "category": "Développement Web",
                "url": "https://www.youtube.com/watch?v=mU6anWqZJcc",
                "source": "YouTube",
                "language": "en",
                "duration": "6h 30min",
                "level": "Débutant"
            },
            {
                "id": "web_nodejs",
                "title": "Node.js API Development",
                "description": "Créez des APIs RESTful avec Node.js, Express et MongoDB.",
                "type": "course",
                "category": "Développement Web",
                "url": "https://www.coursera.org/learn/server-side-nodejs",
                "source": "Coursera",
                "language": "en",
                "duration": "25 hours",
                "level": "Intermédiaire"
            }
        ]
        return web_content
    
    def _search_data_science_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu pour la data science et ML avec URLs réels"""
        data_content = [
            {
                "id": "data_ml_course",
                "title": "Machine Learning Specialization",
                "description": "Apprenez le machine learning avec Python, scikit-learn et TensorFlow.",
                "type": "course",
                "category": "Data Science",
                "url": "https://www.coursera.org/specializations/machine-learning-introduction",
                "source": "Coursera",
                "language": "en",
                "duration": "3 mois",
                "level": "Intermédiaire"
            },
            {
                "id": "data_python_video",
                "title": "Data Science with Python",
                "description": "Tutoriel complet sur Pandas, NumPy, Matplotlib pour l'analyse de données.",
                "type": "video",
                "category": "Data Science",
                "url": "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
                "source": "YouTube",
                "language": "en",
                "duration": "12 heures",
                "level": "Débutant"
            },
            {
                "id": "data_sql_course",
                "title": "SQL for Data Science",
                "description": "Maîtrisez SQL pour l'analyse et la manipulation de données.",
                "type": "course",
                "category": "Data Science",
                "url": "https://www.coursera.org/learn/sql-for-data-science",
                "source": "Coursera",
                "language": "en",
                "duration": "14 hours",
                "level": "Débutant"
            }
        ]
        return data_content
    
    def _search_devops_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu pour DevOps avec URLs réels"""
        devops_content = [
            {
                "id": "devops_docker_course",
                "title": "Docker Mastery",
                "description": "Apprenez Docker, Docker Compose et la containerisation d'applications.",
                "type": "course",
                "category": "DevOps",
                "url": "https://www.udemy.com/course/docker-mastery/",
                "source": "Udemy",
                "language": "en",
                "duration": "19 hours",
                "level": "Débutant à Avancé"
            },
            {
                "id": "devops_kubernetes",
                "title": "Kubernetes for Beginners",
                "description": "Introduction à Kubernetes et à l'orchestration de conteneurs.",
                "type": "video",
                "category": "DevOps",
                "url": "https://www.youtube.com/watch?v=X48VuDVv0do",
                "source": "YouTube",
                "language": "en",
                "duration": "2h 45min",
                "level": "Débutant"
            },
            {
                "id": "devops_aws",
                "title": "AWS Cloud Practitioner",
                "description": "Préparez la certification AWS et maîtrisez les services cloud.",
                "type": "course",
                "category": "DevOps",
                "url": "https://www.coursera.org/learn/aws-cloud-practitioner-essentials",
                "source": "Coursera",
                "language": "en",
                "duration": "15 hours",
                "level": "Débutant"
            }
        ]
        return devops_content
    
    def _search_mobile_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu pour le développement mobile avec URLs réels"""
        mobile_content = [
            {
                "id": "mobile_flutter",
                "title": "Flutter & Dart Complete Course",
                "description": "Développez des applications cross-platform avec Flutter et Dart.",
                "type": "course",
                "category": "Mobile",
                "url": "https://www.udemy.com/course/flutter-dart-the-complete-flutter-app-development-course/",
                "source": "Udemy",
                "language": "en",
                "duration": "32 hours",
                "level": "Débutant à Avancé"
            },
            {
                "id": "mobile_react_native",
                "title": "React Native Tutorial",
                "description": "Créez des applications iOS et Android avec React Native.",
                "type": "video",
                "category": "Mobile",
                "url": "https://www.youtube.com/watch?v=0-S5a0eXPoc",
                "source": "YouTube",
                "language": "en",
                "duration": "2h 15min",
                "level": "Intermédiaire"
            }
        ]
        return mobile_content
    
    def _search_design_content(self, query: str, analysis: Dict) -> List[Dict]:
        """Contenu pour le design avec URLs réels"""
        design_content = [
            {
                "id": "design_figma",
                "title": "UI/UX Design with Figma",
                "description": "Apprenez le design d'interfaces avec Figma, des wireframes aux prototypes.",
                "type": "course",
                "category": "Design",
                "url": "https://www.udemy.com/course/ui-ux-design-with-figma/",
                "source": "Udemy",
                "language": "en",
                "duration": "12 hours",
                "level": "Débutant"
            },
            {
                "id": "design_ux_video",
                "title": "UX Design Fundamentals",
                "description": "Les principes fondamentaux du design d'expérience utilisateur.",
                "type": "video",
                "category": "Design",
                "url": "https://www.youtube.com/watch?v=Ovj4hFxko7c",
                "source": "YouTube",
                "language": "en",
                "duration": "1h 20min",
                "level": "Débutant"
            }
        ]
        return design_content
    
    def _generate_ai_suggestions(self, query: str, analysis: Dict) -> List[Dict]:
        """Génère des suggestions intelligentes basées sur l'analyse"""
        suggestions = []
        
        # Suggestions basées sur le domaine
        domain_suggestions = {
            'programmation': ['Algorithmes et structures de données', 'Bonne pratiques de code', 'Tests unitaires'],
            'web': ['Responsive Design', 'Performance Web', 'SEO', 'Accessibilité'],
            'data': ['Visualisation de données', 'Deep Learning', 'NLP', 'Computer Vision'],
            'devops': ['Infrastructure as Code', 'Monitoring', 'Sécurité Cloud', 'CI/CD avancé'],
            'mobile': ['Performance Mobile', 'Design Patterns', 'Architecture MVVM', 'Tests mobiles'],
            'design': ['Design System', 'Prototypage avancé', 'Recherche utilisateur', 'Design Thinking']
        }
        
        for domain in analysis['domains']:
            if domain in domain_suggestions:
                for suggestion in domain_suggestions[domain][:2]:
                    search_url = f"https://www.google.com/search?q={suggestion.replace(' ', '+')}+apprentissage"
                    suggestions.append({
                        "id": f"suggestion_{domain}_{suggestion.replace(' ', '_').lower()}",
                        "title": f"Vous pourriez aimer: {suggestion}",
                        "description": f"Suggestion basée sur votre intérêt pour {domain}",
                        "type": "suggestion",
                        "category": "Recommandé",
                        "url": search_url,
                        "source": "AI Suggestion",
                        "language": "fr"
                    })
        
        return suggestions