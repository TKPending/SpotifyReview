type Props = {
  question: string;
  answer: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

const QuestionComponent = ({
  question,
  answer,
  index,
  isActive,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className="hover:cursor-pointer h-auto w-full bg-green-600 text-white text-xl p-1 rounded-lg"
    >
      <p className="ml-2 font-semibold">{question}</p>

      {isActive && (
        <div
          className={`flex p-2 mt-4 bg-black h-40 text-green-600 rounded-lg`}
        >
          <p className="text-base ml-2">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
