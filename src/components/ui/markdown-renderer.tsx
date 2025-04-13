import React from 'react';
import Markdown from 'react-markdown';

// Define markdown theme styles
export const markdownTheme = {
  p: 'mb-4 leading-relaxed',
  h1: 'text-2xl font-bold mb-4 mt-6',
  h2: 'text-xl font-bold mb-3 mt-5',
  h3: 'text-lg font-bold mb-3 mt-4',
  ul: 'list-disc pl-6 mb-4',
  ol: 'list-decimal pl-6 mb-4',
  li: 'mb-1',
  code: 'px-1 py-0.5 bg-muted rounded text-sm font-mono',
  pre: 'p-3 bg-muted rounded-md overflow-x-auto mb-4 font-mono text-sm'
};

interface MarkdownRendererProps {
  content: string | undefined;
  className?: string;
}

// A simpler reusable markdown component that just applies our styling
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Only render if we have content
  if (!content) return null;
  
  return (
   
      <Markdown 
        
        components={{
          p: ({ children }) => <p className={markdownTheme.p}>{children}</p>,
          h1: ({ children }) => <h1 className={markdownTheme.h1}>{children}</h1>,
          h2: ({ children }) => <h2 className={markdownTheme.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={markdownTheme.h3}>{children}</h3>,
          ul: ({ children }) => <ul className={markdownTheme.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={markdownTheme.ol}>{children}</ol>,
          li: ({ children }) => <li className={markdownTheme.li}>{children}</li>,
          code: ({ children, inline }) => {
            const codeClass = inline ? markdownTheme.code : markdownTheme.pre;
            return <code className={codeClass}>{children}</code>;
          }
        }}
      >
        {content}
      </Markdown>
    
  );
}
