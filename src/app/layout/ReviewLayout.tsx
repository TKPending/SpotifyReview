import { useState } from "react";
import UserContainer from "@/app/containers/UserContainer";
import ReviewContentContainer from "@/app/containers/ReviewContentContainter";

const ReviewLayout = () => {
  const [option, setOption] = useState<number>(0);
  const handleOptionChange = (optionIndex: number) => {
    setTimeout(() => {
        setOption(optionIndex);
    }, 2000);
  };

  return (
    <div className="h-screen w-screen flex">
      <UserContainer handleOptionChange={handleOptionChange} />
      <ReviewContentContainer optionIndex={option} />
    </div>
  );
};

export default ReviewLayout;
