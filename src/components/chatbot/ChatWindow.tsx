import type { RefObject } from 'react';

import type { Message } from './chatbot.types';

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  chatRef: RefObject<HTMLDivElement | null>;

  messages: Message[];
  message: string;
  loading: boolean;

  title: string;
  closeLabel: string;
  thinkingText: string;
  placeholder: string;
  sendText: string;

  onClose: () => void;
  onMessageChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatWindow({
  chatRef,
  messages,
  message,
  loading,
  title,
  closeLabel,
  thinkingText,
  placeholder,
  sendText,
  onClose,
  onMessageChange,
  onSend,
}: ChatWindowProps) {
  return (
    <div
      ref={chatRef}
      className="
        fixed bottom-24 right-5 z-30
        flex h-[65vh] max-h-[500px]
        w-[90vw] flex-col
        overflow-hidden rounded-2xl
        border border-white/10
        bg-[#111111] shadow-2xl
        sm:w-[320px]
        md:w-[360px]
        lg:w-[380px]
        xl:w-[400px]
      "
    >
      {/* Header */}

      <div
        className="
          flex items-center justify-between
          border-b border-white/10
          px-4 py-3
        "
      >
        <h2 className="font-semibold text-white">{title}</h2>

        <button
          type="button"
          onClick={onClose}
          className="
            text-xl text-gray-400
            transition-colors
            hover:text-white
          "
          aria-label={closeLabel}
        >
          ×
        </button>
      </div>

      {/* Messages */}

      <ChatMessages
        messages={messages}
        loading={loading}
        thinkingText={thinkingText}
      />

      {/* Saisie */}

      <ChatInput
        message={message}
        loading={loading}
        placeholder={placeholder}
        sendText={sendText}
        onMessageChange={onMessageChange}
        onSend={onSend}
      />
    </div>
  );
}
