import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeSessionStorage } from "../util/sessionStorageHelper";

const RemoveAccessButton = () => {
  const router = useRouter();
  const [popup, setPopup] = useState<boolean>(false);

  const confirmRemoveAccess = () => {
    setPopup(true);
  };

  const handleRemoveAccess = (option: boolean) => {
    if (option) {
        const itemsToRemove: string[] = ["review_stored", "access_token", "code_verifier", "refresh_token", "user", "favouriteSongs", "favouriteArtists", "recentlyPlayed", "review_stored"];

        itemsToRemove.forEach((item: string) => {
            removeSessionStorage(item);
        });

        router.push("/");
    }

    setPopup(false);
  };

  return (
    <div
      className="flex items-center justify-center absolute top-5 right-10"
    >
      <p onClick={confirmRemoveAccess} className="text-white font-semibold p-4 rounded-lg bg-green-600 hover:bg-green-800 transition duration-200 hover:cursor-pointer">
        Remove Access
      </p>

      {popup && (
        <div className="absolute top-16 text-white flex gap-6 transition duration-600">
          <p onClick={() => handleRemoveAccess(true)} className="hover:text-green-300 hover:cursor-pointer hover:underline transition duration-200">Confirm</p>
          <p onClick={() => handleRemoveAccess(false)} className="hover:text-red-200 hover:cursor-pointer hover:underline transition duration-200">Decline</p>
        </div>
      )}
    </div>
  );
};

export default RemoveAccessButton;
