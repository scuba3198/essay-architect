
import React from 'react';
import { Type } from 'lucide-react';
import TourTooltip from './TourTooltip';

const PreviewSection = ({ essay, totalWordCount, setShowExaminer, copyToClipboard, tourProps }) => {

    const generateFullEssay = () => {
        const { intro, body1, body2, conclusion } = essay;
        const text = `${intro.paraphrase} ${intro.thesis}\n\n${body1.topicSentence} ${body1.explanation} ${body1.example} ${body1.concluding}\n\n${body2.topicSentence} ${body2.explanation} ${body2.example} ${body2.concluding}\n\n${conclusion.summary} ${conclusion.finalThought}`;
        return text.replace(/\s+/g, ' ').trim() === '' ? '' : text;
    };

    return (
        <div className="bg-[#f4f1ea] border-l-2 border-stone-900 h-full flex flex-col overflow-hidden relative">
            <div className="p-6 flex justify-between items-center z-10 border-b-2 border-stone-900 bg-white">
                <h3 className="font-black text-stone-900 uppercase tracking-widest flex items-center gap-2 text-sm">
                    Live Preview
                </h3>
                <span className={`text-[10px] font-bold px-2 py-1 uppercase border border-stone-900 ${totalWordCount > 300 ? 'bg-red-600 text-white' :
                    totalWordCount >= 200 ? 'bg-green-600 text-white' :
                        'bg-white text-stone-400'
                    }`}>
                    {totalWordCount} words
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 z-10 custom-scrollbar bg-[#f4f1ea]">
                <div className="bg-[#f4f1ea] min-h-full relative max-w-2xl mx-auto">
                    <div className="font-serif leading-loose text-stone-900 text-lg whitespace-pre-wrap selection:bg-yellow-300 selection:text-stone-900 column-count-1">
                        {generateFullEssay() ? (
                            <>
                                <span className="float-left text-7xl font-serif font-black leading-[0.8] pr-3 pt-2">
                                    {generateFullEssay().trim().charAt(0)}
                                </span>
                                {generateFullEssay().trim().slice(1)}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-stone-300 gap-4 select-none border-2 border-dashed border-stone-300 p-8">
                                <Type size={48} className="opacity-20" />
                                <span className="font-serif italic text-xl text-center">The page is blank.<br />The story begins with you.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-0 z-20 flex flex-col md:flex-row border-t-2 border-stone-900">
                <button
                    onClick={() => setShowExaminer(true)}
                    disabled={totalWordCount < 50}
                    className="w-full md:w-1/2 bg-stone-900 text-white py-5 md:py-6 font-black uppercase tracking-widest active:bg-yellow-400 active:text-stone-900 transition-colors text-sm border-b-2 md:border-b-0 md:border-r-2 border-stone-900 disabled:opacity-50 disabled:active:bg-stone-900 disabled:active:text-white min-h-[52px]"
                >
                    Get Feedback
                </button>
                <button
                    id="copyBtn"
                    onClick={copyToClipboard}
                    className="w-full md:w-1/2 bg-white text-stone-900 py-5 md:py-6 font-black uppercase tracking-widest active:bg-stone-900 active:text-white transition-colors text-sm min-h-[52px]"
                >
                    Copy
                </button>
            </div>
            {tourProps && (
                <TourTooltip
                    stepIndex={4}
                    text="Get AI feedback on your writing, or copy it to clipboard."
                    position="top"
                    {...tourProps}
                />
            )}
        </div>
    );
};

export default PreviewSection;
