import React, { useState } from 'react';
import { Zap } from 'lucide-react'; // Lucide icons match the professional look

interface ImageGeneratorProps {
    onGenerate: (prompt: string, style: string) => void;
    loading: boolean;
}

const STYLES = ['Anime', 'Realistic', 'Cartoon', '3D'];

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onGenerate, loading }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Anime');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        onGenerate(prompt, selectedStyle);
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Prompt Input Area */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="prompt" className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                            Prompt:
                        </label>
                    </div>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A futuristic city with glowing architecture..."
                        className="w-full p-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-700 resize-none text-base outline-none focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-gray-300"
                        rows={3}
                    />
                </div>

                {/* Style Selection & Submit Row */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-end md:items-center">

                    {/* Style Pills */}
                    <div className="flex gap-2 flex-wrap">
                        {STYLES.map(style => (
                            <button
                                key={style}
                                type="button"
                                onClick={() => setSelectedStyle(style)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedStyle === style
                                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200'
                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                    }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={loading || !prompt.trim()}
                        className="group relative flex items-center justify-center gap-2 bg-[#2d2d2d] text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Zap size={18} className="fill-current" />
                                <span>Generate Image</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};