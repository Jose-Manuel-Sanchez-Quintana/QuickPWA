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
import { RxCross2 } from "react-icons/rx";

export const NavBar = () => {
  const [search_visible, setSearchVisible] = useState(false)
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
      <NavDrawer open={drawer_open} setOpen={setDrawerOpen} />
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
          flex flex-col
          top-0
          shadow-navbar-shadow
          bg-white 
          shrink-0
          box-content
        ">
        <div className="
            flex
            items-stretch
            w-full lg:w-fit h-navbar-height
            mx-auto
          ">

          {/* <div className="px-6"> */}
          {/* <div className="flex"> */}


          {/* {search_value !== "" && search_active && <Search results={search_results} />} */}
          <div className="flex md:grow md:justify-center xl:justify-start items-center md:px-2 md:px-0 lg:w-[100px] xl:w-[250px]">
            <button className="flex items-center justify-center md:hidden h-full pl-3" onClick={() => { setDrawerOpen(true); setSearchVisible(false) }}>
              <img src={user.avatar} className="rounded w-10 h-10 bg-black object-contain" alt="" />
            </button>
            <button className="hidden md:block" onClick={() => { setDrawerOpen(true) }}>
              <img src="./test.png" alt="" />
            </button>
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

          <div className="hidden md:flex md:px-2 w-[580px] max-w-[580px] md:min-w-[580px] box-content">
            <button className="flex items-center px-3 hover:bg-gray-200" type="button"><span>For you</span></button>
            <button className="flex items-center px-3 hover:bg-gray-200" type="button"><span>Following</span></button>
          </div>
          <div className="flex items-center justify-center p-2 md:hidden grow">
            {
              search_visible ?
                <input className="bg-gray-200 rounded-full w-full h-full px-4 focus:outline-none" type="text" placeholder="Quick Search" />
                :
                <div className="md:hidden">
                  <img src="./test.png" alt="" />
                </div>
            }
          </div>

          <div className="flex justify-end items-center shrink-0 md:w-[300px] md:min-w-[300px] md:max-w-[300px]">
            <label className="hidden lg:flex items-center bg-gray-200 rounded w-full h-9 px-3">
              <FaMagnifyingGlass color="black" className="mr-2" onClick={() => { setSearchActive(true) }} />
              <input className="grow bg-transparent focus:outline-none" type="text" placeholder="Quick Search" />
            </label>
            <div className="flex lg:hidden h-full w-10 pr-3 justify-center items-center" onClick={() => { setSearchVisible(!search_visible) }}>
              {
                search_visible ?
                  <RxCross2 color="black" className="w-6 h-6" />
                  :
                  <FaMagnifyingGlass color="black" className="w-6 h-6" />
              }
            </div>

            {/* <button className="" type="button">
              <FaMagnifyingGlass color="white" className="block md:hidden" onClick={() => { setSearchActive(true) }} />
              <BiLogOut color="black" className="hidden md:block" onClick={() => { so() }} />
            </button> */}
          </div>
        </div>
        <div className="flex md:hidden justify-center h-navbar-height">
          <div className="flex md:px-2 w-[580px] max-w-[580px] md:min-w-[580px]">
            <button className="flex items-center px-3 hover:bg-gray-200" type="button"><span>For you</span></button>
            <button className="flex items-center px-3 hover:bg-gray-200" type="button"><span>Following</span></button>
          </div>
        </div>
      </div>
    </>
  );
};
