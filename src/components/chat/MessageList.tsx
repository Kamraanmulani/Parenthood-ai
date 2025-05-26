import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h3 className="text-2xl font-semibold text-primary mb-2">Welcome to Dr. Kamraan</h3>
          <p className="text-muted-foreground max-w-md">
            Your child development specialist with 20+ years of experience with neurodivergent children.
            Ask me anything about parenting tips or daily challenges.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === 'user' ? "justify-end" : "justify-start",
              "animate-message-fade-in opacity-0"
            )}
            style={{ animationDelay: '0.1s' }}
          >
            <div
              className={cn(
                "max-w-[80%] px-4 py-3 rounded-lg",
                message.sender === 'user' ? "chat-bubble-user" : "chat-bubble-bot"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="text-xs opacity-70 text-right mt-1">
                {new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(message.timestamp)}
              </div>
            </div>
          </div>
        ))
      )}
      
      {isTyping && (
        <div className="flex justify-start animate-message-fade-in opacity-0">
          <div className="chat-bubble-bot px-4 py-3">
            <div className="typing-indicator">
              <span></span>
              <span style={{ animationDelay: '0.2s' }}></span>
              <span style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
