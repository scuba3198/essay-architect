
import React, { useState, useEffect } from 'react';
import { X, GraduationCap } from 'lucide-react';
import { callGemini } from '../../lib/api';

const ExaminerModal = ({ isOpen, onClose, essayText }) => {
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [examType, setExamType] = useState(null); // 'ielts' or 'pte'

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setFeedback(null);
            setExamType(null);
            setError(null);
        }
    }, [isOpen]);

    const getFeedback = async (type) => {
        setLoading(true);
        setError(null);
        setFeedback(null);

        try {
            // Calculate word count locally to prevent AI hallucination
            const wordCount = essayText.trim().split(/\s+/).filter(word => word.length > 0).length;
            let prompt = "";

            if (type === 'ielts') {
                prompt = `Act as a strict IELTS Examiner. Analyze the following essay based on the official 4 marking criteria: Task Response (TR), Coherence & Cohesion (CC), Lexical Resource (LR), and Grammatical Range & Accuracy (GRA). 
                
                METADATA:
                - Exact Word Count: ${wordCount} words. (Use this for length-based penalties if under 250 words).

                Return strictly valid JSON with this structure: 
                { 
                    "overallScore": "number (0-9 in 0.5 steps)", 
                    "breakdown": { "TR": "number", "CC": "number", "LR": "number", "GRA": "number" }, 
                    "critique": "string (A concise paragraph analyzing the essay against these 4 criteria)", 
                    "strengths": "string (One specific thing done well)",
                    "weakness": "string (One specific area for improvement. If score is 9.0, return null)"
                }.
                
                Essay:
                ${essayText}`;
            } else {
                // PTE Prompt - Updated to 7 Official Traits
                prompt = `Act as a strict PTE Academic Examiner. Analyze the following essay based on the official 7 scoring traits for the 'Write Essay' task.
                
                METADATA:
                - Exact Word Count: ${wordCount} words. 
                - CRITICAL: Use this word count for the 'Form' score.
                
                SCORING RULES:
                1. Content (0-3): 3=Adequate, 0=Irrelevant.
                2. Form (0-2): 200-300 words = 2. 120-199 or 301-380 = 1. <120 or >380 = 0.
                3. Structure (0-2): Development and Coherence.
                4. Grammar (0-2): 2=Consistent/Correct, 1=Some errors but clear, 0=Fails communication.
                5. Linguistic (0-2): General Linguistic Range (Precision/Emphasis).
                6. Vocab (0-2): Vocabulary Range (Variety/Synonyms).
                7. Spelling (0-2): 2=No errors. 1=One error. 0=More than one error.

                Return strictly valid JSON with this structure:
                {
                    "overallScore": "number (10-90 integer)",
                    "breakdown": { 
                        "Content": "score (0-3)", 
                        "Form": "score (0-2)", 
                        "Structure": "score (0-2)", 
                        "Grammar": "score (0-2)", 
                        "Linguistic": "score (0-2)",
                        "Vocab": "score (0-2)", 
                        "Spelling": "score (0-2)" 
                    },
                    "critique": "string (A concise paragraph analyzing the essay based on PTE standards)",
                    "strengths": "string (One specific thing done well)",
                    "weakness": "string (One specific area for improvement. If score is 90, return null)"
                }

                Essay:
                ${essayText}`;
            }

            const resultText = await callGemini(prompt, "You are a helpful API that returns strictly valid JSON.");
            // Attempt to parse JSON (cleaning potential markdown fences)
            const cleanJson = resultText.replace(/```json|```/g, '').trim();
            const data = JSON.parse(cleanJson);
            setFeedback(data);
        } catch (err) {
            console.error(err);
            setError(err.message || "The examiner is currently unavailable. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectExam = (type) => {
        setExamType(type);
        getFeedback(type);
    };

    const getFullLabel = (key) => {
        const labels = {
            // IELTS
            TR: "Task Response",
            CC: "Coherence & Cohesion",
            LR: "Lexical Resource",
            GRA: "Grammar Range",
            // PTE
            Content: "Content Quality",
            Form: "Length/Form",
            Structure: "Structure & Coherence",
            Grammar: "Grammar",
            Linguistic: "General Linguistic Range",
            Vocab: "Vocabulary Range",
            Spelling: "Spelling"
        };
        return labels[key] || key;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-stone-900/90 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-[#f4f1ea] border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative custom-scrollbar">
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-900"><X size={24} /></button>

                <div className="bg-stone-900 p-6 text-white mb-6">
                    <h2 className="font-serif font-black text-3xl flex items-center gap-3">
                        <GraduationCap size={32} className="text-yellow-400" />
                        Examiner's Report
                    </h2>
                </div>

                <div className="p-8 pt-0 space-y-6">
                    {!examType ? (
                        <div className="text-center py-8">
                            <h3 className="font-serif font-bold text-2xl text-stone-900 mb-2">Select Evaluation Standard</h3>
                            <p className="text-stone-500 mb-8 text-sm">Choose the exam criteria you wish to be scored against.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleSelectExam('ielts')}
                                    className="group relative p-6 border-2 border-stone-200 hover:border-stone-900 hover:bg-white bg-stone-50 transition-all text-left"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <span className="text-xs font-black uppercase tracking-widest text-stone-400 group-hover:text-red-600 mb-2 block">Band 0-9</span>
                                    <span className="text-3xl font-black font-serif text-stone-900 block mb-1">IELTS</span>
                                    <span className="text-xs text-stone-500">Academic & General Training</span>
                                </button>

                                <button
                                    onClick={() => handleSelectExam('pte')}
                                    className="group relative p-6 border-2 border-stone-200 hover:border-stone-900 hover:bg-white bg-stone-50 transition-all text-left"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <span className="text-xs font-black uppercase tracking-widest text-stone-400 group-hover:text-blue-600 mb-2 block">Score 10-90</span>
                                    <span className="text-3xl font-black font-serif text-stone-900 block mb-1">PTE</span>
                                    <span className="text-xs text-stone-500">Pearson Test of English</span>
                                </button>
                            </div>
                        </div>
                    ) : loading ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto"></div>
                            <p className="font-serif text-xl text-stone-600 animate-pulse">
                                {examType === 'ielts' ? "Checking Task Response & Cohesion..." : "Analyzing Content, Form & Grammar..."}
                            </p>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-100 border border-red-500 text-red-700 text-center">
                            {error}
                            <button onClick={() => setExamType(null)} className="block mx-auto mt-2 text-xs font-bold underline">Try Again</button>
                        </div>
                    ) : feedback ? (
                        <>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-stone-200 pb-6 gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 ${examType === 'ielts' ? 'bg-red-600' : 'bg-blue-600'}`}>
                                            {examType === 'ielts' ? 'IELTS' : 'PTE'}
                                        </span>
                                        <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Overall Score</p>
                                    </div>
                                    <div className="text-6xl font-black font-serif text-stone-900">{feedback.overallScore}</div>
                                </div>

                                {/* Dynamic Score Breakdown Grid */}
                                <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto bg-stone-50 p-4 border border-stone-200 justify-center md:justify-end">
                                    {feedback.breakdown && Object.entries(feedback.breakdown).map(([key, score]) => (
                                        <div key={key} className="text-center group relative cursor-help min-w-[60px]">
                                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 truncate max-w-[80px] mx-auto" title={key}>{key}</div>
                                            <div className="font-serif font-bold text-xl text-stone-900">{score}</div>
                                            <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] p-2 rounded w-32 mb-2 z-50 pointer-events-none">
                                                {getFullLabel(key)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Examiner's Critique</p>
                                    <p className="text-stone-700 leading-relaxed whitespace-pre-line border-l-2 border-stone-900 pl-4">{feedback.critique}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Key Strength</p>
                                        <p className="text-sm font-medium text-stone-600 bg-green-50 p-3 border border-green-200">{feedback.strengths}</p>
                                    </div>
                                    {feedback.weakness && (
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Key Weakness</p>
                                            <p className="text-sm font-medium text-stone-600 bg-red-50 p-3 border border-red-200">{feedback.weakness}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 text-sm text-stone-600 italic mt-4">
                                Disclaimer: This is an AI estimation based on public {examType.toUpperCase()} descriptors. Official results may vary.
                            </div>

                            <button onClick={() => setExamType(null)} className="text-center w-full text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 mt-2">
                                Start New Evaluation
                            </button>
                        </>
                    ) : null}

                    <button onClick={onClose} className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors">
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExaminerModal;
