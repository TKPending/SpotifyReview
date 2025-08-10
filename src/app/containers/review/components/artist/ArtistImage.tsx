type Props = {
  imageUrl: string;
};

const ArtistImage = ({ imageUrl }: Props) => {
  return (
    <div className="rounded-lg h-32 w-32">
      <img src={imageUrl} className="h-full w-full object-cover" />
    </div>
  );
};

export default ArtistImage;
