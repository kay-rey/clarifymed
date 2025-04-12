# ClarifyMed 🏥

AI-powered medical terminology clarification platform. Making healthcare communication accessible for everyone.

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/kay-rey/clarifymed.git
cd clarifymed
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp .env.example .env.local

# Fill in your environment variables in .env.local:
# - Auth0 credentials from https://manage.auth0.com/
# - MongoDB URI from https://www.mongodb.com/cloud/atlas
# - Gemini API key from https://makersuite.google.com/app/apikey
```

4. **Switch to dev branch**
```bash
git checkout dev
```

5. **Run the development server**
```bash
npm run dev
```

6. **View the app**
- Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌿 Branch Strategy

- `main` - Production-ready code (protected)
- `dev` - Development branch, all feature branches merge here first
- `feature/*` - Individual feature branches

### Development Workflow

1. **Start with dev branch**
```bash
git checkout dev
git pull origin dev
```

2. **Create your feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes and commit**
```bash
git add .
git commit -m "Add: description of your changes"
```

4. **Push your feature branch**
```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**
- Create PR from your `feature/*` branch to `dev`
- Get code review
- Merge to `dev`

6. **Release Process**
- Periodic merges from `dev` to `main`
- Only fully tested, reviewed code goes to `main`

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS, shadcn
- **Authentication:** Auth0
- **Database:** MongoDB
- **AI:** Google's Gemini AI
- **API Integration:** Axios

## 📁 Project Structure

```
clarifymed/
├── src/
│   ├── app/              # App router pages
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
├── public/              # Static files
└── package.json         # Project dependencies
```

## 🔍 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## ⚠️ Important Notes

1. **Environment Variables**
   - Never commit `.env.local` to git
   - Get the required API keys from team lead
   - Use test credentials for development

2. **Branch Protection**
   - `main` branch is protected
   - All changes must go through PR review
   - CI checks must pass before merging
   - Always work from `dev` branch

3. **Code Standards**
   - Use meaningful component names
   - Follow React best practices
   - Write clear commit messages
   - Include tests for new features

## 🏃‍♂️ Next Steps (Hackathon Tasks)

1. [ ] Set up Auth0 authentication
2. [ ] Implement MongoDB connection
3. [ ] Configure Gemini AI integration
4. [ ] Create basic UI components
5. [ ] Set up API routes
6. [ ] Implement medical text processing
7. [ ] Add user feedback system
8. [ ] Create documentation

## ⏰ Timeline

- Start: 2025-04-12 04:58:45 UTC
- Deadline: 2025-04-13 07:00:00 UTC
- Remaining: ~26 hours

## 🆘 Need Help?

- **Technical Issues:** Tag @kay-rey in GitHub issues
- **API Access:** Contact team lead for credentials
- **Documentation:** Check [Next.js Docs](https://nextjs.org/docs)
- **Team Chat:** Join our Discord/Slack channel

## 👥 Team

- Project Lead: [@kay-rey](https://github.com/kay-rey)
- [Add team members here]

## 🔧 Development Guidelines

1. **Code Style**
   - Use ES6+ features
   - Follow Next.js 15 best practices
   - Use Typescript-like JSDoc comments
   - Implement error handling

2. **Component Structure**
   - Functional components only
   - Use hooks for state management
   - Keep components small and focused
   - Implement proper prop validation

3. **Git Workflow**
   - Keep commits atomic
   - Use meaningful commit messages
   - Reference issues in commits
   - Keep PRs focused and small

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Auth0 Next.js SDK](https://auth0.com/docs/quickstart/webapp/nextjs)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Google AI SDK](https://ai.google.dev/docs)

---

Built with 💚 for AI Hackfest 2025