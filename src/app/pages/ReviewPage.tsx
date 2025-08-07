import { useState } from "react";
import UserContainer from "@/app/containers/UserContainer";
import ReviewContentContainer from "@/app/containers/review/ReviewContentContainer";
import RemoveAccessButton from "@/app/components/RemoveAccessButton";

const ReviewPage = () => {
  const [option, setOption] = useState<number>(0);

  const handleOptionChange = (optionIndex: number) => {
    setTimeout(() => {
      setOption(optionIndex);
    }, 100);
  };

  return (
    <div className="flex flex-col sm:flex-row max-h-screen max-w-screen h-screen w-screen overscroll-none gap-2">
      <RemoveAccessButton />

      <UserContainer
        handleOptionChange={handleOptionChange}
        activeOption={option}
      />
      <ReviewContentContainer selectedOption={option} />
    </div>
  );
};

export default ReviewPage;
