import React from "react";

const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-white-500">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 animate-fade-in">Coming Soon</h1>
        <div className="text-4xl mb-6 animate-fade-in-delay2"></div>
        <div className="animate-fade-in-delay3"></div>
      </div>
    </div>
  );
};

export default ComingSoon;
