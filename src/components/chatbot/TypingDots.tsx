export default function TypingDots() {
  return (
    <div className="flex gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500" />

      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:0.2s]" />

      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:0.4s]" />
    </div>
  );
}
