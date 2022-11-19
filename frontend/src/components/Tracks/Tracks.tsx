import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import fetchTracks from "./hooks/fetchTracks";
import TrackList from "./TracksList";

enum SearchRange {
    SHORT_TERM = "short_term",
    MEDIUM_TERM = "medium_term",
    LONG_TERM = "long_term",
}

interface TopTrackRanges {
    shortTerm?: SpotifyApi.UsersTopTracksResponse;
    mediumTerm?: SpotifyApi.UsersTopTracksResponse;
    longTerm?: SpotifyApi.UsersTopTracksResponse;
}

const Songs = () => {
    const topTracks: TopTrackRanges = {
        shortTerm: fetchTracks(SearchRange.SHORT_TERM),
        mediumTerm: fetchTracks(SearchRange.MEDIUM_TERM),
        longTerm: fetchTracks(SearchRange.LONG_TERM),
    };
    const [trackList, setTrackList] =
        useState<SpotifyApi.UsersTopTracksResponse>();

    const [toggleTracks, setToggleTracks] = useState<boolean>(true);
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
                        onClick={() => setToggleTracks(!toggleTracks)}
                    >
                        {toggleTracks ? "Hide" : "Show"}
                    </h3>
                </button>
            </div>
            {toggleTracks && (
                <div>
                    <div className="text-2xl flex items-center justify-between py-4">
                        <button
                            className={
                                trackList === topTracks.shortTerm
                                    ? "underline underline-offset-2"
                                    : "text-slate-400 transform hover:scale-[1.05] transition-all"
                            }
                            onClick={() => setTrackList(topTracks.shortTerm)}
                        >
                            Last Month
                        </button>
                        <button
                            className={
                                trackList === topTracks.mediumTerm
                                    ? "underline underline-offset-2"
                                    : "text-slate-400 transform hover:scale-[1.05] transition-all"
                            }
                            onClick={() => setTrackList(topTracks.mediumTerm)}
                        >
                            Last 6 Months
                        </button>
                        <button
                            className={
                                trackList === topTracks.longTerm
                                    ? "underline underline-offset-2"
                                    : "text-slate-400 transform hover:scale-[1.05] transition-all"
                            }
                            onClick={() => setTrackList(topTracks.longTerm)}
                        >
                            All Time
                        </button>
                    </div>
                    {trackList && <TrackList response={trackList} />}
                </div>
            )}
        </div>
    );
};

export default Songs;
