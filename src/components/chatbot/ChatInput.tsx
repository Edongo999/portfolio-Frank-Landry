import type { KeyboardEvent } from 'react';

interface ChatInputProps {
  message: string;
  loading: boolean;
  placeholder: string;
  sendText: string;

  onMessageChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  message,
  loading,
  placeholder,
  sendText,
  onMessageChange,
  onSend,
}: ChatInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      onSend();
    }
  };

  return (
    <div
      className="
        flex gap-2
        border-t border-white/10
        p-3
      "
    >
      <input
        type="text"
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder={placeholder}
        className="
          flex-1 rounded-xl
          border border-white/10
          bg-white/5
          px-3 py-2
          text-sm text-white
          placeholder:text-gray-500
          focus:border-yellow-400
          focus:outline-none
        "
      />

      <button
        type="button"
        onClick={onSend}
        disabled={loading || !message.trim()}
        className="
          rounded-xl
          bg-[#f3f009]
          px-4 py-2
          text-sm font-semibold
          text-black
          transition-opacity
          disabled:opacity-40
        "
      >
        {sendText}
      </button>
    </div>
  );
}
