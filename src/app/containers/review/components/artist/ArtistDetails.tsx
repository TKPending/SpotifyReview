import ReviewItemImage from "@/app/containers/review/components/ReviewItemImage";
import ArtistHeader from "@/app/containers/review/components/artist/ArtistHeader";

type Props = {
  image: string;
  artist: string;
  followers: number;
  genre: string[];
};

const ArtistDetails = ({ image, artist, followers, genre }: Props) => {
  return (
    <div className="flex gap-4">
      <ReviewItemImage imageUrl={image} className="h-16 w-16 md:h-40 md:w-40" />

      <ArtistHeader artist={artist} followers={followers} genres={genre} />
    </div>
  );
};

export default ArtistDetails;
