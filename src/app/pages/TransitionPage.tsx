import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import LoadingPage from "@/app/pages/LoadingPage";
import { fetchUserData } from "@/app/api/spotify/data/fetchUserData";
import { removeUserAccess } from "@/app/api/spotify/data/removeUserAccess";
import ReviewPage from "@/app/pages/ReviewPage";

const itemsToRemove: string[] = [
  "review_stored",
  "access_token",
  "code_verifier",
  "refresh_token",
];

const TransitionPage = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    removeUserAccess(router, itemsToRemove);
  }, [error]);

  useEffect(() => {
    let stored;
    if (typeof window !== "undefined") {
      stored = getSessionStorage("review_stored");
    }

    if (!stored) {
      fetchUserData(itemsToRemove, setPageLoading, setError);
    } else {
      setPageLoading(false);
    }
  }, []);

  return (
    <div className="max-h-screen h-screen w-screen overflow-hidden">
      {pageLoading ? <LoadingPage /> : <ReviewPage />}
    </div>
  );
};

export default TransitionPage;
