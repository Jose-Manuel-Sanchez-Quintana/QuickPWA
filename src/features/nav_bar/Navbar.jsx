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
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { BiSolidHome } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
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
import NavDrawer from "../nav_drawer/NavDrawer";

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
      {/* <NavDrawer open={drawer_open} setOpen={setDrawerOpen} /> */}
      {/* <DrawerWithNavigation open={drawer_open} setOpen={setDrawerOpen} className="z-50" /> */}

      {
        // <div className="hidden absolute z-50 w-full h-full bg-quick7">
        //   <div className="flex items-center text-white gap-4">
        //     <FaArrowLeft />
        //     <p>Search</p>
        //   </div>
        //   <div>
        //     <input
        //       type="search"
        //       value={search_value}
        //       className="w-full h-12"
        //       placeholder="Quick search..."
        //       onFocus={() => { setSearchActive(true) }}
        //       onBlur={() => { setSearchActive(false) }}
        //       onChange={(e) => { setSearchValue(e.target.value); searchUsers(e.target.value) }}
        //     />
        //   </div>

        // </div>
      }

      {/* <Search results={search_results} /> */}

      <div className="
          sticky 
          top-0
          border border-b-light-grey-border 
          bg-white h-navbar-height
          shrink-0
        ">
        <div className="
            grid grid-cols-4
            mx-auto
            max-w-[1200px] h-full
          ">

          {/* <div className="px-6"> */}
          {/* <div className="flex"> */}


          {/* {search_value !== "" && search_active && <Search results={search_results} />} */}
          <div className="flex justify-start col-span-1 block md:hidden h-full">
            <button className="h-full" onClick={() => { setDrawerOpen(true) }}>
              <img src={user.avatar} className="rounded-full h-full aspect-square" alt="" />
            </button>
          </div>
          <div className="flex justify-start items-center col-span-1">
            <img src="test.png" alt="" />
          </div>
          {/* <input
            type="search"
            value={search_value}
            className="hidden md:block flex justify-start ml-4 rounded px-3 text-base font-normal text-black col-span-1 h-12"
            placeholder="Quick search..."
            aria-label="Search"
            onFocus={() => { setSearchActive(true) }}
            onBlur={() => { setSearchActive(false) }}
            onChange={(e) => { setSearchValue(e.target.value); searchUsers(e.target.value) }}
          /> */}
          {/* <Search results={search_results} /> */}

          <div className="flex flex col-span-2 h-full">
            <button className="flex items-center px-3 hover:bg-gray-200" type="button"><span className="hidden md:block">For you</span></button>
            <button className="flex items-center px-3 hover:bg-gray-200" type="button"><span className="hidden md:block">Following</span></button>

            {/* <button className="h-full" onClick={() => { navigate('/') }}> */}
            {/* <img src="./Quickk.png" className="h-full"></img> */}
            {/* </button> */}
          </div>
          <div className="flex justify-center items-center col-span-1 h-full bg-blue-200">
            <label className="flex items-center bg-gray-200 rounded w-full">
              <FaMagnifyingGlass color="black" className="mr-2" onClick={() => { setSearchActive(true) }} />
              <input className="grow bg-transparent focus:outline-none" type="text" placeholder="Quick Search" />
            </label>
            {/* <button className="" type="button">
              <FaMagnifyingGlass color="white" className="block md:hidden" onClick={() => { setSearchActive(true) }} />
              <BiLogOut color="black" className="hidden md:block" onClick={() => { so() }} />
            </button> */}
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
