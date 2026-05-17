const Loader = ({ ...props }) => {
  return (
    <div
      {...props}
      aria-label="loading"
      role="status"
      className="flex space-x-2 justify-center items-center py-10"
    >
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
