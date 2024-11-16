import FavouriteContainer from "../components/FavouriteContainer/FavouriteContainer";
import RecentlyPlayed from "../components/RecentPlayedContainer/RecentlyPlayed";
import RemoveAccessButton from "../components/RemoveAccessButton";

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
        <div className="w-full sm:w-4/5 flex items-center justify-center ">
            <RemoveAccessButton />
            <div className="w-full h-full flex sm:items-center justify-center py-4">
                <div className="w-[90%] h-3/4">{content}</div>
            </div>
        </div>
    );
};

export default ReviewContentContainer;
