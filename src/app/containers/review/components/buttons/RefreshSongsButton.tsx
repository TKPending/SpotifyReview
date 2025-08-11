import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClick: () => void;
};

const RefreshSongsButton = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="text-white cursor-pointer flex flex-col items-center justify-center"
    >
      <FontAwesomeIcon
        icon={faArrowsRotate}
        className="hover:text-green-600 hover:scale-105 transition duration-200 font-semibold p-4 bg-black rounded-lg"
      />
    </div>
  );
};

export default RefreshSongsButton;
