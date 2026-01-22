import React from 'react';
import { Search, Clock, Trash2 } from 'lucide-react';

interface HistoryItem {
    id: string;
    url: string;
    prompt: string;
    timestamp: number;
    style?: string; // Added to match the image labels
}

interface HistoryProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onSelect, onClearHistory }) => {
    return (
        <aside className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full flex flex-col gap-6 sticky top-28">
            {/* Header Section */}
            <div className="flex justify-between items-center px-1">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    History
                </h3>
                {/* Right: Clear History Action */}
                <button
                    onClick={onClearHistory}
                    className="flex items-center gap-2 group transition-all"
                >
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-800 transition-colors">
                        Clear History
                    </span>
                    <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all">
                        <Trash2 size={20} />
                    </div>
                </button>
            </div>

            {/* History List */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-1 custom-scrollbar">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                        <Clock size={32} className="mb-2 opacity-20" />
                        <p className="text-xs font-medium">No recent creations</p>
                    </div>
                ) : (
                    history.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-50 shadow-sm hover:shadow-md hover:border-purple-100 transition-all text-left"
                        >
                            <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
                                <img
                                    src={item.url}
                                    alt={item.prompt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate">
                                    {item.style || 'Realistic'}
                                </p>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Footer Info */}
            {history.length > 0 && (
                <p className="text-[10px] text-center text-gray-300 font-medium">
                    Showing last 5 creations
                </p>
            )}
        </aside>
    );
};