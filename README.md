# Essay Architect (Standard Edition) 🏛️

**Essay Architect** is a modern, structured writing assistant designed to help students master the rigid structure required for high-scoring IELTS (Band 9) and PTE (90) essays.

![Version](https://img.shields.io/badge/version-0.2-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Live Demo
**[https://essay-architect.uk/](https://essay-architect.uk/)**

## ✨ Features (Standard Edition)

-   **Structured Writing Wizard**: Breaks down the essay into manageable chunks (Intro, Body 1, Body 2, Conclusion) to enforce perfect structure.
-   **Vocabulary Assistant**: Context-aware academic phrase insertion (pills) to help you start sentences with professional transitions.
-   **Live Preview & Analytics**: Real-time rendering of your full essay and word counting.
-   **Interactive Tour**: Built-in guide to help you navigate the interface and understand the writing process.
-   **Built-in Prompts**: Shuffle through a library of common IELTS/PTE essay topics.

## 💎 Pro Edition Features
Looking for more power? The [Pro Edition](https://pro.essay-architect.uk/) includes:
-   **AI Refiner**: Instant sentence polishing powered by Google Gemini.
-   **AI Examiner**: Strict grading and feedback based on official criteria.
-   **AI Autocomplete**: Stuck? Smart suggestions to keep your writing flow.

## 🛠️ Tech Stack

-   **Framework**: [React v18](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: GitHub Actions & GitHub Pages (or Vercel)

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

This project is configured for deployment via **GitHub Actions**. Any push to the `main` branch automatically builds and deploys to GitHub Pages. It also includes a `vercel.json` for seamless Vercel deployment.

### Custom Domain Configuration (GitHub Pages)
The site is configured to serve from `essay-architect.uk`.
-   **CNAME**: Located in `public/CNAME`.
-   **DNS**: Pointing to `scuba3198.github.io`.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

