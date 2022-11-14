import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

interface SpotifyClient {
    api: SpotifyWebApi.SpotifyWebApiJs,
}
const Artists = (props: SpotifyClient) => {
    const SpotifyClient = props.api

    const [artists, setArtists] = useState<SpotifyApi.UsersTopArtistsResponse>()
    useEffect(() => {
        SpotifyClient.getMyTopArtists().then((rsp) => setArtists(rsp))

    }, [])

    return (
        <div>
            {artists && artists.items.map((artist) => <p>{artist.name}</p>)}
        </div>
    )
}

export default Artists
