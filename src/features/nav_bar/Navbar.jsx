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
      <NavDrawer open={drawer_open} setOpen={setDrawerOpen} />
      {/* <DrawerWithNavigation open={drawer_open} setOpen={setDrawerOpen} className="z-50" /> */}

      {
        <div className="hidden absolute z-50 w-full h-full bg-quick7">
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

      <div className="sticky top-0">
        <div className="grid bg-green-700 text-white text-5xl grid-cols-3 md:grid-cols-3 justify-between items-center p-1 pl-10 pr-10">
          {/* <div className="px-6"> */}
          {/* <div className="flex"> */}


          {/* {search_value !== "" && search_active && <Search results={search_results} />} */}
          <div className="blocl md:hidden col-span-1 h-8 md:h-12 flex justify-start">
            <button className="h-full" onClick={() => { setDrawerOpen(true) }}>
              <img src={user.avatar} className="rounded-full h-full aspect-square" alt="" />
            </button>
          </div>
          <div>
            <button type="button"><BiSolidHome /></button>
            <button type="button"><BsBellFill /></button>
            <button type="button"><BiSolidMessageRoundedDetail /></button>
            <button type="button"><BsPersonFill /></button>
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
    </>
  );
};
