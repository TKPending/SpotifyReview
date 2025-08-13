import { Mic, Music, History } from "lucide-react";

type Props = {
  activeOption: number;
  handleOptionChange: (option: number) => void;
};

const NavigationOptions = ({ activeOption, handleOptionChange }: Props) => {
  const userOptions = [
    { label: "Favourite Artists", icon: <Mic size={20} /> },
    { label: "Favourite Songs", icon: <Music size={20} /> },
    { label: "Recently Played", icon: <History size={20} /> },
  ];

  return (
    <div className="px-4 h-auto lg:mt-8 w-full flex flex-row sm:flex-col items-center justify-center gap-8 md:gap-2">
      {userOptions.map((option, index) => (
        <div key={index} className="mt-6 text-center">
          <button
            onClick={() => handleOptionChange(index)}
            className={`${
              activeOption === index ? "text-white" : "text-green-600"
            } hover:text-green-700 transition duration-300 flex flex-col items-center gap-1`}
          >
            {option.icon}
            <span className="text-[12px] md:text-base lg:text-xl font-semibold">
              {option.label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NavigationOptions;
