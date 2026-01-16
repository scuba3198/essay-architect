/**
 * MIT LICENSE - Essay Architect (Standard Edition)
 * Copyright (c) 2025 Mumukshwa D.C.
 * Permission is hereby granted under the terms of the MIT License.
 */

import { X, Clock } from 'lucide-react';

const MobileHeader = ({
    activeTab,
    setActiveTab,
    timer,
    isTimerRunning,
    setIsTimerRunning,
    setTimer,
    isMenuOpen,
    setIsMenuOpen
}) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const tabTitle = activeTab === 'learn' ? 'The Guide' : 'The Wizard';

    return (
        <>
            <header className="bg-[#f4f1ea] border-b-2 border-stone-900 px-4 py-3 flex justify-between items-center z-50 md:hidden">
                {/* Logo - toggles menu */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-stone-900 text-white w-10 h-10 flex items-center justify-center font-serif font-black text-xl active:bg-stone-700 transition-colors"
                >
                    {isMenuOpen ? <X size={20} /> : 'E'}
                </button>

                {/* Current view title */}
                <h1 className="text-lg font-serif font-black tracking-tighter text-stone-900">
                    {tabTitle}
                </h1>

                {/* Timer - simplified */}
                <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="flex items-center gap-2 text-stone-900 active:bg-stone-200 px-2 py-1 rounded transition-colors"
                >
                    <Clock size={16} strokeWidth={3} className={isTimerRunning ? 'text-red-500 animate-pulse' : 'text-stone-400'} />
                    <span className="font-mono font-bold text-sm">{formatTime(timer)}</span>
                </button>
            </header>

            {/* Expandable menu overlay */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute top-[60px] left-0 right-0 bg-white border-b-2 border-stone-900 z-50 md:hidden animate-in slide-in-from-top-2 duration-200">
                        <div className="p-4 space-y-4">
                            {/* Tab navigation */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setActiveTab('learn'); setIsMenuOpen(false); }}
                                    className={`flex-1 py-3 font-bold uppercase tracking-wider border-2 transition-all ${activeTab === 'learn' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-900 border-stone-300'}`}
                                >
                                    The Guide
                                </button>
                                <button
                                    onClick={() => { setActiveTab('practice'); setIsMenuOpen(false); }}
                                    className={`flex-1 py-3 font-bold uppercase tracking-wider border-2 transition-all ${activeTab === 'practice' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-900 border-stone-300'}`}
                                >
                                    The Wizard
                                </button>
                            </div>

                            {/* Full timer controls */}
                            <div className="flex items-center justify-between bg-[#f4f1ea] border-2 border-stone-900 p-3">
                                <span className="font-bold text-sm uppercase tracking-wider">Timer</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono font-black text-xl">{formatTime(timer)}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                                            className="w-10 h-10 flex items-center justify-center border border-stone-900 bg-white active:bg-stone-900 active:text-white transition-colors"
                                        >
                                            {isTimerRunning ? (
                                                <div className="flex gap-[2px]">
                                                    <div className="w-0.5 h-2 bg-current" />
                                                    <div className="w-0.5 h-2 bg-current" />
                                                </div>
                                            ) : (
                                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-current border-b-[4px] border-b-transparent ml-0.5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => { setIsTimerRunning(false); setTimer(0); }}
                                            className="w-10 h-10 flex items-center justify-center border border-stone-900 bg-white text-stone-400 active:bg-red-500 active:text-white active:border-red-500 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pro CTA */}
                            <a
                                href="https://pro.essay-architect.uk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-stone-900 text-white px-6 py-4 font-serif font-black uppercase italic tracking-tighter text-center active:bg-yellow-400 active:text-stone-900 transition-colors"
                            >
                                Go Pro Edition
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default MobileHeader;
