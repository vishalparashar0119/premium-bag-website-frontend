import { useEffect, useState } from "react";

export default function ProgressBar({ color, delay }) {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpand(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="h-1 w-28 rounded overflow-hidden">
      <div
        style={{
          backgroundColor: color,
          width: expand ? "100%" : "0%",
        }}
        className="
          h-full rounded
          transition-all duration-700 ease-in-out
        "
      />
    </div>
  );
}
