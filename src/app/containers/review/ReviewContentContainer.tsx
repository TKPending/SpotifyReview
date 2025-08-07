import RemoveAccessButton from "@/app/components/RemoveAccessButton";

type Props = {
  children: any;
};

const ReviewContentContainer = ({ children }: Props) => {
  return (
    <div className="w-full sm:w-4/5 flex items-center justify-center ">
      <RemoveAccessButton />
      <div className="w-full h-full flex sm:items-center justify-center py-4">
        <div className="w-[90%] h-3/4">{children}</div>
      </div>
    </div>
  );
};

export default ReviewContentContainer;
