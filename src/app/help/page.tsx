"use client";

import { useState } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { Questions } from "../util/questions";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-4 pt-[5%] align-center h-screen w-screen">
      {Questions.map((question, index: number) => (
        <div key={index} className="h-auto w-1/2 mx-auto">
          <QuestionComponent
            question={question.question}
            answer={question.answer}
            index={index}
            isActive={activeIndex === index}
            onClick={() => handleQuestionClick(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default HelpPage;
