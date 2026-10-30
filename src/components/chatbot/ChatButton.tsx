import { HiChatBubbleLeftRight } from 'react-icons/hi2';

interface ChatButtonProps {
  title: string;
  ariaLabel: string;
  onToggle: () => void;
}

export default function ChatButton({
  title,
  ariaLabel,
  onToggle,
}: ChatButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className="
        group fixed bottom-6 right-5 z-30
        flex h-12 w-12 items-center justify-center
        rounded-full bg-[#f3f009] text-black
        shadow-lg transition-transform duration-200
        hover:scale-105
        md:h-14 md:w-14
      "
    >
      <HiChatBubbleLeftRight className="h-6 w-6 md:h-7 md:w-7" />

      <span
        className="
          absolute bottom-16 right-0 hidden w-max
          rounded-md bg-black px-2 py-1
          text-xs text-white
          group-hover:block
        "
      >
        {title}
      </span>
    </button>
  );
}
