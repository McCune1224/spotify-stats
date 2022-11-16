import React from 'react'

const Login = () => {
    return (
        <div>
            <nav className="pt-4 pb-10 flex items-center justify-between">
                <p className="text-5xl text-white">Spotify-Stats</p>
                <a className="" href={import.meta.env.VITE_OAUTH_URL}>
                    <button
                        className="grid-cols-3 px-2 py-2 text-zinc-900 text-5xl bg-emerald-300 rounded-lg
                hover:bg-emerald-500 active:bg-emerald-600 font-extrabold">
                        <i className="fa-brands fa-spotify px-1"></i>Sign In
                    </ button>
                </a>
            </nav>

            <div className="mt-10 mx-auto sm:mt-12 md:mt-16 lg:mt-20 pb-48 xs:overflow-hidden md:overflow-visible">
                <h1 className="text-3xl mx-auto font-extrabold tracking-tight text-white sm:text-4xl pb-4 sm:pb-4">See your Spotify Stats!</h1>
                <p className="text-2xl text-slate-400">Don't feel like waiting for Spotify wrapped or just curious
                    about your current music insights? Sign in to your Spotify
                    to get discover more about your music tastes!</p>
            </div>


        </div >
    )
}

export default Login
