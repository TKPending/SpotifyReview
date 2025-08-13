import { Favourites } from "@/app/global";
import RefreshSongsButton from "./buttons/RefreshSongsButton";
import RefreshToken from "@/app/containers/access/components/RefreshTokenButton";
import ReviewPeriod from "@/app/containers/review/container/ReviewPeriod";

type Props = {
  title: string;
  description: string;
  contentType: number;
  selectedPeriod: "short" | "medium" | "long";
  onPeriodChange: (period: "short" | "medium" | "long") => void;
  handleRefresh: () => void;
};

const ReviewHeader = ({
  title,
  description,
  contentType,
  selectedPeriod,
  onPeriodChange,
  handleRefresh,
}: Props) => {
  const { RECENT } = Favourites;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl text-white font-semibold">{title}</p>
        <p className="text-lg">{description}</p>
        {contentType !== RECENT && (
          <ReviewPeriod
            selectedPeriod={selectedPeriod} // ⬅ Pass down
            onPeriodChange={onPeriodChange}
          />
        )}
      </div>

      {contentType === RECENT && <RefreshSongsButton onClick={handleRefresh} />}
    </div>
  );
};

export default ReviewHeader;
