import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse pt-4">
      <div className="flex justify-center mb-4">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 ml-4"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-96 bg-gray-300 rounded w-full mb-4"></div>
    </div>
  );
};

export default Skeleton;
