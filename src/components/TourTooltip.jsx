
import React from 'react';

const TourTooltip = ({ stepIndex, currentStep, onNext, onSkip, text, position = "bottom" }) => {
    if (currentStep !== stepIndex) return null;

    const positionClasses = {
        bottom: "top-full left-1/2 -translate-x-1/2 mt-6",
        top: "bottom-full left-1/2 -translate-x-1/2 mb-6",
        left: "right-full top-1/2 -translate-y-1/2 mr-6",
        right: "left-full top-1/2 -translate-y-1/2 ml-6",
        bottomLeft: "top-full right-0 mt-6",
        bottomRight: "top-full left-0 mt-6",
    };

    return (
        <div className={`absolute z-50 w-72 bg-yellow-400 border-2 border-stone-900 text-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] p-0 ${positionClasses[position] || positionClasses.bottom} animate-in fade-in zoom-in duration-300`}>
            <div className={`absolute bg-stone-900
            ${position === 'bottom' ? '-top-6 left-1/2 w-0.5 h-6' : ''}
            ${position === 'top' ? '-bottom-6 left-1/2 w-0.5 h-6' : ''}
            ${position === 'left' ? '-right-6 top-1/2 h-0.5 w-6' : ''}
            ${position === 'right' ? '-left-6 top-1/2 h-0.5 w-6' : ''}
            ${position === 'bottomLeft' ? '-top-6 right-6 w-0.5 h-6' : ''}
            ${position === 'bottomRight' ? '-top-6 left-6 w-0.5 h-6' : ''}
        `} />

            <div className="relative z-10 p-5">
                <div className="flex gap-3 mb-3 items-start">
                    <div className="bg-stone-900 text-white w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold border border-stone-900">
                        {stepIndex + 1}
                    </div>
                    <p className="text-sm font-bold font-serif leading-tight">{text}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-stone-900/20 mt-1">
                    <button onClick={onSkip} className="text-stone-700 hover:text-stone-900 text-xs font-bold uppercase tracking-wider underline decoration-1 underline-offset-2">End Tour</button>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-stone-600 font-mono">{stepIndex + 1}/6</span>
                        <button
                            onClick={onNext}
                            className="bg-stone-900 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-stone-900 transition-colors border border-stone-900"
                        >
                            {stepIndex === 5 ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourTooltip;
