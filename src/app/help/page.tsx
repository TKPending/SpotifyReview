"use client";

import { useState } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { Questions } from "../util/questions";
import Header from "../components/Header";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Header destination="/review" text="Dashboard" />

      <div className="flex flex-col gap-8 pt-[8%] align-center h-screen w-screen">
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <img className="h-32 w-32 rounded-full bg-white" />
          <p className="font-semibold text-2xl text-white">Test</p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-cetner w-full h-600px overscroll-y-auto">
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
      </div>
    </>
  );
};

export default HelpPage;
