import Button from "@/app/components/Button";
import { GlobalValues } from "@/app/global";

type Props = {
  handleRemoveAccess: (decision: number) => void;
};

const ModalButtons = ({ handleRemoveAccess }: Props) => {
  const { CONFIRM, CANCEL } = GlobalValues;

  return (
    <div className="flex gap-4 my-6">
      <Button
        text="Confirm"
        textStyle=""
        className="bg-green-800 text-white font-semibold p-2 hover:bg-green-700"
        onClick={() => handleRemoveAccess(CONFIRM)}
      />
      <Button
        text="Cancel"
        textStyle=""
        className="bg-red-800 text-white font-semibold p-2 hover:bg-red-600"
        onClick={() => handleRemoveAccess(CANCEL)}
      />
    </div>
  );
};

export default ModalButtons;
