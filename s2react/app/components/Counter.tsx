"use client";

import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-xl font-semibold">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
};

export default Counter;
