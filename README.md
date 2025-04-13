# ClarifyMed 🏥

AI-powered medical terminology clarification platform that bridges the gap between complex medical language and everyday understanding.

## 🎯 Key Features

- **Smart Explanations**: Real-time medical term clarification using Gemini AI
- **Dual Understanding**: Both simplified and technical definitions
- **Secure Access**: Protected user data with Auth0
- **History Tracking**: Save and reference past explanations
- **Medical Safety**: Built-in verification and disclaimer system

## 🚀 Quick Start

1. **Clone and Install**

```bash
git clone https://github.com/kay-rey/clarifymed.git
cd clarifymed
npm install
```

2. **Set up Environment**

```bash
cp .env.example .env.local
```

Add your credentials to `.env.local`:

- `AUTH0_DOMAIN` - Auth0 application domain
- `AUTH0_CLIENT_ID` - Auth0 client ID
- `AUTH0_CLIENT_SECRET` - Auth0 client secret
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Gemini AI API key

3. **Start Development**

```bash
git checkout dev
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn
- **Backend**: MongoDB, Next.js API Routes
- **AI**: Google Gemini AI
- **Auth**: Auth0
- **Testing**: Jest, React Testing Library
- **API**: Axios

## 📁 Project Structure

```
src/
├── app/              # Pages and API routes
│   ├── api/         # Backend endpoints
│   └── (routes)/    # Frontend pages
├── components/       # React components
├── lib/
│   ├── db/          # Database utilities
│   ├── models/      # TypeScript types
│   └── services/    # External services
└── styles/          # Global styles
```

## 🔄 Development Workflow

1. **Start from dev**

```bash
git checkout dev
git pull origin dev
```

2. **Create feature branch**

```bash
git checkout -b feature/your-feature
```

3. **Commit changes**

```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature
```

4. Create PR to `dev` branch

## 📝 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - Code linting

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run coverage report
npm run test:coverage
```

## 🔐 Security Notes

- Never commit `.env.local`
- Use test credentials for development
- Follow Auth0 security guidelines
- Implement proper error handling
- Validate all user inputs

## 👥 Team

- [Kevin Reyes](https://github.com/kay-rey)
- [Timothy Phan](https://github.com/TimothyPhan2)
- [Ethan Enkhtur](https://github.com/ethanenkhtur)
- [Prachi Saibewar](https://github.com/prachics)

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Auth0 Guide](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Gemini AI Docs](https://ai.google.dev/docs)
- [MongoDB Docs](https://docs.mongodb.com/drivers/node/)

---

Built with 💚 for AI Hackfest 2025 | [License](LICENSE)
