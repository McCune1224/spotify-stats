import React from "react";

const Footer = () => {
    return (
        <footer className="text-white font-extralight text-3xl">
            <div className="grid grid-cols-4 text-center">
                <p className="col-span-4 text-xl">
                    Hello! Thanks for viewing my site. Wanna get in touch? Here is
                    a few links to do so! - Alex
                </p>
                <a
                    target="blank_"
                    href="https://www.linkedin.com/in/alexander-mccune"
                    className="hover:bg-blue-700"
                >
                    <i className="fa-brands fa-linkedin-in "></i>
                </a>
                <a
                    target="blank_"
                    href="https://twitter.com/kusaalexm"
                    className="hover:bg-sky-600"
                >
                    <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                    target="blank_"
                    href="https://www.buymeacoffee.com/alexmccuneC"
                    className="hover:bg-yellow-500"
                >
                    <i className="fa-solid fa-mug-hot"></i>
                </a>
                <a
                    target="blank_"
                    href="https://github.com/mcCune1224/"
                    className="hover:bg-zinc-500"
                >
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>
            <p className="text-center text-zinc-400"></p>
        </footer>
    );
};

export default Footer;
("react");
