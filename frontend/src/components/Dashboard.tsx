import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "spotify-web-api-js";
import SpotifyWebApi from "spotify-web-api-js";
import Artists from "./Artists/Artists";
import Footer from "./Footer";
import Tracks from "./Tracks/Tracks";

const Dashboard = (props: any) => {
    const [cookies, setCookie, removeCookie] = useCookies(["AccessToken"]);

    const spoAPI = new SpotifyWebApi();
    spoAPI.setAccessToken(props.token);
    const handleSignOutClick = () => {
        removeCookie("AccessToken");
    };

    const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>();

    useEffect(() => {
        spoAPI.getMe().then((spotifyResponse) => setUser(spotifyResponse));
    }, []);

    return (
        <div>
            <nav className="pt-4 pb-10 flex items-center justify-between">
                <p className="text-5xl text-white">
                    <i className="fa-solid fa-magnifying-glass-chart"></i>
                    Spotify-Stats
                </p>
                <a className="" href="/">
                    <button
                        className="grid-cols-3 px-2 py-2 text-zinc-900 text-5xl bg-green-400 rounded-lg
                hover:bg-green-500 active:bg-green-600 font-extrabold"
                        onClick={handleSignOutClick}
                    >
                        <i className="fa-brands fa-spotify px-1"></i>
                        Sign Out
                    </button>
                </a>
            </nav>

            <div className="flex mt-10 mx-auto sm:mt-12 md:mt-16 lg:mt-20 xs:overflow-hidden md:overflow-visible ">
                <div>
                    <a href={user?.external_urls.spotify} target="blank_">
                        {user?.images && (
                            <img
                                className="w-20 h-auto border-dotted border-2 rounded-full transform hover:scale-[1.05] transition-all"
                                src={user?.images[0].url}
                            />
                        )}
                    </a>
                </div>
                <div className="px-3 ">
                    {user && (
                        <p className="text-5xl font-bold text-white">
                            {user?.display_name}
                        </p>
                    )}
                    {user && (
                        <p className="text-3xl font-extrabold text-slate-400">
                            {user?.followers?.total} Followers
                        </p>
                    )}
                </div>
            </div>

            <Artists />
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <Tracks />
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <Footer />
        </div>
    );
};

export default Dashboard;
