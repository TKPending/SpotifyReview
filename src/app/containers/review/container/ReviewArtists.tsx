import ArtistDetails from "@/app/containers/review/components/artist/ArtistDetails";
import Ranking from "../components/Ranking";
import { ArtistType } from "@/app/types/ReviewTypes";

type Props = {
  ranking: number;
  artistItem: ArtistType;
};

const ReviewArtists = ({ ranking, artistItem }: Props) => {
  const { artist, artistHref, followers, genre, image } = artistItem;

  return (
    <a href={artistHref}>
      <div className="relative flex items-center justify-between bg-black h-auto w-full rounded-lg p-4 pr-6 hover:bg-opacity-90">
        {/* Artist */}
        <ArtistDetails
          image={image}
          artist={artist}
          followers={followers}
          genre={genre}
        />

        <Ranking ranking={ranking} />
      </div>
    </a>
  );
};

export default ReviewArtists;
