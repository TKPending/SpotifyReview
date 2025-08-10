import ArtistImage from "@/app/containers/review/components/artist/ArtistImage";
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
      <ArtistImage imageUrl={image} />

      <ArtistHeader artist={artist} followers={followers} genres={genre} />
    </div>
  );
};

export default ArtistDetails;
