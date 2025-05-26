
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-center space-y-2">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ParenthoodAI. All rights reserved.
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
