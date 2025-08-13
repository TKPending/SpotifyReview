import { useState } from "react";
import Navigation from "@/app/containers/navigation/Navigation";
import ReviewContentContainer from "@/app/containers/review/ReviewContentContainer";
import RemoveAccessButton from "@/app/containers/access/components/RemoveAccessButton";
import RemoveAccessModal from "@/app/containers/modal/RemoveAccessModal";

const ReviewPage = () => {
  const [option, setOption] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOptionChange = (optionIndex: number) => {
    setOption(optionIndex);
  };

  const handleShowModal = (decision: boolean) => {
    setShowModal(decision);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen w-screen max-h-screen max-w-screen overscroll-none gap-6 md:gap-2">
      {showModal && <RemoveAccessModal handleShowModal={handleShowModal} />}
      <div className="hidden md:flex">
        <RemoveAccessButton handleShowModal={handleShowModal} />
      </div>

      <Navigation
        activeOption={option}
        handleOptionChange={handleOptionChange}
        handleShowModal={handleShowModal}
      />
      <ReviewContentContainer selectedOption={option} />
    </div>
  );
};

export default ReviewPage;
