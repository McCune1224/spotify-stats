import React, { startTransition, useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import fetchArtists from "./hooks/fetchArtists";
import ArtistList from "./ArtistList";
import SpotifyWebApi from "spotify-web-api-js";

enum SearchRange {
    SHORT_TERM = "short_term",
    MEDIUM_TERM = "medium_term",
    LONG_TERM = "long_term",
}

interface TopArtistRanges {
    shortTerm?: SpotifyApi.UsersTopArtistsResponse;
    mediumTerm?: SpotifyApi.UsersTopArtistsResponse;
    longTerm?: SpotifyApi.UsersTopArtistsResponse;
}

const Artists = () => {
    const topArtists: TopArtistRanges = {
        shortTerm: fetchArtists(SearchRange.SHORT_TERM),
        mediumTerm: fetchArtists(SearchRange.MEDIUM_TERM),
        longTerm: fetchArtists(SearchRange.LONG_TERM),
    };

    const [artistList, setArtistList] =
        useState<SpotifyApi.UsersTopArtistsResponse>();

    const [toggleArtists, setToggleArtists] = useState<boolean>(true);
    const parent = useRef(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    return (
        <div ref={parent} className="text-white py-5">
            <div className="flex justify-between py-7">
                <h3 className="text-white text-4xl">Your Top Artists</h3>
                <button>
                    <h3
                        className="border-2 border-solid text-white 
                        text-4xl transform hover:scale-[1.05] transition-all"
                        onClick={() => setToggleArtists(!toggleArtists)}
                    >
                        {toggleArtists ? "Hide" : "Show"}
                    </h3>
                </button>
            </div>
            {toggleArtists && (
                <div>
                    <div className="text-2xl flex items-center justify-between py-4">
                        <button
                            className={
                                artistList === topArtists.shortTerm
                                    ? "underline underline-offset-2"
                                    : "text-slate-400 transform hover:scale-[1.05] transition-all"
                            }
                            onClick={() => setArtistList(topArtists.shortTerm)}
                        >
                            Last Month
                        </button>
                        <button
                            className={
                                artistList === topArtists.mediumTerm
                                    ? "underline underline-offset-2"
                                    : "text-slate-400 transform hover:scale-[1.05] transition-all"
                            }
                            onClick={() => setArtistList(topArtists.mediumTerm)}
                        >
                            Last 6 Months
                        </button>
                        <button
                            className={
                                artistList === topArtists.longTerm
                                    ? "underline underline-offset-2"
                                    : "text-slate-400 transform hover:scale-[1.05] transition-all"
                            }
                            onClick={() => setArtistList(topArtists.longTerm)}
                        >
                            All Time
                        </button>
                    </div>
                    {artistList && <ArtistList response={artistList} />}
                </div>
            )}
        </div>
    );
};

export default Artists;
