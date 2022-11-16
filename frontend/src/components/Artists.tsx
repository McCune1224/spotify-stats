import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

interface SpotifyClient {
    api: SpotifyWebApi.SpotifyWebApiJs,
}
const Artists = (props: SpotifyClient) => {
    const SpotifyClient = props.api

    const [artists, setArtists] = useState<SpotifyApi.UsersTopArtistsResponse>()
    const [showArtists, setShowArtists] = useState<boolean>(true)
    const handleArtistToggle = () => {
        setShowArtists(!showArtists)
    }


    useEffect(() => {
        SpotifyClient.getMyTopArtists().then((rsp) => setArtists(rsp))

    }, [])

    return (
        <div className="py-5">
            <div className="flex justify-between py-3">
                <h3 className="text-white text-4xl">Your Top Artists</h3>
                <button>
                    <h3 className="border-2 border-solid text-white text-4xl transform hover:scale-[1.05] transition-all"
                        onClick={handleArtistToggle}>{showArtists ? "Hide" : "Show"}</h3>
                </button>
            </div>
            {artists && artists.items.slice(0, 10).map((artist, i) =>
                <a href={artist.uri} target="blank_" key={i}>
                    <div className="justify-between flex transform hover:scale-[1.05] transition-all border-4 p-2 border-double" key={artist.id}>
                        <p className="text-2xl text-emerald-200">#{i + 1}</p>
                        <p className="text-center text-4xl text-white ">{artist.name}</p>
                        <img className="w-20 h-20 border-2 rounded-full" loading="lazy" src={artist.images[0].url} />
                    </div>
                </a>
            )}
        </div>
    )
}

export default Artists
