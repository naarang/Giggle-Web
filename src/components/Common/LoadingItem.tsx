const LoadingItem = () => {
  return (
    <div className="w-full p-[0.5rem] flex flex-col justify-center items-center">
      <div className="animate-spin">
        <div className="w-[2rem] h-[1rem] bg-[#1E1926]"></div>
        <div className="w-[2rem] h-[1rem] bg-[#FEF387]"></div>
      </div>
    </div>
  );
};

export default LoadingItem;
