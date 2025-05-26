import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/public/parent.jpeg"
            alt="ParenthoodAI Logo"
            className="h-16 w-16 rounded-full"
          />
          <span className="text-2xl font-bold text-primary">ParenthoodAI</span>
        </Link>

        <nav className="ml-auto flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/")
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/chat"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/chat")
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            )}
          >
            Chat
          </Link>
          <Link
            to="/activity"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/activity")
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            )}
          >
            Activity
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
