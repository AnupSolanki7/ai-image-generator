import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import type { ImageResult } from '../hooks/useImageGeneration';

interface HistoryProps {
    history: ImageResult[];
    onSelect: (item: ImageResult) => void;
    onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onSelect, onClearHistory }) => {
    return (
        <aside className="bg-white dark:bg-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 h-full flex flex-col gap-6 sticky top-28 transition-colors duration-300">
            <div className="flex justify-between items-center px-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    History
                </h3>
                <button
                    onClick={onClearHistory}
                    className="flex items-center gap-2 group transition-all"
                >
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                        Clear
                    </span>
                    <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200 dark:shadow-none hover:bg-purple-700 active:scale-95 transition-all">
                        <Trash2 size={20} />
                    </div>
                </button>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-1 custom-scrollbar">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-300 dark:text-gray-600">
                        <Clock size={32} className="mb-2 opacity-50" />
                        <p className="text-xs font-medium">No recent creations</p>
                    </div>
                ) : (
                    history.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-50 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-purple-100 dark:hover:border-purple-900 transition-all text-left w-full"
                        >
                            <div className="aspect-4/3 w-full relative overflow-hidden bg-gray-100 dark:bg-slate-900">
                                <img
                                    src={item.url}
                                    alt={item.prompt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-3">
                                <div className="flex gap-2 mb-1">
                                    {item.style && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                                            {item.style}
                                        </span>
                                    )}
                                    {item.aspectRatio && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                                            {item.aspectRatio}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 truncate">
                                    {item.prompt}
                                </p>
                            </div>
                        </button>
                    ))
                )}
            </div>
            {history.length > 0 && (
                <p className="text-[10px] text-center text-gray-300 dark:text-gray-600 font-medium">
                    Showing last 5 creations
                </p>
            )}
        </aside>
    );
};