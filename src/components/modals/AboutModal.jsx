
import { X, Type, Wand2, Sparkles, GraduationCap, Settings } from 'lucide-react';

const AboutModal = ({ onClose }) => (
    <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/90 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300 cursor-pointer"
    >
        <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#f4f1ea] border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-w-lg w-full overflow-hidden relative transform transition-all scale-100 cursor-default"
        >

            {/* Wizard Header */}
            <div className="bg-stone-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Type size={120} />
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <div className="relative z-10">
                    <span className="inline-block px-2 py-1 bg-yellow-400 text-stone-900 text-[10px] font-black uppercase tracking-widest mb-2">The Manual</span>
                    <h2 className="text-4xl font-serif font-black tracking-tight leading-none mb-1">Essay<br />Architect</h2>
                    <p className="text-stone-400 text-sm font-mono mt-2 border-t border-stone-700 pt-2 inline-block">Est. 2025 • IELTS & PTE Edition</p>
                </div>
            </div>

            <div className="p-8 space-y-6">
                <div className="font-serif text-xl leading-relaxed text-stone-800 border-l-4 border-yellow-400 pl-4 italic">
                    &ldquo;Structure is not just a framework; it is the skeleton upon which your ideas must hang.&rdquo;
                </div>

                <p className="text-stone-600 font-sans leading-relaxed text-sm">
                    This tool combines rigid structure with modern AI to help you achieve Band 9/90.
                </p>

                <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 border border-stone-200 bg-white">
                        <div className="bg-stone-900 text-white p-2 shrink-0"><Wand2 size={16} /></div>
                        <div>
                            <p className="font-bold text-stone-900 uppercase text-[10px] tracking-wider">AI Autocomplete</p>
                            <p className="text-[10px] text-stone-500 font-serif">Stuck? Click &apos;Complete&apos; to generate the perfect next sentence.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-stone-200 bg-white">
                        <div className="bg-stone-900 text-white p-2 shrink-0"><Sparkles size={16} /></div>
                        <div>
                            <p className="font-bold text-stone-900 uppercase text-[10px] tracking-wider">AI Refiner</p>
                            <p className="text-[10px] text-stone-500 font-serif">Rewrite sentences for better academic flow and vocabulary.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-stone-200 bg-white">
                        <div className="bg-stone-900 text-white p-2 shrink-0"><GraduationCap size={16} /></div>
                        <div>
                            <p className="font-bold text-stone-900 uppercase text-[10px] tracking-wider">AI Examiner</p>
                            <p className="text-[10px] text-stone-500 font-serif">Get instant scores for IELTS (Band 0-9) or PTE (10-90).</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-stone-200 bg-white">
                        <div className="bg-stone-900 text-white p-2 shrink-0"><Settings size={16} /></div>
                        <div>
                            <p className="font-bold text-stone-900 uppercase text-[10px] tracking-wider">BYO Key</p>
                            <p className="text-[10px] text-stone-500 font-serif">Securely use your own Gemini API key via Settings.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-stone-900 transition-colors border-2 border-transparent hover:border-stone-900"
                >
                    Start The Edition
                </button>
            </div>
        </div>
    </div>
);

export default AboutModal;
