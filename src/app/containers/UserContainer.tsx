import { useState, useEffect } from "react";
import { getSessionStorage } from "../util/sessionStorageHelper";

type Props = {
  activeOption: number;
  handleOptionChange: (option: number) => void;
};

const UserContainer = ({ handleOptionChange, activeOption }: Props) => {
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const userOptions: string[] = [
    "Favourite Artists",
    "Favourite Songs",
    "Recently Played",
  ];

  const defaultAvatar = "public/user.png";

  useEffect(() => {
    const user = getSessionStorage("user");
    const userParsed = user ? JSON.parse(user) : null;
    
    const avatar = userParsed?.userAvatar || defaultAvatar;
    const name: string = userParsed?.user || "Undefined";
    setUserAvatar(avatar);
    setUsername(name);
  }, []);

  return (
    <div className="flex flex-col justify-start sm:items-center lg:gap-4 w-full sm:w-1/5 mt-[4%] lg:mt-[5%] sm:mt-[4%]">
      <div className="flex lg:flex-col items-center justify-center gap-4">
        <img 
          src={userAvatar} 
          className="h-20 w-20 lg:h-32 lg:w-32 rounded-full " 
          alt="User Avatar" 
        />
        <p className="text-xl text-gray-300 font-semibold">{username}</p>
      </div>

      <div className="px-4 h-auto lg:mt-8 w-full flex flex-row sm:flex-col items-center justify-center gap-2">
        {userOptions.map((option: string, index: number) => (
          <div key={index} className="mt-6 text-center">
            <p
              onClick={() => handleOptionChange(index)}
              className={`${activeOption === index && "text-white"} text-base lg:text-xl font-semibold transition duration-200 cursor-pointer text-green-600 hover:text-gray-300 hover:text-underline`}
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
