/**
 * MIT LICENSE - Essay Architect (Standard Edition)
 * Copyright (c) 2025 Mumukshwa D.C.
 * Permission is hereby granted under the terms of the MIT License.
 */

import { Menu, X, Clock } from 'lucide-react';

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
                {/* Hamburger menu button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-stone-900 active:bg-stone-200 p-2 rounded transition-colors"
                    aria-label="Open menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Current view title */}
                <h1 className="text-lg font-serif font-black tracking-tighter text-stone-900">
                    {tabTitle}
                </h1>

                {/* Spacer for balance */}
                <div className="w-8"></div>
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
                            {/* Timer display at top */}
                            <div className="flex items-center justify-center gap-3 bg-[#f4f1ea] border-2 border-stone-900 p-4">
                                <Clock size={20} className={isTimerRunning ? 'text-red-500 animate-pulse' : 'text-stone-900'} />
                                <span className="font-mono font-black text-2xl">{formatTime(timer)}</span>
                            </div>

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
                            <div className="bg-[#f4f1ea] border-2 border-stone-900 p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-xs uppercase tracking-wider text-stone-500">Timer Controls</span>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                                        className="flex-1 py-3 border-2 border-stone-900 bg-white active:bg-stone-900 active:text-white transition-colors font-bold uppercase text-sm"
                                    >
                                        {isTimerRunning ? 'Pause' : 'Start'}
                                    </button>
                                    <button
                                        onClick={() => { setIsTimerRunning(false); setTimer(0); }}
                                        className="flex-1 py-3 border-2 border-stone-900 bg-white text-stone-900 active:bg-red-500 active:text-white active:border-red-500 transition-colors font-bold uppercase text-sm"
                                    >
                                        Reset
                                    </button>
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
