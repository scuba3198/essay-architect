
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, PenTool, RefreshCw, Clock, RotateCcw, HelpCircle, Settings, Award } from 'lucide-react';
import SettingsModal from './components/modals/SettingsModal';
import ExaminerModal from './components/modals/ExaminerModal';
import AboutModal from './components/modals/AboutModal';
import StepWizard from './components/StepWizard';
import PreviewSection from './components/PreviewSection';
import TourTooltip from './components/TourTooltip';

const LearnCard = ({ title, desc, number }) => (
    <div className="group border-2 border-stone-900 bg-white hover:bg-stone-900 hover:text-white transition-all cursor-default relative overflow-hidden p-6 flex flex-col justify-between min-h-[220px]">
        <div className="absolute top-4 right-4 text-4xl font-black font-serif text-stone-100 group-hover:text-stone-800 transition-colors z-0">
            {number}
        </div>

        <div className="relative z-10">
            <h3 className="font-black text-2xl font-serif mb-4 uppercase tracking-tight">{title}</h3>
            <div className="w-12 h-1 bg-yellow-400 mb-4 group-hover:bg-white transition-colors"></div>
            <p className="text-sm font-medium leading-relaxed opacity-90">{desc}</p>
        </div>
    </div>
);

const App = () => {
    const [activeTab, setActiveTab] = useState('learn');
    const [currentStep, setCurrentStep] = useState(0);
    const [topic, setTopic] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showExaminer, setShowExaminer] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [tourStep, setTourStep] = useState(-1);
    const [hasSeenTour, setHasSeenTour] = useState(false);

    const promptRef = useRef(null);

    const [essay, setEssay] = useState({
        intro: { paraphrase: '', thesis: '' },
        body1: { topicSentence: '', explanation: '', example: '', concluding: '' },
        body2: { topicSentence: '', explanation: '', example: '', concluding: '' },
        conclusion: { summary: '', finalThought: '' }
    });

    const topics = [
        { id: 1, type: "Opinion", question: "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?" },
        { id: 2, type: "Discussion", question: "Computers are being used more and more in education. Some say this is positive, while others argue it leads to negative consequences. Discuss both sides." },
        { id: 3, type: "Problem / Solution", question: "In many countries, the gap between the rich and the poor is becoming wider. What are the causes of this problem and what measures can be taken?" },
        { id: 4, type: "Discussion", question: "Some people think that the government should invest more in public services like trains and libraries. Others believe that money should be spent on repairing roads and highways. Discuss both views and give your opinion." },
        { id: 5, type: "Advantage / Disadvantage", question: "In many countries, paying for goods and services using mobile phone apps is becoming increasingly common. Do the advantages of this trend outweigh the disadvantages?" },
        { id: 6, type: "Opinion", question: "The best way to solve the world's environmental problems is to increase the price of fuel. To what extent do you agree or disagree?" },
        { id: 7, type: "Direct Question", question: "Many museums and historical sites are mainly visited by tourists, but not local people. Why is this the case? What can be done to attract more local people?" },
        { id: 8, type: "Opinion", question: "In the future, nobody will buy printed newspapers or books because they will be able to read everything they want online without paying. To what extent do you agree or disagree?" },
        { id: 9, type: "Discussion", question: "Some people think that university students should study whatever they like. Others believe they should only be allowed to study subjects that will be useful in the future, such as science and technology. Discuss both views." },
        { id: 10, type: "Causes / Effects", question: "Nowadays many people choose to be self-employed, rather than to work for a company or organisation. Why is this the case? What could be the disadvantages of being self-employed?" }
    ];

    useEffect(() => {
        setTopic(topics[0]);
    }, []);

    useEffect(() => {
        if (activeTab === 'practice' && !hasSeenTour) {
            setTourStep(0);
            setHasSeenTour(true);
        }
    }, [activeTab]);

    // Auto-resize prompt textarea
    const adjustHeight = () => {
        if (promptRef.current) {
            promptRef.current.style.height = 'auto';
            promptRef.current.style.height = promptRef.current.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        if (activeTab === 'practice') {
            adjustHeight();
            const timer = setTimeout(adjustHeight, 10);
            return () => clearTimeout(timer);
        }
    }, [activeTab, topic]);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const nextTourStep = () => {
        if (tourStep < 5) {
            setTourStep(tourStep + 1);
        } else {
            setTourStep(-1);
        }
    };

    const skipTour = () => {
        setTourStep(-1);
    };

    const tourProps = {
        currentStep: tourStep,
        onNext: nextTourStep,
        onSkip: skipTour
    };

    const getNewRandomTopic = () => {
        if (topics.length <= 1) return;
        let newTopic;
        do {
            newTopic = topics[Math.floor(Math.random() * topics.length)];
        } while (newTopic.id === topic?.id);
        setTopic(newTopic);
    };

    const handleInputChange = (section, field, value) => {
        setEssay(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleTopicChange = (e) => {
        const newQuestion = e.target.value;
        setTopic(prev => ({ ...prev, question: newQuestion }));
    };

    const generateFullEssay = () => {
        const { intro, body1, body2, conclusion } = essay;
        const text = `${intro.paraphrase} ${intro.thesis}\n\n${body1.topicSentence} ${body1.explanation} ${body1.example} ${body1.concluding}\n\n${body2.topicSentence} ${body2.explanation} ${body2.example} ${body2.concluding}\n\n${conclusion.summary} ${conclusion.finalThought}`;
        return text.replace(/\s+/g, ' ').trim() === '' ? '' : text;
    };

    const calculateWordCount = (text) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const totalWordCount = calculateWordCount(generateFullEssay());

    const copyToClipboard = () => {
        const text = generateFullEssay();
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const btn = document.getElementById('copyBtn');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<span class="uppercase font-black">Copied!</span>';
                setTimeout(() => btn.innerHTML = originalText, 2000);
            }
        } catch (err) {
            console.error('Unable to copy', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="h-screen bg-[#f4f1ea] text-stone-900 font-sans flex flex-col overflow-hidden selection:bg-yellow-300 selection:text-stone-900">
            <header className="bg-[#f4f1ea] border-b-2 border-stone-900 px-6 py-5 flex justify-between items-center z-50 sticky top-0">
                <div className="flex items-center gap-6">
                    <div className="bg-stone-900 text-white w-10 h-10 flex items-center justify-center font-serif font-black text-xl">
                        E
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif font-black tracking-tighter text-stone-900 flex items-center gap-3 leading-none">
                            ESSAY ARCHITECT
                            <button
                                onClick={() => setShowAbout(true)}
                                className="text-stone-400 hover:text-stone-900 transition-colors"
                            >
                                <HelpCircle size={18} />
                            </button>
                        </h1>
                        <p className="hidden md:block text-[10px] font-bold text-stone-500 tracking-widest uppercase mt-1">v0.2 • IELTS & PTE Edition</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center">
                        <button
                            onClick={() => setActiveTab('learn')}
                            className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative mr-4 ${activeTab === 'learn' ? 'text-stone-900 after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                            The Guide
                        </button>

                        <div className="w-4 h-8 relative flex flex-col items-center justify-end">
                            <TourTooltip
                                stepIndex={0}
                                text="Switch between The Guide (Theory) and The Editor (Practice)."
                                position="bottom"
                                {...tourProps}
                            />
                        </div>

                        <button
                            onClick={() => setActiveTab('practice')}
                            className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative ml-4 ${activeTab === 'practice' ? 'text-stone-900 after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                            The Editor
                        </button>
                    </div>

                    <div className="flex items-center gap-3 border-l-2 border-stone-300 pl-6 relative">
                        <div className="flex items-center gap-2 text-stone-900">
                            <Clock size={16} strokeWidth={3} className={isTimerRunning ? 'text-red-500 animate-pulse' : 'text-stone-400'} />
                            <span className="font-mono font-bold w-[3rem] text-center text-sm">{formatTime(timer)}</span>
                        </div>

                        <div className="flex gap-1">
                            <button
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                                className={`w-6 h-6 flex items-center justify-center border border-stone-900 hover:bg-stone-900 hover:text-white transition-colors`}
                                title={isTimerRunning ? "Pause" : "Start"}
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
                                className="w-6 h-6 flex items-center justify-center border border-stone-900 text-stone-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                                title="Reset"
                            >
                                <RotateCcw size={10} />
                            </button>
                        </div>

                        <TourTooltip
                            stepIndex={2}
                            text="Time is of the essence. Track it here."
                            position="bottomLeft"
                            {...tourProps}
                        />
                    </div>

                    <div className="relative">
                        <button onClick={() => setShowSettings(true)} className="text-stone-400 hover:text-stone-900 transition-colors">
                            <Settings size={20} />
                        </button>
                        <TourTooltip
                            stepIndex={5}
                            text="Configure your API Key here to power the AI features."
                            position="bottomRight"
                            {...tourProps}
                        />
                    </div>
                </div>
            </header>

            {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
            {showExaminer && (
                <ExaminerModal
                    isOpen={showExaminer}
                    onClose={() => setShowExaminer(false)}
                    essayText={generateFullEssay()}
                />
            )}

            <main className="flex-1 overflow-hidden relative">
                {activeTab === 'learn' && (
                    <div className="h-full overflow-y-auto custom-scrollbar bg-[#f4f1ea]">
                        <div className="max-w-7xl mx-auto p-12">
                            <div className="mb-16 border-b-4 border-stone-900 pb-12">
                                <h2 className="text-7xl md:text-8xl font-black font-serif text-stone-900 mb-6 tracking-tighter leading-[0.8]">
                                    MASTER <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600" style={{ WebkitTextStroke: '2px #1c1917' }}>THE</span> <br />
                                    ARCHITECT
                                </h2>
                                <p className="text-stone-900 text-xl font-serif max-w-2xl border-l-4 border-yellow-400 pl-6 italic">
                                    Essay Architect isn't just a text editor—it's a comprehensive training ground. Here is how to get the most out of it.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6 mb-16">
                                <LearnCard
                                    title="The Wizard"
                                    desc="Breaks your essay into manageable chunks (Intro, Body, Conclusion) to enforce perfect structure."
                                    number="01"
                                />
                                <LearnCard
                                    title="AI Refiner"
                                    desc="Stuck? Get smart autocompletion and sentence polishing powered by Gemini."
                                    number="02"
                                />
                                <LearnCard
                                    title="The Examiner"
                                    desc="Receive instant, strict grading and feedback based on official IELTS/PTE criteria."
                                    number="03"
                                />
                                <LearnCard
                                    title="Privacy Core"
                                    desc="Bring Your Own Key (BYOK). Your data and API key never leave your browser."
                                    number="04"
                                />
                            </div>

                            <div className="bg-stone-900 text-white p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-10">
                                    <Award size={200} />
                                </div>
                                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h3 className="font-serif font-black text-4xl mb-4">Ready to draft your first piece?</h3>
                                        <p className="text-stone-400 mb-8 max-w-md">Put the theory into practice with our live editor. Real-time preview, word counting, and structure enforcement included.</p>
                                        <button
                                            onClick={() => setActiveTab('practice')}
                                            className="bg-yellow-400 text-stone-900 px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors"
                                        >
                                            Start Writing
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="border border-stone-700 p-4">
                                            <span className="text-yellow-400 font-bold uppercase text-xs tracking-wider mb-1 block">Opinion Essays</span>
                                            <p className="font-serif text-xl">"To what extent do you agree?"</p>
                                        </div>
                                        <div className="border border-stone-700 p-4">
                                            <span className="text-yellow-400 font-bold uppercase text-xs tracking-wider mb-1 block">Discussion Essays</span>
                                            <p className="font-serif text-xl">"Discuss both views and give your opinion."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'practice' && (
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-3/5 p-0 overflow-y-auto custom-scrollbar bg-[#f4f1ea] border-r-2 border-stone-900">
                            <div className="p-8 pb-4">
                                <div className="border-2 border-stone-900 bg-white p-6 relative shadow-[8px_8px_0px_0px_rgba(28,25,23,0.1)] hover:shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-shadow duration-300">
                                    <div className="flex justify-between items-start mb-4 border-b border-stone-200 pb-4">
                                        <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                            Topic: {topic?.type}
                                        </span>
                                        <div className="relative z-20">
                                            <button
                                                onClick={getNewRandomTopic}
                                                className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                                                title="Get new random topic"
                                            >
                                                <RefreshCw size={12} /> New Prompt
                                            </button>
                                            <TourTooltip
                                                stepIndex={1}
                                                text="This is your prompt. Auto-resizes as you type. Click 'New Prompt' to shuffle."
                                                position="bottomLeft"
                                                {...tourProps}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            ref={promptRef}
                                            className={`w-full text-stone-900 font-serif font-bold leading-tight bg-transparent border-0 p-0 resize-none outline-none placeholder:text-stone-300 overflow-hidden ${(topic?.question?.length || 0) > 150 ? 'text-xs' : (topic?.question?.length || 0) > 80 ? 'text-sm' : 'text-lg'
                                                }`}
                                            value={topic?.question || ''}
                                            onChange={handleTopicChange}
                                            rows={1}
                                            placeholder="Type your essay question here..."
                                        />
                                        <div className="absolute right-0 bottom-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PenTool size={14} className="text-stone-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-20 md:pb-0 min-h-[500px] p-8 pt-0">
                                <StepWizard
                                    currentStep={currentStep}
                                    setCurrentStep={setCurrentStep}
                                    essay={essay}
                                    handleInputChange={handleInputChange}
                                    tourProps={tourProps}
                                    topic={topic}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-2/5 h-80 md:h-auto border-t-2 md:border-t-0 border-stone-900 relative z-10 bg-white">
                            <PreviewSection
                                essay={essay}
                                totalWordCount={totalWordCount}
                                setShowExaminer={setShowExaminer}
                                copyToClipboard={copyToClipboard}
                                tourProps={tourProps}
                            />
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-[#f4f1ea] border-t-2 border-stone-900 py-2 text-center shrink-0 z-50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Architected by <a href="https://github.com/scuba3198" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-black border-b-2 border-yellow-400 hover:bg-yellow-400 transition-colors cursor-pointer">Mumukshu D.C.</a>
                </p>
            </footer>
        </div>
    );
};

export default App;
