import React, { useEffect, useState } from "react";

interface Artists {
    response: SpotifyApi.UsersTopArtistsResponse;
}
const ArtistList = (props: Artists) => {
    return (
        <div>
            {props.response.items.map((artist, i) => (
                <a href={artist.external_urls.spotify} target="blank_" key={i}>
                    <div
                        className="justify-between flex transform hover:scale-[1.05] transition-all p-2 bg-zinc-800 border-2"
                        key={artist.id}
                    >
                        <p className="text-2xl ">#{i + 1}</p>
                        <p className="text-center text-4xl text-white ">
                            {artist.name}
                        </p>
                        <img
                            className="w-20 h-20 border-2 rounded-full"
                            loading="lazy"
                            src={artist.images[0].url}
                        />
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ArtistList;
