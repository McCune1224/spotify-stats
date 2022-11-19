import React from "react";

interface Tracks {
    response: SpotifyApi.UsersTopTracksResponse;
}

const TrackList = (props: Tracks) => {
    return (
        <div>
            {props.response.items.slice(0, 10).map((track, i) => (
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

export default TrackList;
