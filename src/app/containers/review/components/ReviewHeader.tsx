import RefreshSongsButton from "./buttons/RefreshSongsButton";
import RefreshToken from "@/app/containers/access/components/RefreshTokenButton";

type Props = {
  title: string;
  description: string;
  contentType: number;
  handleRefresh: () => void;
};

const RECENTLY_PLAYED: number = 2;

const ReviewHeader = ({
  title,
  description,
  contentType,
  handleRefresh,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl">{title}</p>
        <p className="text-lg">{description}</p>
      </div>

      {contentType === RECENTLY_PLAYED && (
        <RefreshSongsButton onClick={handleRefresh} />
      )}
    </div>
  );
};

export default ReviewHeader;
