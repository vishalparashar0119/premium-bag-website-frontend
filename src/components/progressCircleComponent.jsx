import { useEffect, useState } from "react";

export default function ProgressCircle(props) {
  const { color, children, delay, tooltip } = props;
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpand(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative h-8 w-8 group">
      {/* Tooltip */}
      <div
        className={`
          absolute -top-9 left-1/2 -translate-x-1/2
          px-2 py-1 rounded text-xs text-white whitespace-nowrap
          bg-${color}-500
          opacity-0 scale-95
          transition-all duration-200
          group-hover:opacity-100 group-hover:scale-100
          pointer-events-none
          z-10
        `}
      >
        {tooltip}
      </div>

      {/* Circle */}
      <div className="relative h-8 w-8 rounded-full overflow-hidden">
        <div
          className={` absolute bottom-0 left-0
            bg-${color}-500 w-full rounded-ful
            flex items-center justify-center font-bold text-white
            transition-all duration-700 ease-in-out
            ${expand ? "w-full h-full" : "h-0"}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
