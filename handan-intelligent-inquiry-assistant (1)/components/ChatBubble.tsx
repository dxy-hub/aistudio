import React from 'react';
import { Role } from '../types';

interface ChatBubbleProps {
  role: Role;
  text: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text }) => {
  const isUser = role === Role.USER;

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
       {!isUser && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 bg-blue-100 border border-blue-200">
           <img 
            src="https://picsum.photos/seed/handan_bot/200/200" 
            alt="Bot" 
            className="w-full h-full object-cover p-1"
          />
        </div>
      )}
      
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[#4B89FF] text-white rounded-tr-sm' // Blue bubble for user, mimicking Image 1
            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm' // White bubble for bot
        }`}
      >
        {text}
      </div>
    </div>
  );
};