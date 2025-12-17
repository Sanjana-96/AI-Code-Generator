# AI-Code-Generator

AI-Code-Generator is a modern React web app that transforms natural language prompts into executable code snippets using Google's Gemini AI API. Built for developers, it features an intuitive UI with Monaco Editor for code preview, framework/language selection via React Select, and one-click copy/export options.​​

🚀 Features
AI-Powered Code Generation: Enter prompts like "Write a Python fizzbuzz function" – get instant, syntax-highlighted code via Gemini 1.5 Flash.

Rich Editor: Full Monaco Editor (VS Code's engine) for editing/previewing generated code.

Framework Support: Select from JavaScript, Python, Java, C++, and more via dropdown.

Responsive UI: Tailwind CSS, React Icons, loading states, and error handling for smooth UX.

Deployed Live: Hosted on Vercel with SPA routing for seamless navigation.​


🛠 Tech Stack
Frontend	Tools & Libraries	Deployment
React 18 + Vite	@google/generative-ai, Monaco Editor, React Select, React Router, Tailwind CSS	Vercel (with vercel.json rewrites)



📦 Setup & Run Locally

git clone https://github.com/Sanjana-96/AI-Code-Generator.git
cd AI-Code-Generator
npm install
# Add your Gemini API key to .env: VITE_GEMINI_API_KEY=your_key_here
npm run dev

Open http://localhost:5173. Get a free key at ai.google.dev.


Challenges Faced
Deployment on Vercel involved repeated build failures, including "vite: command not found" (exit code 127), ENOENT errors for package.json due to incorrect Root Directory settings, and 404s on page refresh fixed by adding vercel.json rewrites. API integration hit Gemini quota limits (429 RESOURCE_EXHAUSTED after 20 daily requests on free tier) and transient 503 overload errors, resolved via retries and quota monitoring. Git merge conflicts from API key updates in .env and Home.jsx required manual resolution of markers like <<<<<<< HEAD.

Future Enhancements
Backend proxy (Node/Express) for API key hiding.

Multi-model support, user auth, code execution sandbox, and project saving.[user-information]
