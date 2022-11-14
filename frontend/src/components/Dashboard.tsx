import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import 'spotify-web-api-js'
import SpotifyWebApi from 'spotify-web-api-js'
import Artists from './Artists';


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




    const pfImage = user?.images[0]
    return (
        <div>
            <nav className="flex">
                <a className="px-5" href="/">
                    <button
                        className="text-zinc-900 text-5xl bg-emerald-300 rounded-lg py-2 
                hover:bg-emerald-500 active:bg-emerald-600 flex-auto "
                        onClick={handleSignOutClick} >
                        <i className="fa-brands fa-spotify"></i>
                        Sign Out
                    </ button></a>
            </nav>

            <div className="flex mt-10 mx-auto sm:mt-12 md:mt-16 lg:mt-20 xs:overflow-hidden md:overflow-visible ">
                {user?.images && <img className="w-20 h-auto rounded-full" src={user?.images[0].url} />}
                <div className="px-3 ">
                    {user && <p className="text-5xl font-extrabold text-white">{user?.display_name}</p>}
                    {user && <p className="text-3xl font-extrabold text-slate-400">{user?.followers?.total} Followers</p>}
                </div>
            </div>
            <Artists api={spoAPI} />


        </div>
    )
}

export default Dashboard
