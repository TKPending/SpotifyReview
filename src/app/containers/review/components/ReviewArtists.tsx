type Props = {
  artist: any;
};

const ReviewArtists = ({ artist }: Props) => {
  console.log(artist);

  return (
    <div>
      <p>{artist.artist}</p>
    </div>
  );
};

export default ReviewArtists;
