import React, { useState, useEffect } from "react";
import { NavBar } from '../nav_bar/Navbar'
import BuyButton from "../buy_button/BuyButton";
import { Switch } from '@material-tailwind/react';
import { Profile } from "../profile/Profile";
import { Suggestions } from "../suggestions/Suggestions";
import Bottom_NavBar from "../bottom_navbar/Bottom_NavBar";
import useHome from "../home/UseHome";
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import { Modal } from "../modal/Modal";
import NavbarTab from "../chat/navbar_tab/NavbarTab";


export const Settings = () => {

	const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
	const { user_name, user_avatar, posts, setPosts, post } = useHome();
	const [setting_tab, setSettingTab] = useState(null)
	const tabs = [
		{
			index: 0,
			label: 'Appearance',
			callback: (index) => { handleSetSettingTab(index) },
			selected: true
		},
		{
			index: 1,
			label: 'Account',
			callback: (index) => { handleSetSettingTab(index) },
			selected: false
		}
	]

	const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const element = document.documentElement;

	const handleSetSettingTab = (index) => {
		// setSettingTab(index)
		switch (index) {
			case 0:
				setSettingTab(<>
					<div className="font-semibold text-md text-black dark:text-white mb-7">Appearance settings</div>
					<div className="font-medium text-md text-black border-b dark:text-white w-full mb-2">Theme</div>
					<div>
						<span className='font-semibold text-black dark:text-white text-sm'>Dark/Light mode</span>
						<span className='flex text-gray-500 dark:text-gray-400 text-sm'>Select the mode you want for the site</span>
						<span className="dark:bg-quick4 text-black dark:text-white ">
							{
								options?.map(opt => (
									<button key={opt.text} onClick={() => setTheme(opt.text)} className={`text-xl rounded-full m-2 ${theme === opt.text && "text-green-700"}`}>
										{opt.icon}
									</button>
								))
							}
						</span>
					</div>
				</>)
				break;
			case 1:
				setSettingTab(<>
					<div className="font-semibold text-md text-black dark:text-white mb-7">Account settings</div>
					<div className="font-medium text-md text-black border-b dark:text-white w-full mb-2">Subscritions</div>
					<BuyButton />
				</>)
		}


	}

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
			icon: <IoIosSunny style={{ width: "24px", height: "24px" }} />,
			text: "light"
		},
		{
			icon: <IoIosMoon style={{ width: "24px", height: "24px" }} />,
			text: "dark"
		}
	]

	useEffect(() => {
		handleSetSettingTab(0)
	}, [])

	return (
		<>
			<Modal />
			<div className="
        flex flex-col 
        h-screen
        bg-light-pattern
        dark:bg-quick7
        overflow-y-scroll
      ">
				<NavBar tab_group={tabs} />
				{/* w-full lg:w-[1010px] xl:w-[1150px] */}
				<div className="
          flex
          grow
          justify-center
          w-full lg:w-fit
          bg-light-gray-0
          mx-auto
        ">

					{/* w-[590px] max-w-[590px] md:min-w-[590px] */}

					{/* <Speed_Dial clickHandler={() => { setQtActive(true) }} /> */}
					<div className="hidden md:block grow lg:w-[100px] xl:w-[250px]">
						<Profile name={user_name} avatar={user_avatar} />
					</div>
					<div className="
            md:border-x border-light-grey-border
						md:px-2
            box-content=
					">
						<div className="
            h-full
						justify-center md:justify-start lg:justify-center
            w-[580px] max-w-[580px] md:min-w-[580px]
            text-xl
						p-2
            md:border-x border-light-grey-border
          ">
							{setting_tab}
						</div>
					</div>
					<aside className="hidden md:flex w-[300px] min-w-[300px] max-w-[300px]">
						<Suggestions />
					</aside>
				</div>
				<Bottom_NavBar />
			</div >

		</>
	)
}
