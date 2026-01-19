# Lenda Technologies Website

A modern, high-performance Single Page Application (SPA) for Lenda Technologies, built with React, TypeScript, Tailwind CSS, and Firebase.

## Project Structure

*   **Frontend:** React 18 (via ESM), Tailwind CSS (via CDN)
*   **Backend:** Firebase Realtime Database & Firestore (via Google CDN)
*   **AI:** Google Gemini API (@google/genai)
*   **Icons:** Lucide React
*   **Routing:** Custom State-based Router (SPA)

## Deployment Configuration (Netlify)

To deploy this application on Netlify:

1.  **Build Command:** `npm run build` (or leave empty if just serving static files from this structure, but usually `vite build` is best).
2.  **Publish Directory:** `dist`
3.  **Environment Variables:**
    You must set the following environment variable in your Netlify Site Settings > Build & Deploy > Environment:
    
    *   **Key:** `API_KEY`
    *   **Value:** `[Your Google Gemini API Key]`

### `netlify.toml` Content

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Setup Instructions

1.  **Firebase:** Ensure your Firebase Console has Realtime Database and Firestore enabled.
2.  **Gemini API:** Get an API key from Google AI Studio.
3.  **Local Development:** 
    Create a `.env` file in the root:
    ```
    API_KEY=your_actual_api_key_here
    ```
    Run `npm run dev`.

## Admin Access

*   **URL:** Click "Admin" in the footer.
*   **Default Password:** `123` (Changeable in Settings).
