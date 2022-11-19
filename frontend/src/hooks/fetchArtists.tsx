import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SpotifyWebApi from "spotify-web-api-js";

function fetchArtists(searchSpan?: string) {
    const [cookies] = useCookies(["AccessToken"]);
    const spotifyClient = new SpotifyWebApi();
    spotifyClient.setAccessToken(cookies["AccessToken"]);

    const [artists, setArtists] =
        useState<SpotifyApi.UsersTopArtistsResponse>();
    useEffect(() => {
        searchSpan
            ? spotifyClient
                .getMyTopArtists({ time_range: searchSpan })
                .then((rsp) => setArtists(rsp))
            : spotifyClient.getMyTopArtists().then((rsp) => setArtists(rsp));
    }, []);

    return artists;
}

export default fetchArtists;
