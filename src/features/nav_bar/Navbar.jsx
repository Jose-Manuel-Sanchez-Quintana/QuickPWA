import React, { useState, useEffect, useContext } from "react";
import UseNavbar from "./UseNavbar";
import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { auth } from "../../firebase";
import { Search } from "../search/Search";
import ReactSwitch from 'react-switch';
import { IoIosSunny } from "react-icons/io";
import { FaCircleUser, FaGear, FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosMoon } from "react-icons/io";
import { IoMdDesktop } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaPaperPlane, FaPortrait } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { UserContext } from "../../App";

function DrawerWithNavigation({ open, setOpen }) {
  // const [open, setOpen] = React.useState(false);
  // const openDrawer = () => setOpen(true);
  // const closeDrawer = () => setOpen(false);
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const so = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Drawer open={open} className="bg-slate-100 dark:bg-slate-800 dark:text-white" onClose={() => { setOpen(false) }}>
        <div className="mb-2 items-center justify-between p-4">
          <div className="p-2 flex flex-col border-b dark:border-quick5 items-center">
            <img className="rounded-full cursor-pointer w-1/2 aspect-square" src={user.avatar} onClick={() => { navigate("/profile?user=" + user.uid) }} />
            <h1 className="flex text-xl font-sembold text-black dark:text-white hover:underline hover:cursor-pointer mt-5" onClick={() => { navigate("/profile?user=" + user.uid) }}>
            </h1>
          </div>
          <Typography variant="h5" className="flex justify-center mt-3" color="blue-gray">
            {user.name}
            {user.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => { navigate('/profile?user=' + user.uid) }}>
            <ListItemPrefix>
              <FaCircleUser />
            </ListItemPrefix>
            Profile
          </ListItem>
          {/* <ListItem onClick={() => { navigate('/admin_tools') }}>
            <ListItemPrefix>
              <AiFillProfile />
            </ListItemPrefix>
            Administrator tools
          </ListItem> */}
          <ListItem onClick={() => { navigate('/settings') }}>
            <ListItemPrefix>
              <FaGear />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={() => { so() }}>
            <ListItemPrefix>
              <BiLogOut />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export const NavBar = () => {
  const { searchUsers, search_results } = UseNavbar();
  const [search_value, setSearchValue] = useState("");
  const [search_active, setSearchActive] = useState(false);
  const { user } = useContext(UserContext)
  const [drawer_open, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const so = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {/* Header */}
      <DrawerWithNavigation open={drawer_open} setOpen={setDrawerOpen} className="z-50" />

      {
        <div className=" hidden absolute z-50 w-full h-full bg-quick7">
          <div className="flex items-center text-white gap-4">
            <FaArrowLeft />
            <p>Search</p>
          </div>
          <div>
            <input
              type="search"
              value={search_value}
              className="w-full h-12"
              placeholder="Quick search..."
              onFocus={() => { setSearchActive(true) }}
              onBlur={() => { setSearchActive(false) }}
              onChange={(e) => { setSearchValue(e.target.value); searchUsers(e.target.value) }}
            />
          </div>

        </div>
      }

      <Search results={search_results} />

      <div className="">
        <div className="grid bg-green-700 text-white text-5xl grid-cols-3 md:grid-cols-3 justify-between items-center p-1 pl-4 pr-4">
          {/* <div className="px-6"> */}
          {/* <div className="flex"> */}


          {/* {search_value !== "" && search_active && <Search results={search_results} />} */}
          <div className="blocl md:hidden col-span-1 h-8 md:h-12 flex justify-start">
            <button className="h-full" onClick={() => { setDrawerOpen(true) }}>
              <img src={user.avatar} className="rounded-full h-full aspect-square" alt="" />
            </button>
          </div>
          <input
            type="search"
            value={search_value}
            className="hidden md:block flex justify-start ml-4 rounded px-3 text-base font-normal text-black col-span-1 h-12"
            placeholder="Quick search..."
            aria-label="Search"
            onFocus={() => { setSearchActive(true) }}
            onBlur={() => { setSearchActive(false) }}
            onChange={(e) => { setSearchValue(e.target.value); searchUsers(e.target.value) }}
          />
          {/* <Search results={search_results} /> */}

          <div className="col-span-1 h-8 md:h-12 ">
            <button className="flex justify-center w-full h-8 md:h-12" onClick={() => { navigate('/') }}>
              <img src="./Quickk.png" className="h-8 md:h-12"></img>
            </button>
          </div>
          {/* Home button */}
          {/* Logout button */}
          <div className="col-span-1 h-8 md:h-12 flex justify-end">
            <button>
              <FaMagnifyingGlass color="white" className="h-full block md:hidden" onClick={() => { setSearchActive(true) }} />
              <BiLogOut color="white" className="hidden md:block" onClick={() => { so() }} />
            </button>
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>

      </div>




      <div class="fixed block md:hidden bottom-0 left-0 z-40 w-full h-12 bg-slate-300 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <button onClick={() => { navigate('/') }} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FaHome className="text-gray-700 dark:text-white" />
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>
          <button onClick={() => { navigate('/dms') }} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FaPaperPlane className="text-gray-700 dark:text-white" />
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>
          {/* <button onClick={() => { navigate('/settings') }} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Settings</span>
          </button> */}
          <button onClick={() => { navigate('profile?user=MGEmILpngZOuVA2Kg5xiOa1qHEM2') }} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FaPortrait className="text-gray-70 dark:text-white" />
            {/* <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span> */}
          </button>
        </div>
      </div>







    </>
  );
};
