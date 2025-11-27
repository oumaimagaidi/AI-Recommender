🧠 AI-Recs - Intelligent Content Recommendation System
https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop

AI-Recs is a powerful, AI-driven content recommendation system that uses semantic understanding to provide personalized learning resources. Built with modern technologies and featuring a beautiful dark/light mode interface.

✨ Features
🎯 Core Capabilities
Semantic AI Matching: Uses Hugging Face transformers to understand the true meaning of your queries

Multi-Platform Content: Recommends videos, courses, articles, and books from various platforms

Real-time Processing: Fast, intelligent recommendations powered by advanced NLP

Smart Fallbacks: Graceful degradation when backend services are unavailable

🎨 User Experience
Dark/Light Mode: Beautiful theme switching with system preference detection

Responsive Design: Perfect experience on desktop, tablet, and mobile

Glass Morphism: Modern UI with backdrop blur effects and gradients

Smooth Animations: Engaging micro-interactions and loading states

Accessible: Built with accessibility and usability in mind

🔧 Technical Features
FastAPI Backend: High-performance Python backend with async support

React Frontend: Modern React 18 with TypeScript for type safety

Real URLs: Direct links to actual educational content

Semantic Search: Advanced vector similarity matching

Modular Architecture: Clean, maintainable code structure

🚀 Quick Start
Prerequisites
Node.js 18+

Python 3.9+

Git

Installation
Clone the repository

bash
git clone https://github.com/your-username/ai-reccommender.git
cd ai-recommender
Backend Setup

bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt
python data/create_test_data.py
python main.py
Frontend Setup (in a new terminal)

bash
cd frontend
npm install
npm run dev
Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:8000

🛠️ Technology Stack
Frontend
React 18 - UI framework

TypeScript - Type safety

Tailwind CSS - Styling

shadcn/ui - Component library

Lucide React - Icons

Vite - Build tool

Backend
FastAPI - Web framework

Sentence Transformers - NLP models

Hugging Face - AI models

NumPy - Numerical computing

Uvicorn - ASGI server

AI/ML
Hugging Face Models: all-mpnet-base-v2, all-MiniLM-L6-v2

Semantic Search: Cosine similarity with sentence embeddings

Content Discovery: Intelligent content matching across domains

📁 Project Structure
text
ai-recs/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Theme, etc.)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # Global styles
│   └── package.json
├── backend/
│   ├── main.py            # FastAPI application
│   ├── services/          # Business logic
│   ├── models/            # Data models
│   ├── data/              # Data files & embeddings
│   └── requirements.txt
└── README.md
🎮 Usage Examples
Sample Queries to Try:
"I want to learn React and modern frontend development"

"Machine learning for beginners with Python"

"DevOps and cloud infrastructure"

"Mobile app development with Flutter"

"Data science and visualization"

Content Types Available:
🎬 Videos: YouTube tutorials and courses

📚 Courses: Udemy, Coursera, edX

📖 Books: Amazon, O'Reilly, technical books

📄 Articles: Medium, DEV Community, official docs

🎯 AI Suggestions: Contextual recommendations

🔧 Configuration
Environment Variables
Backend (.env)

env
MODEL_NAME=all-mpnet-base-v2
HOST=0.0.0.0
PORT=8000
DEBUG=true
Frontend (.env)

env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI-Recs
Customization
You can customize:

AI Models: Switch between different Hugging Face models

Content Sources: Add new educational platforms

UI Themes: Modify color schemes in Tailwind config

Recommendation Logic: Adjust similarity thresholds

🧪 Development
Running in Development Mode
bash
# Backend (with auto-reload)
cd backend && python main.py

# Frontend (with hot reload)
cd frontend && npm run dev
Building for Production
bash
# Frontend build
cd frontend && npm run build

# Backend (production ready)
cd backend && uvicorn main:app --host 0.0.0.0 --port 8000
Testing
bash
# Backend tests
cd backend && python -m pytest

# Frontend tests  
cd frontend && npm test
📊 API Documentation
When the backend is running, visit:

Interactive API Docs: http://localhost:8000/docs

Alternative Docs: http://localhost:8000/redoc

Key Endpoints:
POST /recommend - Get content recommendations

GET /health - Service health check

GET /analyze - Debug query analysis

🎨 Customization Guide
Adding New Content Types
Update services/content_discovery.py

Add new content templates

Update frontend ResultCard component

Modifying AI Models
python
# In backend/services/semantic_ai.py
self.model = SentenceTransformer('your-model-name')
Styling Changes
Modify tailwind.config.js for design tokens

Update CSS variables in src/index.css

Customize components in src/components/

🤝 Contributing
We welcome contributions! Please see our Contributing Guide for details.

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Hugging Face for the amazing transformer models

Unsplash for beautiful placeholder images

Tailwind CSS for the utility-first CSS framework

FastAPI for the modern Python web framework

React Team for the incredible frontend library
