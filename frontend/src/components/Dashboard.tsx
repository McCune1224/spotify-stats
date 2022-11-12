import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import 'spotify-web-api-js'
import SpotifyWebApi from 'spotify-web-api-js'


const Dashboard = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(["AccessToken"]);
    const spoAPI = new SpotifyWebApi()
    spoAPI.setAccessToken(props.token)

    const handleSignOutClick = () => {
        removeCookie("AccessToken")
    }

    const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>()

    useEffect(() => {
        spoAPI.getMe().then((spotifyResponse) => setUser(spotifyResponse))
    }, [])




    return (
        <div>
            <nav className="flex">
                <a className="px-5 " href="/">
                    <button
                        className="text-zinc-900 text-5xl bg-emerald-300 rounded-lg py-2 
                hover:bg-emerald-500 active:bg-emerald-600 flex-auto "
                        onClick={handleSignOutClick} >
                        <i className="fa-brands fa-spotify"></i>
                        Sign Out
                    </ button></a>
            </nav>

            <p className="text-white">Hello {user?.display_name}!</p>

        </div>
    )
}

export default Dashboard
