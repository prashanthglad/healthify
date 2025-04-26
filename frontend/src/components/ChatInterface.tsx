import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your mental health advisor. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (text: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "I understand. I'm here to listen and help. Would you like to tell me more about that?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen max-h-[800px] bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg border-b border-gray-700">
        <h2 className="text-xl font-semibold">Mental Health Advisor</h2>
        <p className="text-sm text-gray-300">Online and ready to help</p>
      </div>
      
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}