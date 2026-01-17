import React from 'react';

interface AgentCardProps {
  name: string;
  description: string;
  avatarUrl: string;
  colorClass: string; // Expecting tailwind bg class logic or specific color
}

export const AgentCard: React.FC<AgentCardProps> = ({ name, description, avatarUrl, colorClass }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 w-36 h-36 bg-white rounded-xl relative overflow-hidden shrink-0 mx-1">
      {/* Background decoration - using opacity on the color class */}
      <div className={`absolute inset-0 opacity-10 ${colorClass}`}></div>
      
      <div className="w-12 h-12 rounded-full mb-2 overflow-hidden border-2 border-white shadow-sm z-10">
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-sm font-bold text-gray-800 z-10">{name}</h3>
      <p className="text-[10px] text-gray-500 text-center mt-1 leading-tight line-clamp-2 z-10 px-1">
        {description}
      </p>
    </div>
  );
};