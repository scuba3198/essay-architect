
// --- API Helper ---
export const callGemini = async (prompt, systemInstruction = "") => {
    // Retrieve key from LocalStorage for local usage
    const apiKey = localStorage.getItem("gemini_api_key") || "";

    if (!apiKey) {
        alert("API Key missing! Please click the Settings (Gear) icon in the top right and enter your Google Gemini API Key to use AI features.");
        throw new Error("API Key is required.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 400 || response.status === 403) {
                throw new Error("Invalid API Key. Please check your settings.");
            }
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error("Gemini API Call Failed:", error);
        throw error;
    }
};
