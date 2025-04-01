
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  withText?: boolean;
  onClick?: () => void;
}

export function Logo({ className, withText = true, onClick }: LogoProps) {
  const logoContent = (
    <>
      <div className="relative h-12 w-12 overflow-hidden">
        <img 
          src="/lovable-uploads/70e7ade8-eabc-4292-b5ce-79236560db5c.png" 
          alt="EmailManager.ai Logo" 
          className="h-full w-full object-contain"
        />
      </div>
      {withText && (
        <div className="flex flex-col">
          <span className="font-semibold text-xl tracking-tight text-blue-500">EmailManager.ai</span>
          <span className="text-xs text-blue-400">Replies in seconds. Saves life time.</span>
        </div>
      )}
    </>
  );

  // If onClick is provided, render a div with the onClick handler
  if (onClick) {
    return (
      <div 
        className={cn("flex items-center gap-3 cursor-pointer", className)}
        onClick={onClick}
      >
        {logoContent}
      </div>
    );
  }

  // Otherwise, render a Link component
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      {logoContent}
    </Link>
  );
}
