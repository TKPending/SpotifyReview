import { useState, useEffect } from "react";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import NavigationOptions from "./components/NavigationOptions";
import UserProfile from "./components/UserProfile";

type Props = {
  activeOption: number;
  handleOptionChange: (option: number) => void;
};

const Navigation = ({ handleOptionChange, activeOption }: Props) => {
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");

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
      <UserProfile userAvatar={userAvatar} username={username} />

      <NavigationOptions
        activeOption={activeOption}
        handleOptionChange={handleOptionChange}
      />
    </div>
  );
};

export default Navigation;
