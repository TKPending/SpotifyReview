type Props = {
  activeOption: number;
  handleOptionChange: (option: number) => void;
};

const NavigationOptions = ({ activeOption, handleOptionChange }: Props) => {
  const userOptions: string[] = [
    "Favourite Artists",
    "Favourite Songs",
    "Recently Played",
  ];

  return (
    <div className="px-4 h-auto lg:mt-8 w-full flex flex-row sm:flex-col items-center justify-center gap-2">
      {userOptions.map((option: string, index: number) => (
        <div className="mt-6 text-center">
          <p
            onClick={() => handleOptionChange(index)}
            className={`${
              activeOption === index && "text-white"
            } text-base lg:text-xl font-semibold cursor-pointer text-green-600 hover:text-green-700 transition duration-300 `}
          >
            {option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NavigationOptions;
