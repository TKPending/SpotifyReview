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
      className="h-auto w-full bg-green-600 text-white text-2xl font-semibold p-4 rounded-lg"
    >
      <p>{question}</p>

      {isActive && (
        <div
          className={`flex items-center mt-4 bg-black h-40 text-green-600 p-4 rounded-lg`}
        >
          <p className="text-xl">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
