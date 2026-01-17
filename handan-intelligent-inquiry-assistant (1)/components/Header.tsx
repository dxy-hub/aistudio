import React from 'react';
import { ChevronLeft, X, MoreHorizontal, MessageSquarePlus } from 'lucide-react';

interface HeaderProps {
  title: string;
  onNewSession?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNewSession }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10 text-slate-800">
      <div className="flex items-center gap-4">
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <h1 className="text-lg font-medium tracking-wide truncate max-w-[200px] text-center">
        {title}
      </h1>

      <div className="flex items-center gap-2">
         {/* New Session Button */}
         <button 
           onClick={onNewSession}
           className="p-1 hover:bg-gray-100 rounded-full transition-colors text-[#4B89FF]"
           title="新会话"
         >
           <MessageSquarePlus className="w-6 h-6" />
         </button>
         
         <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};