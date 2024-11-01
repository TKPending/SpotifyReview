type Props = {
  handleOptionChange: (option: number) => void;
};

const UserContainer = ({ handleOptionChange }: Props) => {
  // This will controll the content in the ReviewContentContainer
  // const clickedOption: number = useState<number>(0);
  const userOptions: string[] = [
    "Favourite Artists",
    "Favourite Songs",
    "Recently Played",
  ];

  return (
    <div className="w-[20%] h-full flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-white h-32 w-32 rounded-full"></div>
        <p className="text-white">Username</p>
      </div>

      <div className="h-auto mt-8 w-full flex flex-col items-center justify-center gap-2">
        {userOptions.map((option: string, index: number) => (
          <div className="mt-6">
            <p
              key={index}
              onClick={() => handleOptionChange(index)}
              className="text-xl font-semibold transition duration-200 cursor-pointer text-green-600 hover:text-gray-300 hover:text-underline"
            >
              {option}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserContainer;
