import { useRouter } from "next/navigation";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";
import Button from "@/app/components/Button";
import ModalButtons from "./components/ModalButtons";
import ModalText from "./components/ModalText";
import { GlobalValues } from "@/app/global";

type Props = {
  handleShowModal: (decision: boolean) => void;
};

const RemoveAccessModal = ({ handleShowModal }: Props) => {
  const router = useRouter();
  const { CONFIRM } = GlobalValues;

  const handleRemoveAccess = (decision: number) => {
    if (decision === CONFIRM) {
      const itemsToRemove: string[] = [
        "review_stored",
        "access_token",
        "code_verifier",
        "refresh_token",
        "user",
        "spotifyData",
        "spotifyCache",
      ];

      itemsToRemove.forEach((item: string) => {
        removeSessionStorage(item);
      });

      router.push("/");
    }

    handleShowModal(false);
  };

  return (
    <div className="z-50 h-screen w-screen absolute left-0 top-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-green-600 text-white font-semibold h-[375px] w-[600px] flex flex-col items-center justify-center gap-12 p-4">
        <ModalText />
        <ModalButtons handleRemoveAccess={handleRemoveAccess} />
      </div>
    </div>
  );
};

export default RemoveAccessModal;
