import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-2.5 ${
            message.sender === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.sender === 'user' ? 'bg-purple-600' : 'bg-gray-600'
          }`}>
            {message.sender === 'user' ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>
          <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 ${
            message.sender === 'user'
              ? 'bg-purple-600 text-white rounded-l-lg rounded-br-lg'
              : 'bg-gray-800 text-gray-100 rounded-r-lg rounded-bl-lg border border-gray-700'
          }`}>
            <p className="text-sm font-normal">{message.text}</p>
            <span className="text-xs opacity-50 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}