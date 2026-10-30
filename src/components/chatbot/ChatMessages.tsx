import { FaUserCircle } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';

import type { Message } from './chatbot.types';

import AssistantMessage from './AssistantMessage';
import TypingDots from './TypingDots';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  thinkingText: string;
}

export default function ChatMessages({
  messages,
  loading,
  thinkingText,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={`${msg.role}-${index}`}
          className={`
            flex items-start gap-2
            ${msg.role === 'user' ? 'justify-end' : 'justify-start'}
          `}
        >
          {/* Icône assistant */}

          {msg.role === 'assistant' && (
            <SiOpenai
              className="
                mt-1 shrink-0
                text-[#f3f009]
              "
            />
          )}

          {/* Icône utilisateur */}

          {msg.role === 'user' && (
            <FaUserCircle
              className="
                mt-1 shrink-0
                text-blue-400
              "
            />
          )}

          {/* Bulle */}

          <div
            className={`
              max-w-[85%]
              rounded-xl px-3 py-2
              text-sm
              ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }
            `}
          >
            {msg.role === 'assistant' ? (
              <AssistantMessage content={msg.content} />
            ) : (
              <p className="leading-relaxed">{msg.content}</p>
            )}
          </div>
        </div>
      ))}

      {/* Assistant en train d'écrire */}

      {loading && (
        <div className="flex items-start gap-2">
          <SiOpenai
            className="
              mt-1 shrink-0
              text-[#f3f009]
            "
          />

          <div
            className="
              flex items-center gap-2
              rounded-xl
              bg-gray-200
              px-3 py-2
              text-sm text-gray-500
            "
          >
            <span>{thinkingText}</span>

            <TypingDots />
          </div>
        </div>
      )}
    </div>
  );
}
