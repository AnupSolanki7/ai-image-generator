import React from 'react';
import { Download, Trash2, AlertCircle, Sparkles } from 'lucide-react';

interface ImageDisplayProps {
    imageUrl: string | null;
    prompt: string;
    loading: boolean;
    error: string | null;
    onClear: () => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, prompt, loading, error, onClear }) => {
    const handleDownload = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `imaginary-${Date.now()}.png`;
        link.click();
    };

    if (error) {
        return (
            <div className="bg-white rounded-3xl p-12 border border-red-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Generation Failed</h3>
                <p className="text-gray-500 max-w-xs mb-6">{error}</p>
                <button
                    onClick={onClear}
                    className="px-6 py-2 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                <div className="aspect-video w-full bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <div className="w-12 h-12 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin" />
                    <p className="text-gray-400 font-medium animate-pulse">Brewing your masterpiece...</p>
                </div>
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                <div className="aspect-video w-full border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mb-4">
                        <Sparkles size={32} />
                    </div>
                    <p className="text-gray-400 text-center font-medium">
                        Your creations will appear here.<br />Enter a prompt to start.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Image Display</h3>
            <div className="relative group rounded-2xl overflow-hidden bg-gray-50">
                <img
                    src={imageUrl}
                    alt={prompt}
                    className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        onClick={handleDownload}
                        className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:scale-110 active:scale-95 transition-all"
                        title="Download"
                    >
                        <Download size={20} />
                    </button>
                    <button
                        onClick={onClear}
                        className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-red-400 hover:text-red-600 hover:scale-110 active:scale-95 transition-all"
                        title="Delete"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-2xl flex items-start gap-3">
                <div className="mt-1 shrink-0">
                    <Sparkles size={16} className="text-purple-500" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Generated Prompt</p>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 italic">
                        "{prompt}"
                    </p>
                </div>
            </div>
        </div>
    );
};