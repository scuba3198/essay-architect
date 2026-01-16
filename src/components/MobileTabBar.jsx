/**
 * MIT LICENSE - Essay Architect (Standard Edition)
 * Copyright (c) 2025 Mumukshwa D.C.
 * Permission is hereby granted under the terms of the MIT License.
 */

import { PenTool, FileText } from 'lucide-react';

const MobileTabBar = ({ currentView, setCurrentView, isKeyboardOpen }) => {
    if (isKeyboardOpen) return null; // Hide when keyboard is open

    return (
        <div className="mobile-tab-bar fixed bottom-0 left-0 right-0 bg-white border-t-2 border-stone-900 z-40 md:hidden">
            <div className="flex">
                <button
                    onClick={() => setCurrentView('write')}
                    className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${currentView === 'write' ? 'bg-stone-900 text-white' : 'bg-white text-stone-900 active:bg-stone-100'}`}
                >
                    <PenTool size={20} strokeWidth={2.5} />
                    <span className="text-xs font-black uppercase tracking-wider">Write</span>
                </button>
                <button
                    onClick={() => setCurrentView('preview')}
                    className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${currentView === 'preview' ? 'bg-stone-900 text-white' : 'bg-white text-stone-900 active:bg-stone-100'}`}
                >
                    <FileText size={20} strokeWidth={2.5} />
                    <span className="text-xs font-black uppercase tracking-wider">Preview</span>
                </button>
            </div>
        </div>
    );
};

export default MobileTabBar;
