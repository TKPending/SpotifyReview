import { ArtistType } from "@/app/types/ReviewTypes";

type Props = {
  artist: ArtistType;
};

const ReviewArtists = ({ artist }: Props) => {
  return (
    <div>
      <p>{artist.artist}</p>
    </div>
  );
};

export default ReviewArtists;
