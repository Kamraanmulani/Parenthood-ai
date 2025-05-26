
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

interface ChatSession {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatSidebarProps {
  chatSessions: ChatSession[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  chatSessions, 
  onSelectChat,
  onNewChat
}) => {
  // Function to format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If today
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    }
    // If yesterday
    else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    // If this year
    else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    // Otherwise show date with year
    else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };  return (
    <div className="w-64 border-r h-full flex flex-col bg-sidebar">
      <div className="p-4 border-b">
        <Button 
          onClick={onNewChat} 
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chatSessions.map((session) => (
            <button
              key={session._id}
              onClick={() => onSelectChat(session._id)}
              className="w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted/80 text-sidebar-foreground"
            >
              <div className="truncate">{session.title}</div>
              <div className="text-xs text-muted-foreground truncate">{formatDate(session.updatedAt)}</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
