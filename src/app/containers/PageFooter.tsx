"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const PageFooter = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-between px-[8%]">
            <p className="text-white text-xs">Created by Tony K.</p>
            <a href="https://github.com/TKPending/SpotifyReview" target="_blank">
            <FontAwesomeIcon icon={faGithub} className='text-xl cursor-pointer hover:text-green-600 text-white' />
            </a>
        </div>
    )
};

export default PageFooter;
