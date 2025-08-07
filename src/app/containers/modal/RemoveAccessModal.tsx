import { useRouter } from "next/navigation";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";
import Button from "@/app/components/Button";

type Props = {
  handleShowModal: (decision: boolean) => void;
};

const CONFIRM: number = 0;

const RemoveAccessModal = ({ handleShowModal }: Props) => {
  const router = useRouter();
  const options: string[] = ["Confirm", "Cancel"];
  const confirmStyle = "bg-green-800";
  const cancelStyle = "bg-red-800";

  const handleRemoveAccess = (decision: number) => {
    if (decision === CONFIRM) {
      const itemsToRemove: string[] = [
        "review_stored",
        "access_token",
        "code_verifier",
        "refresh_token",
        "user",
        "favouriteSongs",
        "favouriteArtists",
        "recentlyPlayed",
        "review_stored",
      ];

      itemsToRemove.forEach((item: string) => {
        removeSessionStorage(item);
      });

      router.push("/");
    }

    handleShowModal(false);
  };

  return (
    <div className="h-screen w-screen absolute left-0 top-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-green-600 h-auto w-auto flex flex-col items-center justify-center gap-12 p-4">
        <div className="text-center flex flex-col gap-2">
          <p>Are you sure you want to remove access?</p>

          <p className="text-xs">
            Removing access, will remove your data from local storage and you'll
            have to re-authorise to gain access to your review
          </p>
        </div>

        <div className="flex gap-4">
          {options.map((option: string, index: number) => (
            <Button
              key={index}
              text={option}
              className={`p-2 rounded-lg text-white transition hover:bg-opacity-80 duration-300 cursor-pointer ${
                index === CONFIRM ? confirmStyle : cancelStyle
              }`}
              onClick={() => handleRemoveAccess(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemoveAccessModal;
