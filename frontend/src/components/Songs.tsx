import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

interface SpotifyClient {
    api: SpotifyWebApi.SpotifyWebApiJs,
}
const Songs = (props: SpotifyClient) => {
    const SpotifyClient = props.api

    const [tracks, setArtists] = useState<SpotifyApi.UsersTopTracksResponse>()
    useEffect(() => {
        SpotifyClient.getMyTopTracks().then((rsp) => setArtists(rsp))

    }, [])


    return (
        <div>
            {tracks && tracks.items.slice(0, 10).map((track, i) =>
                <a href={track.uri} target="blank_" key={i}>
                    <div className="grid grid-cols-2 transform hover:scale-[1.05] transition-all border-4 border-double" key={track.id}>
                        <p className="text-2xl py-1 px-1">#{i + 1} <img className="w-20 h-20 border-2 rounded-full" loading="lazy" src={track.album.images[0].url} /></p>
                        <p className="text-4xl text-red-100">{track.name}</p>
                        {track.artists.length > 1 ? <p className="text-2xl text-orange-100">{track.artists.map((artist) => artist.name + `, `)}</p> :
                            <p className="text-2xl text-orange-100">{track.artists[0].name}</p>}
                        <p className="text-2xl text-red-100">{track.album.name}</p>
                    </div>
                </a>
            )}
        </div>
    )
}

export default Songs
