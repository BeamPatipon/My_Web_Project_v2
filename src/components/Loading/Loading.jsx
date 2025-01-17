import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  );
};

export default Loading;
