import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const SuccessConfetti: React.FC = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  if (!size.width || !size.height) {
    return null;
  }

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-[99999]
      "
    >
      <Confetti
        width={size.width}
        height={size.height}
        numberOfPieces={700}
        recycle={false}
        gravity={0.18}
        wind={0.01}
        initialVelocityY={8}
        initialVelocityX={2}
      />
    </div>
  );
};

export default SuccessConfetti;
