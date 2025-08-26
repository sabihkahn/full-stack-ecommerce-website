import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MovingText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const textWidth = textRef.current.offsetWidth;

    gsap.set(textRef.current, { x: 0 });

    gsap.to(textRef.current, {
      x: -textWidth,
      duration: 20, // adjust speed here
      ease: "linear",
      repeat: -1,   // infinite
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % textWidth) // seamless looping
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full bg-white py-2">
      <div
        ref={textRef}
        className="inline-block whitespace-nowrap text-black font-bold text-lg"
      >
        We ship all our products in 3 days &nbsp;&nbsp;&nbsp; 
        We ship all our products in 3 days &nbsp;&nbsp;&nbsp;
        We ship all our products in 3 days &nbsp;&nbsp;&nbsp;
        We ship all our products in 3 days &nbsp;&nbsp;&nbsp;
        We ship all our products in 3 days &nbsp;&nbsp;&nbsp;
        We ship all our products in 3 days &nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default MovingText;
