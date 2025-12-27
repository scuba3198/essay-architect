/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: 0 },
                    'to': { opacity: 1 },
                },
                slideInFromBottom: {
                    'from': { transform: 'translateY(10px)', opacity: 0 },
                    'to': { transform: 'translateY(0)', opacity: 1 },
                },
                slideInFromRight: {
                    'from': { transform: 'translateX(20px)', opacity: 0 },
                    'to': { transform: 'translateX(0)', opacity: 1 },
                },
                zoomIn: {
                    'from': { transform: 'scale(0.95)', opacity: 0 },
                    'to': { transform: 'scale(1)', opacity: 1 },
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.4s both',
                'slide-in-from-bottom-2': 'slideInFromBottom 0.4s both',
                'slide-in-from-right-8': 'slideInFromRight 0.4s both',
                'zoom-in': 'zoomIn 0.4s both',
            }
        },
    },
    plugins: [],
}
