import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
    onClearHistory?: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
    return (
        <header className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 px-6 py-4 flex justify-between items-center mb-6 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                    AI
                </div>
                <div className="flex items-baseline gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                        ImaginAIry
                    </h1>
                    <span className="text-sm text-gray-400 font-medium">v1.0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
};