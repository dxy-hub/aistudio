import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestionPillProps {
  text: string;
  onClick: () => void;
}

export const SuggestionPill: React.FC<SuggestionPillProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 px-4 bg-white border border-gray-200 rounded-2xl shadow-sm active:bg-gray-50 transition-all hover:shadow-md group mb-3 text-left"
    >
      <span className="text-gray-700 text-sm font-medium line-clamp-2 flex-1 pr-2">
        {text}
      </span>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
    </button>
  );
};