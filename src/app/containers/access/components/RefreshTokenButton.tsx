import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Button from "@/app/components/Button";
import { spotifyRefreshToken } from "@/app/api/spotify/auth/spotifyRefreshToken";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";

type Props = {
  setRefreshToken: Dispatch<SetStateAction<boolean>>;
};

const RefreshTokenButton = ({ setRefreshToken }: Props) => {
  const router = useRouter();

  const handleRefreshToken = async () => {
    setRefreshToken(false);
    const refreshedToken = await spotifyRefreshToken();
    if (!refreshedToken) {
      removeSessionStorage("access_token");
      removeSessionStorage("refresh_token");
      router.push("/");
      return;
    }
    setTimeout(() => {
      setRefreshToken(true);
      window.location.reload();
    }, 3000);
  };

  return (
    <Button
      text="RE-AUTHORISE"
      textStyle=""
      className="text-red-200"
      onClick={handleRefreshToken}
    />
  );
};

export default RefreshTokenButton;
