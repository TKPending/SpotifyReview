type Props = {
  content: any;
};

const FavouriteArtist = ({ content }: Props) => {
  return (
    <a
      href={content.artist_href}
      className="h-full p-8 rounded-lg text-white text-xl flex bg-black hover:bg-opacity-80"
    >
      <div className="flex-1 p-4">
        <p className="text-xl font-semibold">{content.artist}</p>
        <p className="opacity-80">{content.genre}</p>
      </div>
      <img src={content.image} className="h-32 w-32 rounde-lg" />
    </a>
  );
};

export default FavouriteArtist;
