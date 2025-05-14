const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/439214/loading.svg"
          className="rounded-full h-28 w-28"
          alt="Loading"
        />
      </div>
    </div>
  );
};

export default Loader;
