type Props = {
    content: any;
}

const FavouriteArtist = ({content}: Props) => {
    return (
        <a href={content.artist_href}className="text-white text-xl flex">
            <p>{content.artist}</p>
            <p>{content.genre}</p>
            <img src={content.image} className="h-12 w-12"/>
        </a>
    )
};

export default FavouriteArtist;