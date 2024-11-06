import { Dispatch, SetStateAction } from "react";
import { spotifyRefreshToken } from "../util/spotifyAuth/spotify";
import { useRouter } from "next/navigation";

type Props = {
    setRefreshToken: Dispatch<SetStateAction<boolean>>;
}

const RefreshToken = ({setRefreshToken}: Props) => {
    const router = useRouter();

    const handleRefreshToken = async () => {
        setRefreshToken(false);
        const refreshedToken = await spotifyRefreshToken();
        if (!refreshedToken) {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
            router.push("/");
            return;
        };
        
        setTimeout(() => {
          setRefreshToken(true);
          window.location.reload();
        }, 3000);
    }

    return (
        <div onClick={handleRefreshToken} className="hover:scale-105 transition duration-200 text-red-200 cursor-pointer flex items-center justify-center">
            <p className="hover:bg-opacity-80 p-4 bg-black rounded-lg">RE-AUTHORISE</p>
        </div>
    )
};

export default RefreshToken;