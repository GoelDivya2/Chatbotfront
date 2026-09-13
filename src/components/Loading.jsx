export const LoadingSpinner = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-blue-200 border-t-white border-r-transparent rounded-full animate-spin"></div>
  );
};

export const LoadingBig = () => {
  return (
    <div className="flex space-x-3 justify-center items-center w-[200px] m-auto mt-[300px]">
      <div className="h-4 w-4 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-500/50 [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-indigo-400 rounded-full animate-bounce shadow-lg shadow-indigo-500/50 [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-purple-400 rounded-full animate-bounce shadow-lg shadow-purple-500/50"></div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="flex space-x-2 justify-center items-center py-3">
      <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce shadow-md shadow-blue-500/50 [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-indigo-400 rounded-full animate-bounce shadow-md shadow-indigo-500/50 [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-purple-400 rounded-full animate-bounce shadow-md shadow-purple-500/50"></div>
    </div>
  );
};