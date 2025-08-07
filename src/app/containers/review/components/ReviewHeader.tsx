import RefreshSongs from "../recentlyPlayed/components/RefreshSongs";
import RefreshToken from "@/app/components/RefreshToken";

type Props = {
  title: string;
  description: string;
  contentType: number;
};

const ReviewHeader = ({ title, description, contentType }: Props) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default ReviewHeader;
