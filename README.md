# Seeker AI

Seeker AI is a Next.js app with Supabase authentication and a Gemini-powered research chat on the signed-in dashboard.

## Configure Gemini

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey) and add it to your local `.env` file:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

Keep this key server-side; do not prefix it with `NEXT_PUBLIC_`. The chat API route uses `gemini-flash-latest` and requires the user to be signed in.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Set the Supabase environment variables from `.env.example` as well. Open [http://localhost:3000](http://localhost:3000), sign in, and open the dashboard to chat with Gemini.
