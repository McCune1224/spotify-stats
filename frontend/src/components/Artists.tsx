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
            {artists && artists.items.slice(0, 10).map((artist, i) =>
                <div className="flex bg-slate-200" key={artist.id}>
                    <img className="w-20 h-20 rounded-full" loading="lazy" src={artist.images[0].url} />
                    <p>{i + 1}</p>
                    <p >{artist.name}</p>
                    <p >{artist.genres[0]}</p>
                </div>
            )}
        </div>
    )
}

export default Artists
