import React from 'react';

interface AssistantMessageProps {
  content: string;
}

export default function AssistantMessage({ content }: AssistantMessageProps) {
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const lines = content.split('\n');

  return (
    <div className="space-y-2.5 text-sm leading-relaxed">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        // Ligne vide
        if (!trimmedLine) {
          return <div key={index} className="h-1" />;
        }

        // ### Titre
        if (trimmedLine.startsWith('### ')) {
          const title = trimmedLine.replace(/^###\s*/, '');

          return (
            <h3
              key={index}
              className="mt-1 mb-3 text-base font-bold text-gray-900"
            >
              {title}
            </h3>
          );
        }

        // ## Sous-titre
        if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('### ')) {
          const title = trimmedLine.replace(/^##\s*/, '');

          return (
            <h3
              key={index}
              className="mt-1 mb-3 text-base font-bold text-gray-900"
            >
              {title}
            </h3>
          );
        }

        // **1. Projet**
        if (
          trimmedLine.startsWith('**') &&
          trimmedLine.endsWith('**') &&
          /^\*\*\d+\./.test(trimmedLine)
        ) {
          const title = trimmedLine.replace(/^\*\*/, '').replace(/\*\*$/, '');

          return (
            <h4 key={index} className="mt-3 text-sm font-bold text-gray-900">
              {title}
            </h4>
          );
        }

        // **Technologies :** React, Laravel...
        if (
          trimmedLine.startsWith('**Technologies') ||
          trimmedLine.startsWith('**Technologies :**')
        ) {
          const technologies = trimmedLine
            .replace(/^\*\*Technologies\s*:?\*\*\s*/i, '')
            .trim();

          return (
            <div
              key={index}
              className="mt-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2"
            >
              <span className="font-semibold text-gray-800">
                Technologies :
              </span>{' '}
              <span className="text-gray-700">{technologies}</span>
            </div>
          );
        }

        // Liste •
        if (trimmedLine.startsWith('• ')) {
          const text = trimmedLine.substring(2);

          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 text-[#8f8b00]">•</span>

              <p className="flex-1 text-gray-800">{renderBoldText(text)}</p>
            </div>
          );
        }

        // Liste -
        if (trimmedLine.startsWith('- ')) {
          const text = trimmedLine.substring(2);

          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 text-[#8f8b00]">•</span>

              <p className="flex-1 text-gray-800">{renderBoldText(text)}</p>
            </div>
          );
        }

        // Liste numérotée : 1. React
        const numberedMatch = trimmedLine.match(/^(\d+)\.\s(.*)$/);

        if (numberedMatch) {
          const [, number, text] = numberedMatch;

          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="font-semibold text-[#8f8b00]">{number}.</span>

              <p className="flex-1 text-gray-800">{renderBoldText(text)}</p>
            </div>
          );
        }

        // Texte normal
        return (
          <p key={index} className="text-gray-800">
            {renderBoldText(trimmedLine)}
          </p>
        );
      })}
    </div>
  );
}
