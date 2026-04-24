import React, { useEffect, useRef } from "react";

export default function Popup({ children, onClose }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="absolute z-50 mt-2">
      <div ref={ref} className="rounded border bg-white shadow-lg p-2">
        {children}
      </div>
    </div>
  );
}
