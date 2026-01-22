import React, { useState } from 'react';
import { Zap, Wand2, Monitor, Smartphone, Square } from 'lucide-react';

interface ImageGeneratorProps {
    onGenerate: (prompt: string, style: string, aspectRatio: string) => void;
    loading: boolean;
}

const STYLES = ['Anime', 'Realistic', 'Cartoon', '3D'];

const ASPECT_RATIOS = [
    { id: '1:1', label: 'Square', icon: Square },
    { id: '16:9', label: 'Landscape', icon: Monitor },
    { id: '9:16', label: 'Portrait', icon: Smartphone }
];

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onGenerate, loading }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Anime');
    const [aspectRatio, setAspectRatio] = useState('1:1');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        onGenerate(prompt, selectedStyle, aspectRatio);
    };

    const handleEnhancePrompt = () => {
        if (!prompt.trim()) return;
        const enhancements = [
            "highly detailed",
            "8k resolution",
            "cinematic lighting",
            "photorealistic",
            "masterpiece",
            "sharp focus"
        ];
        const randomEnhancements = enhancements.sort(() => 0.5 - Math.random()).slice(0, 2);
        const newPart = randomEnhancements.join(", ");

        if (!prompt.includes(randomEnhancements[0])) {
            setPrompt(prev => `${prev}, ${newPart}`);
        }
    };

    return (
        <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="prompt" className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Prompt
                        </label>
                        <button
                            type="button"
                            onClick={handleEnhancePrompt}
                            className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        >
                            <Wand2 size={12} />
                            Auto-Enhance
                        </button>
                    </div>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A futuristic city with glowing architecture..."
                        className="w-full p-5 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-200 resize-none text-base outline-none focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all placeholder:text-gray-300 dark:placeholder:text-slate-500"
                        rows={3}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Aspect Ratio
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {ASPECT_RATIOS.map((ratio) => {
                            const Icon = ratio.icon;
                            return (
                                <button
                                    key={ratio.id}
                                    type="button"
                                    onClick={() => setAspectRatio(ratio.id)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${aspectRatio === ratio.id
                                        ? 'border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:border-purple-500/30 dark:text-purple-300'
                                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-750'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {ratio.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-between items-end md:items-center mt-2">

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider md:hidden">
                            Style
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {STYLES.map(style => (
                                <button
                                    key={style}
                                    type="button"
                                    onClick={() => setSelectedStyle(style)}
                                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedStyle === style
                                        ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200 dark:shadow-none'
                                        : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !prompt.trim()}
                        className="w-full md:w-auto group relative flex items-center justify-center gap-2 bg-[#2d2d2d] dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-black dark:hover:bg-purple-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/20 dark:border-slate-900/20 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />
                        ) : (
                            <>
                                <Zap size={18} className="fill-current" />
                                <span>Generate</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};