import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { SuggestionPill } from './components/SuggestionPill';
import { AgentCard } from './components/AgentCard';
import { ChatBubble } from './components/ChatBubble';
import { sendMessageToGemini } from './services/geminiService';
import { Message, Role } from './types';

// Constants based on Image 2 Content
const APP_TITLE = "邯郸智能问询助手";
const INTRO_TEXT = "您可以问我您想办理的事项或想咨询的政策；";
const SUGGESTIONS = [
  "专精特新“小巨人”企业科技特派团的补助标准是什么？",
  "驾驶证遗失补证的办理流程与申请材料",
  "申报市级技术创新中心需满足哪些基本条件？"
];

const AGENTS = [
  {
    id: 'hanxiaoke',
    name: '邯小科',
    description: '科技政策咨询、科技项目管理、人才服务、科技成果转换等',
    avatarUrl: 'https://picsum.photos/seed/hanxiaoke/200/200',
    colorClass: 'bg-blue-500'
  },
  {
    id: 'hanxiaozheng',
    name: '邯小政',
    description: '行政许可、备案登记、资质变更、材料预审服务等',
    avatarUrl: 'https://picsum.photos/seed/hanxiaozheng/200/200',
    colorClass: 'bg-orange-500'
  }
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(text);

    const newBotMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: Role.MODEL,
      text: responseText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newBotMessage]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleNewSession = () => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 font-sans">
      {/* Mobile Container Mockup */}
      <div className="w-full max-w-md bg-white h-screen flex flex-col shadow-2xl relative overflow-hidden">
        
        <Header title={APP_TITLE} onNewSession={handleNewSession} />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-slate-50 relative">
          
          <div className="p-4 pt-6 pb-24">
            
            {/* --- Welcome / Hero Section (Always visible at top of scroll, mimicking Image 1) --- */}
            
            {/* 1. Large Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-blue-50 p-2 shadow-inner">
                <img 
                  src="https://picsum.photos/seed/handan_main/300/300" 
                  alt="Logo" 
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>
            </div>

            {/* 2. Bold Title */}
            <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
              {APP_TITLE}
            </h2>

            {/* 3. Intro Bubble (Image 1 Style, Image 2 Content) */}
            <div className="bg-gray-100/80 rounded-2xl p-4 mb-6 text-gray-700 text-sm font-bold leading-relaxed relative mx-2">
                {/* Tiny triangle for bubble effect pointing up to logo */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-100/80 rotate-45"></div>
               <span className="text-[#4B89FF]">您好，我是{APP_TITLE}</span>
               ，{INTRO_TEXT}
            </div>

            {/* 4. Suggestion Pills */}
            <div className="mb-8 px-1">
              {SUGGESTIONS.map((s, i) => (
                <SuggestionPill key={i} text={s} onClick={() => handleSuggestionClick(s)} />
              ))}
            </div>

            {/* 5. Sub-Agents Container (Gradient Box with Inner White Box) */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 mb-8">
               <div className="text-sm text-gray-700 mb-4 px-1">
                  我们为您汇聚各类专业贴心的智能小助手，目前已覆盖政务事项办理类、科技政策与流程办理类两个高频场景
               </div>
               {/* White background area for cards */}
               <div className="bg-white rounded-2xl p-2 flex justify-center items-center gap-2 shadow-sm">
                 {AGENTS.map((agent) => (
                   <AgentCard 
                    key={agent.id} 
                    name={agent.name} 
                    description={agent.description} 
                    avatarUrl={agent.avatarUrl}
                    colorClass={agent.colorClass}
                   />
                 ))}
               </div>
            </div>

            {/* --- Chat History (Appends below the static content) --- */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} role={msg.role} text={msg.text} />
              ))}
              
              {isLoading && (
                 <div className="flex justify-start w-full mb-4">
                   <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 bg-blue-100">
                     <img 
                       src="https://picsum.photos/seed/handan_bot/200/200" 
                       alt="Bot" 
                       className="w-full h-full object-cover p-1"
                     />
                   </div>
                   <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center">
                     <div className="flex space-x-1">
                       <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                       <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                     </div>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

          </div>
        </div>

        {/* Sticky Footer / Input Area */}
        <div className="bg-white/90 backdrop-blur-md p-4 border-t border-gray-100 absolute bottom-0 left-0 right-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="有问题从这里开始提问"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 h-8"
            />
            <button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                inputValue.trim() ? 'bg-gray-400 hover:bg-[#4B89FF] text-white' : 'bg-gray-300 text-white'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}