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
                <a href={artist.uri} target="blank_" key={i}>
                    <div className="flex transform hover:scale-[1.05] transition-all bg-gradient-to-r p-2 from-[#D8B4FE] to-[#818CF8]" key={artist.id}>
                        <p className="text-2xl ">#{i + 1}</p>
                        <img className="w-20 h-20 rounded-full" loading="lazy" src={artist.images[0].url} />
                        <p className="text-4xl text-white">{artist.name}</p>
                    </div>
                </a>
            )}
        </div>
    )
}

export default Artists
