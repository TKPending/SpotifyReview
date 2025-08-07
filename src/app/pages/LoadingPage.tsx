import "@/app/styles/loadingTextStyle.css";

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen flex gap-2 items-center justify-center">
      <p className="loading-text">Loading Review</p>
      <div className="flex flex-row gap-2">
        <p className="dot">.</p>
        <p className="dot">.</p>
        <p className="dot">.</p>
      </div>
    </div>
  );
};

export default LoadingPage;
