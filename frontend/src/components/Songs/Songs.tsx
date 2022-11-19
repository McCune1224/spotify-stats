import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

interface SpotifyClient {
    api: SpotifyWebApi.SpotifyWebApiJs;
}
const Songs = (props: SpotifyClient) => {
    const SpotifyClient = props.api;

    const [tracks, setTracks] = useState<SpotifyApi.UsersTopTracksResponse>();
    const [showTracks, setShowTracks] = useState<boolean>(true);
    const handleTracksToggle = () => {
        setShowTracks(!showTracks);
    };
    useEffect(() => {
        SpotifyClient.getMyTopTracks().then((rsp) => setTracks(rsp));
    }, []);

    return (
        <div className="py-5">
            <div className="flex justify-between py-3">
                <h3 className="text-white text-4xl">Your Top Tracks</h3>
                <button>
                    <h3
                        className="border-2 border-solid text-white text-4xl transform hover:scale-[1.05] transition-all"
                        onClick={handleTracksToggle}
                    >
                        {showTracks ? "Hide" : "Show"}
                    </h3>
                </button>
            </div>
            {tracks &&
                tracks.items.slice(0, 10).map((track, i) => (
                    <a href={track.uri} target="blank_" key={i}>
                        <div
                            className="justify-between flex transform hover:scale-[1.05] transition-all border-4 p-2 border-double"
                            key={track.id}
                        >
                            <p className="text-2xl py-1 px-1">#{i + 1} </p>
                            <div className="content-center text-center">
                                <p className="text-center text-4xl text-red-100">
                                    {track.name}
                                </p>
                                {track.artists.length > 1 ? (
                                    <p className="text-3xl text-orange-100">
                                        {track.artists.map(
                                            (artist) => artist.name + `, `
                                        )}
                                    </p>
                                ) : (
                                    <p className="text-3xl text-orange-100 ">
                                        {track.artists[0].name}
                                    </p>
                                )}
                            </div>
                            <img
                                className="w-20 h-20 border-2 rounded-full "
                                loading="lazy"
                                src={track.album.images[0].url}
                            />
                        </div>
                    </a>
                ))}
        </div>
    );
};

export default Songs;
