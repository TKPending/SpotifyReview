import "@/app/styles/loadingTextStyle.css";

const LoadingPage = () => {
  return (
    <div className="text-center h-screen w-screen flex flex-col gap-2 items-center justify-center">
      <p className="loading-text">Retrieving your Spotify data</p>
      <div className="flex flex-row gap-2">
        <p className="dot">.</p>
        <p className="dot">.</p>
        <p className="dot">.</p>
      </div>
    </div>
  );
};

export default LoadingPage;
