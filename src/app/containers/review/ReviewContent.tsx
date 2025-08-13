import { Favourites, GlobalValues } from "@/app/global";
import Fetching from "@/app/components/Fetching";
import ReviewHeader from "./components/ReviewHeader";
import ReviewArtists from "./container/ReviewArtists";
import ReviewSongs from "./container/ReviewSongs";
import ReviewError from "@/app/components/ReviewError";
import SeeMoreButton from "./components/buttons/SeeMoreButton";
import { ReviewInterface, ArtistType, SongType } from "@/app/types/ReviewTypes";

type Props = {
  isLoading: boolean;
  isError: boolean;
  review: ReviewInterface | null;
  selectedOption: number;
  selectedPeriod: "short" | "medium" | "long";
  onPeriodChange: (period: "short" | "medium" | "long") => void;
  seeMoreVisible: Record<number, boolean>;
  handleRefreshSongs: () => void;
  handleSeeMore: () => void;
};

const ReviewContent = ({
  isLoading,
  isError,
  review,
  selectedOption,
  selectedPeriod,
  onPeriodChange,
  seeMoreVisible,
  handleRefreshSongs,
  handleSeeMore,
}: Props) => {
  const { MAX_SONGS, MAX_RECENT } = GlobalValues;
  const { ARTISTS, SONGS } = Favourites;
  const fetchingText =
    selectedOption === ARTISTS
      ? "Fetching Artists"
      : selectedOption === SONGS
      ? "Fetching Songs"
      : "Fetching Recently Played";

  return (
    <div className="h-full w-full sm:w-4/5 flex md:items-center justify-center">
      <div className="bg-green-600 h-3/4 w-[80%] rounded-lg shadow-xs shadow-gray-300 p-4 md:p-6 overflow-hidden">
        {isLoading && <Fetching fetchText={fetchingText} />}
        {isError && <ReviewError text="There is an error" />}

        {!isLoading && review && (
          <div className="h-full flex flex-col gap-2 md:gap-4">
            <ReviewHeader
              title={review.title}
              description={review.description}
              contentType={selectedOption}
              selectedPeriod={selectedPeriod}
              onPeriodChange={onPeriodChange}
              handleRefresh={handleRefreshSongs}
            />
            <div className="flex flex-col gap-4 overflow-y-auto">
              {review.content.map(
                (item: ArtistType | SongType, index: number) => (
                  <div key={index}>
                    {selectedOption === Favourites.ARTISTS ? (
                      <ReviewArtists
                        ranking={index + 1}
                        artistItem={item as ArtistType}
                      />
                    ) : (
                      <ReviewSongs
                        ranking={index + 1}
                        type={
                          selectedOption === Favourites.SONGS
                            ? "song"
                            : "recent"
                        }
                        song={item as SongType}
                      />
                    )}
                  </div>
                )
              )}

              <div className="w-full h-auto flex items-center justify-center">
                {seeMoreVisible[selectedOption] &&
                  review.content.length !== MAX_SONGS &&
                  review.content.length !== MAX_RECENT && (
                    <SeeMoreButton onClick={handleSeeMore} />
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewContent;
