import "@/app/styles/loadingTextStyle.css";
import AnimatedBackground from "../components/AnimationContainer/AnimatedBackground";

const LoadingTransitionPage = () => {
  return (
    <div className="h-screen w-screen flex gap-2 items-center justify-center">
      <AnimatedBackground />
      <p className="loading-text">Loading Review</p>
      <div className="flex flex-row gap-2">
        <p className="dot">.</p>
        <p className="dot">.</p>
        <p className="dot">.</p>
      </div>
    </div>
  );
};

export default LoadingTransitionPage;
