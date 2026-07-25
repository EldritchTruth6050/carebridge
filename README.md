# CareBridge — Discharge Companion

A React demo app that helps recently discharged patients ask questions about their discharge instructions. Answers are grounded in the patient's discharge document using TF-IDF semantic search and Claude.

## Project structure

```
src/
├── components/
│   ├── icons/BrandIcon.jsx   # SVG icons
│   ├── TopBar.jsx            # App header + patient chip
│   ├── LoginScreen.jsx       # Patient ID / access code login
│   ├── MainLayout.jsx        # Three-column shell
│   ├── Sidebar.jsx           # Conversation history
│   ├── ChatPanel.jsx         # Chat area + composer
│   ├── ChatMessages.jsx      # Welcome, user/assistant bubbles
│   ├── Composer.jsx          # Question input
│   └── DocumentPanel.jsx     # Discharge document viewer
├── data/
│   ├── patient.js            # Demo credentials + suggestions
│   └── docSections.js        # Discharge document sections
├── hooks/
│   └── useConversations.js   # localStorage persistence
├── services/
│   ├── semanticSearch.js     # TF-IDF retrieval
│   └── aiAnswer.js           # Anthropic API client
├── App.jsx                   # Root state + orchestration
├── main.jsx                  # React entry point
└── index.css                 # Global styles
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your Anthropic API key:

   ```bash
   cp .env.example .env
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Sign in with demo credentials:
   - **Patient ID:** `DEMO-1024`
   - **Access Code:** `482913`

## API proxy

The Vite dev server proxies `/api/anthropic/*` to the Anthropic API and injects your API key server-side. For production, you'll need a backend proxy — do not expose API keys in client-side code.

## Build

```bash
npm run build
npm run preview
```
