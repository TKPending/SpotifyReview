import FavouriteContainer from "../components/FavouriteContainer/FavouriteContainer";
import RecentlyPlayed from "../components/RecentPlayedContainer/RecentlyPlayed";

type Props = {
    optionIndex: number;
}

const ReviewContentContainer = ({ optionIndex }: Props) => {
    let content;

    switch (optionIndex) {
        case 0:
            content = <FavouriteContainer title="Favourite Artists" />;
            break;
        case 1:
            content = <FavouriteContainer title="Favourite Songs" />;
            break;
        case 2:
            content = <RecentlyPlayed />;
            break;
        default:
            content = <div>No content available.</div>; 
            break;
    }

    return (
        <div className="w-4/5 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-[90%] h-3/4">{content}</div>
            </div>
        </div>
    );
};

export default ReviewContentContainer;
