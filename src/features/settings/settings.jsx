import React, { useState, useEffect } from "react";
import { NavBar } from '../nav_bar/Navbar'
import BuyButton from "../buy_button/BuyButton";
import { Switch } from '@material-tailwind/react';

export const Settings = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const element = document.documentElement;

    function onReload() {
        if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark")
        }
    }

    onReload();

    useEffect(() => {
        switch (theme) {
            case 'dark':
                element.classList.add('dark')
                localStorage.setItem('theme', 'dark')
                break;
            case 'light':
                element.classList.remove('dark')
                localStorage.setItem('theme', 'light')
                break;
            default:
                localStorage.removeItem('theme')
                onReload()
                break;
        }
    }, [theme])

    darkQuery.addEventListener("change", (e) => {
        if (!("theme" in localStorage)) {
            if (e.matches) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        }
    })

    const options = [
        {
            icon: "sunny",
            text: "light"
        },
        {
            icon: "moon",
            text: "dark"
        }
    ]
    return (
        <>
            <NavBar />
            <div className='h-screen w-auto bg-gray-400 dark:bg-quick7 p-4 grid grid-cols-1 gap-3 lg:grid-cols-1 lg:p-10 md:grid-cols-1 md:p-10 sm:grid-cols-1 sm:p-10 '>
                <div className=" bg-white dark:bg-quick4 rounded-lg p-4 dark:outline dark:outline-1 dark:outline-quick5">
                    <div className="font-semibold text-xs lg:text-lg md:text-md sm:text-sm text-black dark:text-white w-full">Accessibility</div>
                    <div className="w-full border dark:border-quick5 my-5"></div>
                    <div>
                        <span className='text-black dark:text-white text-xs lg:text-lg md:text-md sm:text-sm'>Dark/Light mode</span>
                        <span className='text-gray-500 dark:text-gray-400 text-xs flex lg:text-lg md:text-md sm:text-sm'>Select the mode you want for the site</span>
                        <span className=" dark:bg-quick4 text-black dark:text-white">
                            {
                                options?.map(opt => (
                                    <button key={opt.text} onClick={() => setTheme(opt.text)} className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${theme === opt.text && "text-green-400"}`}>
                                        <ion-icon name={opt.icon}></ion-icon>
                                    </button>
                                ))
                            }
                        </span>
                    </div>
                    <div className="w-full border dark:border-quick5 my-5"></div>
                    <div className="font-semibold text-black dark:text-white w-full text-xs mb-3 lg:text-lg md:text-md sm:text-sm">Subscriptions</div>
                    <BuyButton />
                    <div className="w-full border dark:border-quick5 my-5"></div>
                </div>
            </div>
        </>
    )
}
