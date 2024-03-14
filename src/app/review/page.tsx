"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ReviewPage = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken: string = sessionStorage.getItem("access_token") || "";

        if (accessToken == "") {
            router.push("/");
        }
    }, []);

    return (
        <>
        </>
    );
};

export default ReviewPage;