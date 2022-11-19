import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SpotifyWebApi from "spotify-web-api-js";

function fetchSongs(searchSpan?: string) {
    const [cookies] = useCookies(["AccessToken"]);
    const spotifyClient = new SpotifyWebApi();
    spotifyClient.setAccessToken(cookies["AccessToken"]);

    const [tracks, setTracks] = useState<SpotifyApi.UsersTopTracksResponse>();
    useEffect(() => {
        searchSpan
            ? spotifyClient
                  .getMyTopTracks({ time_range: searchSpan })
                  .then((rsp) => setTracks(rsp))
            : spotifyClient.getMyTopTracks().then((rsp) => setTracks(rsp));
    }, []);
    return tracks;
}

export default fetchSongs;
