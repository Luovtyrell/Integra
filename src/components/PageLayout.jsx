import React from "react";

const PageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-400">
      {/* Title at the top */}
      <header className="w-full text-center py-6 bg-transparent">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      </header>

      {/* Content just below the title with padding */}
      <div className="w-full flex justify-center">
        <div className="max-w-md w-full p-6 bg-transparent rounded-xl  text-gray-800 -mt-8 text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
