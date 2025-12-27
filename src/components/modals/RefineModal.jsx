
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Wand2 } from 'lucide-react';
import { callGemini } from '../../lib/api';

const RefineModal = ({ isOpen, onClose, originalText, onAccept }) => {
    const [suggestion, setSuggestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && originalText) {
            generateSuggestion();
        }
    }, [isOpen, originalText]);

    const generateSuggestion = async () => {
        setLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const prompt = `Rewrite the following sentence to be formal and concise, suitable for an IELTS/PTE essay, using 10th-grade reading level vocabulary (clear and accessible). Do not change the meaning. Return ONLY the rewritten sentence.\n\nOriginal: "${originalText}"`;
            const result = await callGemini(prompt);
            setSuggestion(result ? result.trim() : "Could not generate suggestion.");
        } catch (err) {
            setError(err.message || "Failed to connect to the editor AI.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-stone-900/80 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] max-w-lg w-full p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 hover:bg-stone-100 p-1 rounded-full"><X size={20} /></button>

                <div className="flex items-center gap-2 mb-4 border-b-2 border-stone-100 pb-2">
                    <Sparkles className="text-yellow-500" size={20} />
                    <h3 className="font-serif font-black text-xl">AI Refiner</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase text-stone-400 mb-1">Original</p>
                        <p className="text-stone-600 bg-stone-50 p-3 italic border-l-2 border-stone-300 text-sm">{originalText}</p>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold uppercase text-stone-400 mb-1">Suggestion</p>
                        {loading ? (
                            <div className="flex items-center gap-2 text-stone-400 text-sm p-3 bg-stone-50 animate-pulse">
                                <Wand2 size={14} className="animate-spin" /> Drafting improvement...
                            </div>
                        ) : error ? (
                            <p className="text-red-500 text-sm p-3 bg-red-50">{error}</p>
                        ) : (
                            <p className="text-stone-900 font-medium p-3 bg-yellow-50 border-l-2 border-yellow-400 text-lg font-serif">{suggestion}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 text-stone-500 font-bold uppercase text-xs hover:text-stone-900">Keep Original</button>
                    <button
                        onClick={() => { onAccept(suggestion); onClose(); }}
                        disabled={loading || !suggestion || error}
                        className="flex-1 bg-stone-900 text-white py-3 font-bold uppercase text-xs tracking-wider hover:bg-yellow-400 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Use Suggestion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RefineModal;
