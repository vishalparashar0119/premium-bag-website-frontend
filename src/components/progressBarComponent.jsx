import { useEffect, useState } from "react";

export default function ProgressBar(props) {
      const {color , delay} = props;
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpand(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="h-1 w-28 rounded">
      <div
        className={`
          h-full bg-${color}-500 rounded
          transition-all duration-700 ease-in-out
          ${expand ? "w-full" : "w-0"}
        `}
      />
    </div>
  );
}
