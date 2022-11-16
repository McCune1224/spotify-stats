import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import 'spotify-web-api-js'
import SpotifyWebApi from 'spotify-web-api-js'
import Artists from './Artists';
import Songs from './Songs';


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
            <nav className="pt-4 pb-10 flex items-center justify-between">
                <p className="text-5xl text-white">Spotify-Stats</p>
                <a className="" href="/">
                    <button
                        className="grid-cols-3 px-2 py-2 text-zinc-900 text-5xl bg-emerald-300 rounded-lg
                hover:bg-emerald-500 active:bg-emerald-600 font-extrabold"
                        onClick={handleSignOutClick} >
                        <i className="fa-brands fa-spotify px-1"></i>
                        Sign Out
                    </ button></a>
            </nav>

            <div className="flex mt-10 mx-auto sm:mt-12 md:mt-16 lg:mt-20 xs:overflow-hidden md:overflow-visible ">
                <div>
                    <a href={user?.uri} target="blank_">
                        {user?.images &&
                            <img className="w-20 h-auto border-dotted border-2 rounded-full transform hover:scale-[1.05] transition-all" src={user?.images[0].url} />}
                    </a>
                </div>
                <div className="px-3 ">
                    {user && <p className="text-5xl font-extrabold text-white">{user?.display_name}</p>}
                    {user && <p className="text-3xl font-extrabold text-slate-400">{user?.followers?.total} Followers</p>}
                </div>
            </div>

            <Artists api={spoAPI} />
            <Songs api={spoAPI} />

        </div>
    )
}

export default Dashboard
