import React from "react";
import Footer from "./Footer";

const Login = () => {
    return (
        <div>
            <nav className="pt-4 pb-10 flex items-center justify-between">
                <p className="text-5xl text-white">
                    <i className="fa-solid fa-magnifying-glass-chart"></i>
                    Spotify-Stats
                </p>
                <a className="" href={import.meta.env.VITE_OAUTH_URL}>
                    <button
                        className="grid-cols-3 px-2 py-2 text-zinc-900 text-5xl bg-green-400 rounded-lg
                hover:bg-green-500 active:bg-green-600 font-extrabold"
                    >
                        <i className="fa-brands fa-spotify px-1"></i>Sign In
                    </button>
                </a>
            </nav>

            <div className="mt-10 mx-auto sm:mt-12 md:mt-16 lg:mt-20 pb-48 xs:overflow-hidden md:overflow-visible">
                <h1 className="text-3xl mx-auto font-extrabold tracking-tight text-white sm:text-4xl pb-4 sm:pb-4">
                    See your Spotify Stats!
                </h1>
                <p className="text-2xl text-slate-400">
                    Don't feel like waiting for Spotify and all the visual fluff
                    wrapped or just curious about your current music insights?
                    Sign in to your Spotify to see a simplistic website to learn
                    about your music tastes!
                </p>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <Footer />
        </div>
    );
};

export default Login;
