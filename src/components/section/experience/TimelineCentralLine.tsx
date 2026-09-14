import React from 'react';

const TimelineCentralLine: React.FC = () => {
  return (
    <div
      className="
        absolute
        left-1/2
        top-0
        hidden
        h-full
        w-[1px]   /* épaisseur augmentée pour bien voir */
        -translate-x-1/2
        md:block
      "
    >
      <div
        className="
          w-full
          h-full
          bg-gradient-to-b
          from-[#f3f009]
          via-[#f3f009]/90
          to-[#f3f009]/40
        "
      />
    </div>
  );
};

export default TimelineCentralLine;
