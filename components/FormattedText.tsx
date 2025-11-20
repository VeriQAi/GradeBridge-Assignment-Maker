
import React from 'react';
import katex from 'katex';

export const FormattedText: React.FC<{ text: string, className?: string }> = ({ text, className = '' }) => {
  if (!text) return null;
  
  // Split text by $...$ delimiters
  // The capturing group in split keeps the separators in the result array
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, { 
                throwOnError: false,
                output: 'html'
            });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch (e) {
            return <span key={index} className="text-red-500">{part}</span>;
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};
