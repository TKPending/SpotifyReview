"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SpotifyClient from "@/app/util/spotifyClient";

const ReviewPage = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken: string = sessionStorage.getItem("access_token") || "";

        if (accessToken == "") {
            router.push("/");
        }

        const fetchData = async () => {
            // const user = await SpotifyClient.getRecentlyPlayed();
            // console.log(user);
        }

        fetchData();
    }, []);

    return (
        <>
        </>
    );
};

export default ReviewPage;