import { Favourites } from "@/app/global";
import RefreshSongsButton from "./buttons/RefreshSongsButton";
import RefreshToken from "@/app/containers/access/components/RefreshTokenButton";

type Props = {
  title: string;
  description: string;
  contentType: number;
  handleRefresh: () => void;
};

const ReviewHeader = ({
  title,
  description,
  contentType,
  handleRefresh,
}: Props) => {
  const { RECENT } = Favourites;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl text-white font-semibold">{title}</p>
        <p className="text-lg">{description}</p>
      </div>

      {contentType === RECENT && <RefreshSongsButton onClick={handleRefresh} />}
    </div>
  );
};

export default ReviewHeader;
