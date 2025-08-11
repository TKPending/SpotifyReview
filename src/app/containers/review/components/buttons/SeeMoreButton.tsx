import Button from "@/app/components/Button";

type Props = {
  onClick: () => void;
};

const SeeMoreButton = ({ onClick }: Props) => {
  return (
    <Button
      text="See More"
      textStyle="text-green-600 font-semibold text-xl"
      className="bg-black h-16 w-40 mt-4 hover:bg-blue-50 hover:shadow-lg"
      onClick={onClick}
    />
  );
};

export default SeeMoreButton;
