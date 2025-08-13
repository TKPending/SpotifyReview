import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import LoadingPage from "@/app/pages/LoadingPage";
import { fetchUserData } from "@/app/api/spotify/data/fetchUserData";
import { removeUserAccess } from "@/app/api/spotify/data/removeUserAccess";
import ReviewPage from "@/app/pages/ReviewPage";

const TransitionPage = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;

      let stored;
      if (typeof window !== "undefined") {
        stored = getSessionStorage("review_stored");
      }

      if (!stored) {
        fetchUserData(setPageLoading, setError);
      } else {
        setPageLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      removeUserAccess(router);
    }
  }, [error, router]);

  return (
    <div className="max-h-screen h-screen w-screen overflow-hidden">
      {pageLoading ? <LoadingPage /> : <ReviewPage />}
    </div>
  );
};

export default TransitionPage;
