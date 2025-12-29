/**
 * MIT LICENSE - Essay Architect (Standard Edition)
 * Copyright (c) 2025 Mumukshwa D.C.
 * Permission is hereby granted under the terms of the MIT License.
 */

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import TourTooltip from './TourTooltip';

const VocabularyPill = ({ words, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {words.map((word, idx) => (
                <button
                    key={idx}
                    onClick={(e) => {
                        e.preventDefault();
                        if (onSelect) onSelect(word);
                    }}
                    className="group relative inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide bg-white border border-stone-900 text-stone-900 px-4 py-2 hover:bg-stone-900 hover:text-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                    title="Click to insert into text box"
                >
                    <span className="group-hover:pl-2 transition-all">{word}</span>
                </button>
            ))}
        </div>
    );
};

const StepWizard = ({ currentStep, setCurrentStep, essay, handleInputChange, tourProps }) => {
    const steps = [
        { id: 'intro', title: 'The Introduction', subtitle: 'Set the Stage', icon: "I" },
        { id: 'body1', title: 'The First Argument', subtitle: 'Point, Explain, Evidence', icon: "II" },
        { id: 'body2', title: 'The Second Argument', subtitle: 'Reinforce your Stance', icon: "III" },
        { id: 'conclusion', title: 'The Conclusion', subtitle: 'The Final Verdict', icon: "IV" },
    ];

    const currentStepData = steps[currentStep];
    const textareaRefs = useRef({});

    const handleVocabularyInsert = (section, field, text) => {
        const textarea = textareaRefs.current[`${section}-${field}`];
        const currentVal = essay[section][field] || '';

        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const newVal = currentVal.substring(0, start) + text + currentVal.substring(end);
            handleInputChange(section, field, newVal);

            // Re-focus and set cursor after replacement
            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + text.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        } else {
            // Fallback to append if ref is somehow missing
            const spacer = currentVal.length > 0 && !currentVal.match(/\s$/) ? ' ' : '';
            const newVal = currentVal + spacer + text;
            handleInputChange(section, field, newVal);
        }
    };

    const ProBadge = () => (
        <a
            href="https://pro.essay-architect.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors bg-stone-100 px-2 py-1 border border-stone-200"
            title="Unlock AI Autocomplete & Refinement in Pro Version"
        >
            <Zap size={10} className="text-yellow-500" /> AI Powered Pro
        </a>
    );

    return (
        <div className="bg-white border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(231,229,228,1)] flex flex-col h-full relative">
            <div className="border-b-2 border-stone-900 p-6 relative bg-[#f4f1ea]">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-stone-500 mb-1 block">Chapter {currentStep + 1}</span>
                        <h2 className="text-3xl font-serif font-black text-stone-900 leading-none">
                            {currentStepData.title}
                        </h2>
                    </div>

                    <div className="flex gap-0 relative">
                        <button
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                            className="w-12 h-12 border-2 border-stone-900 border-r-0 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-stone-900 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                            disabled={currentStep === 3}
                            className="w-12 h-12 border-2 border-stone-900 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-stone-900 transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center w-full h-1 bg-stone-300">
                    {steps.map((step, idx) => (
                        <div key={step.id} className={`h-full flex-1 transition-all duration-300 ${idx <= currentStep ? 'bg-stone-900' : 'bg-transparent'}`}></div>
                    ))}
                </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-white">
                {currentStep === 0 && (
                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                        <div className="bg-stone-50 p-6 border-l-4 border-stone-900">
                            <div className="flex gap-3">
                                <div className="font-serif font-bold text-4xl text-stone-200 leading-none">"</div>
                                <div className="text-sm font-serif text-stone-800 italic leading-relaxed">
                                    Your goal is simple: Introduce the topic and state your position clearly. Never copy the question directly!
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2 mb-4">
                                <label className="flex flex-col text-lg font-bold font-serif text-stone-900">
                                    <span>1. Paraphrase the Question</span>
                                    <span className="text-[10px] font-sans font-normal text-stone-500 uppercase tracking-widest mt-1">Required • Write 1 Sentence</span>
                                </label>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current['intro-paraphrase'] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[120px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="Start writing here..."
                                value={essay.intro.paraphrase}
                                onChange={(e) => handleInputChange('intro', 'paraphrase', e.target.value)}
                            />
                            <VocabularyPill
                                words={['It is widely believed that', 'There is a common perception that', 'Many people argue that']}
                                onSelect={(word) => handleVocabularyInsert('intro', 'paraphrase', word)}
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2 mb-4">
                                <label className="flex flex-col text-lg font-bold font-serif text-stone-900">
                                    <span>2. Thesis Statement</span>
                                    <span className="text-[10px] font-sans font-normal text-stone-500 uppercase tracking-widest mt-1">Required • Write 1 Sentence</span>
                                </label>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current['intro-thesis'] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[120px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="I completely agree with this view because..."
                                value={essay.intro.thesis}
                                onChange={(e) => handleInputChange('intro', 'thesis', e.target.value)}
                            />
                            <VocabularyPill
                                words={['This essay will discuss', 'I firmly believe that', 'In my opinion']}
                                onSelect={(word) => handleVocabularyInsert('intro', 'thesis', word)}
                            />
                        </div>
                    </div>
                )}

                {(currentStep === 1 || currentStep === 2) && (
                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                        <div className="bg-stone-50 p-6 border-l-4 border-stone-900">
                            <div className="flex gap-3">
                                <div className="font-serif font-bold text-4xl text-stone-200 leading-none">"</div>
                                <div className="text-sm font-serif text-stone-800 italic leading-relaxed">
                                    Focus on ONE main idea. Support it with an explanation and a concrete example.
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2">
                                <div>
                                    <label className="block text-lg font-bold font-serif text-stone-900">1. Topic Sentence</label>
                                    <p className="text-xs font-mono text-stone-500 uppercase">Write 1 Sentence • The Main Idea</p>
                                </div>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current[`body${currentStep}-topicSentence`] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[80px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="Firstly, the main reason for this is..."
                                value={essay[`body${currentStep}`].topicSentence}
                                onChange={(e) => handleInputChange(`body${currentStep}`, 'topicSentence', e.target.value)}
                            />
                            <VocabularyPill
                                words={currentStep === 1 ? ['Firstly,', 'To begin with,', 'The primary reason is'] : ['Secondly,', 'Furthermore,', 'In addition,']}
                                onSelect={(word) => handleVocabularyInsert(`body${currentStep}`, 'topicSentence', word)}
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2">
                                <div>
                                    <label className="block text-lg font-bold font-serif text-stone-900">2. Explanation</label>
                                    <p className="text-xs font-mono text-stone-500 uppercase">Write 1 Sentence • Expand on the point</p>
                                </div>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current[`body${currentStep}-explanation`] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[100px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="This is because..."
                                value={essay[`body${currentStep}`].explanation}
                                onChange={(e) => handleInputChange(`body${currentStep}`, 'explanation', e.target.value)}
                            />
                            <VocabularyPill
                                words={['This means that', 'In other words,', 'This is due to the fact that']}
                                onSelect={(word) => handleVocabularyInsert(`body${currentStep}`, 'explanation', word)}
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2">
                                <div>
                                    <label className="block text-lg font-bold font-serif text-stone-900">3. Example</label>
                                    <p className="text-xs font-mono text-stone-500 uppercase">Write 1 Sentence • Prove it</p>
                                </div>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current[`body${currentStep}-example`] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[80px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="For instance..."
                                value={essay[`body${currentStep}`].example}
                                onChange={(e) => handleInputChange(`body${currentStep}`, 'example', e.target.value)}
                            />
                            <VocabularyPill
                                words={['For example,', 'For instance,', 'Take x as an example']}
                                onSelect={(word) => handleVocabularyInsert(`body${currentStep}`, 'example', word)}
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2">
                                <div>
                                    <label className="block text-lg font-bold font-serif text-stone-900">4. Link (Optional)</label>
                                    <p className="text-xs font-mono text-stone-500 uppercase">Write 1 Sentence • Tie it back</p>
                                </div>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current[`body${currentStep}-concluding`] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[80px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="Therefore..."
                                value={essay[`body${currentStep}`].concluding}
                                onChange={(e) => handleInputChange(`body${currentStep}`, 'concluding', e.target.value)}
                            />
                            <VocabularyPill
                                words={['Therefore,', 'Thus,', 'As a result,']}
                                onSelect={(word) => handleVocabularyInsert(`body${currentStep}`, 'concluding', word)}
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                        <div className="bg-stone-50 p-6 border-l-4 border-stone-900">
                            <div className="flex gap-3">
                                <div className="font-serif font-bold text-4xl text-stone-200 leading-none">"</div>
                                <div className="text-sm font-serif text-stone-800 italic leading-relaxed">
                                    Summarize main points. <span className="bg-stone-900 text-white px-1">DO NOT</span> introduce new arguments here.
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2">
                                <div>
                                    <label className="block text-lg font-bold font-serif text-stone-900">1. Summary</label>
                                    <p className="text-xs font-mono text-stone-500 uppercase">Write 1 Sentence • The Recap</p>
                                </div>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current['conclusion-summary'] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[120px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="In conclusion..."
                                value={essay.conclusion.summary}
                                onChange={(e) => handleInputChange('conclusion', 'summary', e.target.value)}
                            />
                            <VocabularyPill
                                words={['In conclusion,', 'To sum up,', 'All things considered,']}
                                onSelect={(word) => handleVocabularyInsert('conclusion', 'summary', word)}
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2">
                                <div>
                                    <label className="block text-lg font-bold font-serif text-stone-900">2. Final Thought</label>
                                    <p className="text-xs font-mono text-stone-500 uppercase">Write 1 Sentence • Look to the future</p>
                                </div>
                                <ProBadge />
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current['conclusion-finalThought'] = el)}
                                className="w-full p-4 text-stone-900 text-lg leading-relaxed bg-[#f9f9f7] border-0 border-b-2 border-stone-300 focus:border-stone-900 focus:ring-0 focus:bg-yellow-50/30 transition-all min-h-[120px] resize-none placeholder:text-stone-300 placeholder:italic placeholder:font-serif"
                                placeholder="It is predicted that..."
                                value={essay.conclusion.finalThought}
                                onChange={(e) => handleInputChange('conclusion', 'finalThought', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StepWizard;
