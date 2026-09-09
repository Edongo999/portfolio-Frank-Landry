import React, { useEffect, useState } from 'react';

interface TypewriterNameProps {
  names: string[];
}

const TypewriterName = React.memo(({ names }: TypewriterNameProps) => {
  const [displayedName, setDisplayedName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [nameChar, setNameChar] = useState(0);

  useEffect(() => {
    const currentName = names[nameIndex] || '';

    if (nameChar < currentName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(currentName.slice(0, nameChar + 1));
        setNameChar((c) => c + 1);
      }, 150);

      return () => clearTimeout(timeout);
    }

    const resetTimeout = setTimeout(() => {
      setNameIndex((nameIndex + 1) % names.length);
      setNameChar(0);
      setDisplayedName('');
    }, 1500);

    return () => clearTimeout(resetTimeout);
  }, [nameChar, nameIndex, names]);

  return (
    <span
      className="
        relative
        block
        h-[1.4em]
        w-full
        sm:inline-block
        sm:h-[1.4em]
        sm:w-75
        
        ml-0
        sm:ml-1
        overflow-hidden
        align-bottom
        text-[#f3f009]
      "
    >
      <span
        className="
          absolute
          left-1/2
          top-0
          -translate-x-1/2
          whitespace-nowrap
          sm:left-0
          sm:translate-x-0
        "
      >
        {displayedName}
        <span className="ml-1 animate-pulse">|</span>
      </span>
    </span>
  );
});

export default TypewriterName;
