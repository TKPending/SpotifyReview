"use client";

type Favourites = {
    title: string;
    data: any;
}

const FavouriteContainer = ({title, data}: Favourites) => {
    return (
        <div className="w-2/5 bg-green-600 h-auto">
            <div className="h-32 w-full">
                <p>{title}</p>
            </div>
        </div>
    )
};

export default FavouriteContainer;