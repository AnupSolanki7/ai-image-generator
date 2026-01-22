import React from 'react';
interface HeaderProps {
    onClearHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex justify-between items-center mb-6">
            {/* Left: Logo and Version */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                    AI
                </div>
                <div className="flex items-baseline gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                        ImaginAIry
                    </h1>
                    <span className="text-sm text-gray-400 font-medium">v1.0</span>
                </div>
            </div>


        </header>
    );
};