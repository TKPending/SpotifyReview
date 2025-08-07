import Button from "@/app/components/Button";

type Props = {
  handleShowModal: (decision: boolean) => void;
};

const RemoveAccessButton = ({ handleShowModal }: Props) => {
  return (
    <div className="absolute right-4 top-10">
      <Button
        text={"Remove Access"}
        textStyle=""
        className={
          "text-white text-xs font-semibold p-2 bg-green-600 hover:bg-green-800 "
        }
        onClick={() => handleShowModal(true)}
      />
    </div>
  );
};

export default RemoveAccessButton;
