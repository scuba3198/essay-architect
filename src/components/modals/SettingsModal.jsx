
import React, { useState } from 'react';
import { X } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
    const [key, setKey] = useState(localStorage.getItem('gemini_api_key') || '');

    const handleSave = () => {
        localStorage.setItem('gemini_api_key', key.trim());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-stone-900/90 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-[#f4f1ea] border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-w-md w-full p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-900"><X size={24} /></button>
                <h2 className="font-serif font-black text-2xl mb-4 text-stone-900">Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Gemini API Key</label>
                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 focus:border-stone-900 outline-none text-stone-900 bg-white"
                            placeholder="Paste your API key here..."
                        />
                        <p className="text-[10px] text-stone-500 mt-2 font-medium leading-relaxed">
                            Required for AI features. Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 font-bold">Google AI Studio</a>.
                            <br />Key is stored locally in your browser.
                        </p>
                    </div>
                    <button onClick={handleSave} className="w-full bg-stone-900 text-white py-3 font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-stone-900 transition-colors border-2 border-stone-900">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
