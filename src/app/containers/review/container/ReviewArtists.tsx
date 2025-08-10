import { ArtistType } from "@/app/types/ReviewTypes";
import ArtistImage from "@/app/containers/review/components/artist/ArtistImage";
import ArtistHeader from "@/app/containers/review/components/artist/ArtistHeader";

type Props = {
  artistItem: ArtistType;
};

const ReviewArtists = ({ artistItem }: Props) => {
  const { artist, artistHref, followers, genre, image } = artistItem;

  return (
    <a href={artistHref}>
      <div className="bg-black h-auto w-full rounded-lg p-4">
        {/* Artist */}
        <div className="flex gap-4">
          <ArtistImage imageUrl={image} />

          <ArtistHeader artist={artist} followers={followers} genres={genre} />
        </div>
      </div>
    </a>
  );
};

export default ReviewArtists;
