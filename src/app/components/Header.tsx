"use client";

import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    
    return (
        <div className="sticky top-0 h-20 w-screen flex items-center justify-end px-32">
            <div onClick={() => router.push("/help")} className="flex items-center justify-center bg-green-600 rounded-2xl h-10 w-auto hover:bg-green-500 cursor-pointer hover:scale-105 transition duration-300">
                <p className="text-white font-semibold px-4">Need Help?</p>
            </div>
        </div>
    )
};

export default Header;