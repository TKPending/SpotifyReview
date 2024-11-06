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
    <div className="flex flex-col items-center gap-4 w-1/5 mt-[4%]">
      <div className="flex flex-col items-center justify-center gap-4">
        <img 
          src={userAvatar} 
          className="h-32 w-32 rounded-full " 
          alt="User Avatar" 
        />
        <p className="text-xl text-gray-300 font-semibold">{username}</p>
      </div>

      <div className="h-auto mt-8 w-full flex flex-col items-center justify-center gap-2">
        {userOptions.map((option: string, index: number) => (
          <div key={index} className="mt-6">
            <p
              onClick={() => handleOptionChange(index)}
              className={`${activeOption === index && "text-white"} text-xl font-semibold transition duration-200 cursor-pointer text-green-600 hover:text-gray-300 hover:text-underline`}
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
