# Essay Architect 🏛️

**Essay Architect** is a modern, AI-powered writing assistant designed to help students master the rigid structure required for high-scoring IELTS (Band 9) and PTE (90) essays.

![Version](https://img.shields.io/badge/version-2.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Live Demo
**[https://essay-architect.uk/](https://essay-architect.uk/)**

## ✨ Features

-   **Structured Writing Wizard**: Breaks down the essay into manageable chunks (Intro, Body 1, Body 2, Conclusion) to enforce perfect structure.
-   **AI Refiner**: Uses Google Gemini to rewrite sentences instantly for better academic flow and vocabulary.
-   **AI Examiner**: Provides instant, strict grading and feedback based on official IELTS/PTE criteria.
-   **Autocomplete**: Stuck? The AI can suggest the next logical sentence based on your specific essay context.
-   **Live Preview & Analytics**: Real-time markdown rendering and word counting.
-   **"Bring Your Own Key" (BYOK)**: Privacy-first design. Your API Key is stored locally in your browser, never on our servers.

## 🛠️ Tech Stack

This project was upgraded from a standalone prototype to a professional Single Page Application (SPA).

-   **Framework**: [React v18](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Gemini API](https://ai.google.dev/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: GitHub Actions & GitHub Pages

## 🏃‍♂️ Running Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/scuba3198/essay-architect.git
    cd essay-architect
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🌍 Deployment

This project relies on **GitHub Actions** for continuous deployment.
Any push to the `main` branch automatically builds the React application and deploys it to GitHub Pages.

### Custom Domain Configuration
The site is configured to serve from `essay-architect.uk`.
-   **CNAME**: Located in `public/CNAME`.
-   **DNS**: Managed via Cloudflare (pointing to `scuba3198.github.io`).

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
