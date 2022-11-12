import React, { useEffect, useState } from 'react'
import 'spotify-web-api-js'
import SpotifyWebApi from 'spotify-web-api-js'

const Dashboard = (props) => {
    const spoAPI = new SpotifyWebApi()
    spoAPI.setAccessToken(props.token)


    const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>()

    useEffect(() => {
        spoAPI.getMe().then((spotifyResponse) => setUser(spotifyResponse))
    }, [])




    return (
        <div className="text-white"><p>Hello {user?.display_name}!</p></div>
    )
}

export default Dashboard
