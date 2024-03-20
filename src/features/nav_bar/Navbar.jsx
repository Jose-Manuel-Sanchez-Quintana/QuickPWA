import React, { useState, useEffect, useContext } from "react";
import UseNavbar from "./UseNavbar";
import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { auth, db } from "../../firebase";
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
import NavbarTab from "../chat/navbar_tab/NavbarTab";
import { Modal } from "../modal/Modal";
import { collection, getDocs } from "firebase/firestore";

export const NavBar = ({ tab_group }) => {
  const [search_visible, setSearchVisible] = useState(false)
  const { searchUsers, search_results } = UseNavbar();
  const [search_value, setSearchValue] = useState('');
  const [search_active, setSearchActive] = useState(false);
  const { user } = useContext(UserContext)
  const [drawer_open, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const [tabs, setTab] = useState(tab_group)

  const so = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleSetTab = (index) => {
    tabs.map((tab) => (
      tab.selected = tab.index === index
    ))
    setTab([...tabs])
  }

  useEffect(() => {

  }, [search_value])






  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const user_list = await getDocs(collection(db, "users"));

      setUsers(await Promise.all(
        user_list.docs.slice(0, 6).map(async (user) => {
          let user_data = user.data();
          user_data.uid = user.id;
          return user_data;
        })
      ));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <NavDrawer open={drawer_open} setOpen={setDrawerOpen} />
      <div className={`
        sticky
        flex flex-col
        top-0
        ${search_visible && 'h-screen lg:h-auto'}
        shadow-navbar-shadow
        shrink-0
        bg-white
        box-content
        z-20
        `}>
        <div className="
            flex
            items-stretch
            w-full lg:w-fit h-navbar-height
            mx-auto
            shrink-0
          ">

          <div className="flex md:grow md:justify-center xl:justify-start items-center md:px-2 md:px-0 lg:w-[100px] xl:w-[250px]">
            <button className="flex items-center justify-center md:hidden h-full pl-3" onClick={() => { setDrawerOpen(true); setSearchVisible(false) }}>
              <img src={user.avatar} className="rounded w-10 h-10 bg-black object-contain" alt="" />
            </button>
            <button className="hidden md:block" onClick={() => { navigate('/') }}>
              <img src="./test.png" alt="" />
            </button>
          </div>

          <div className="hidden md:flex md:px-2 w-[580px] max-w-[580px] md:min-w-[580px] box-content">
            {
              tab_group && tab_group.map((tab) => (
                <NavbarTab
                  key={tab.index}
                  index={tab.index}
                  label={tab.label}
                  callback={(index) => { handleSetTab(index); tab.callback(index) }}
                  selected={tab.selected}
                />
              ))
            }
          </div>
          <div className="flex items-center justify-center p-2 md:hidden grow">
            {
              search_visible ?
                <input
                  className="bg-gray-200 rounded-full w-full h-full px-4 focus:outline-none"
                  type="text" value={search_value} onChange={(e) => { setSearchValue(e.target.value) }} placeholder="Quick Search" />
                :
                <button className="md:hidden" type="button" onClick={() => { navigate('/') }}>
                  <img src="./test.png" alt="" />
                </button>
            }
          </div>

          <div className="flex relative justify-end items-center shrink-0 md:w-[300px] md:min-w-[300px] md:max-w-[300px]">
            <span className="relative w-full">
              <label className="hidden lg:flex items-center bg-gray-200 rounded h-9 px-3">
                <FaMagnifyingGlass color="black" className="mr-2" onClick={() => { setSearchActive(true) }} />
                <input
                  onFocus={() => { setSearchActive(true) }}
                  onBlur={() => { setSearchActive(false) }}
                  className="grow bg-transparent focus:outline-none" type="text" placeholder="Quick Search"
                />
              </label>
              {
                search_active &&
                <div className="absolute hidden lg:block left-0 w-full shadow-md bg-light-gray-0">
                  <div className="p-2">
                    Posts containing <i>aaaa</i>
                  </div>
                  <div className="p-2 bg-gray-300">
                    People
                  </div>
                  <ul>
                    {
                      users.map((user) => {
                        return (<>
                          <li
                            className="text p-2 font-semibold hover:bg-gray-200 cursor-pointer dark:hover:bg-quick5 dark:text-white flex"
                            key={user.uid}
                            onMouseDown={(e) => { e.preventDefault() }}
                            onClick={() => {
                              navigate("/profile?user=" + user.uid);
                              window.location.reload();
                            }}
                          >
                            <div>
                              <img
                                className="w-10 h-10 rounded mr-2"
                                src={user.avatar}
                                alt="Imagen de user"
                              />
                            </div>
                            <div className="h-fit">{user.name}</div>
                          </li>
                        </>)
                      })
                    }
                  </ul>
                </div>
              }
            </span>
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
        {
          !search_visible &&
          <div className="flex md:hidden justify-center h-navbar-height bg-white">
            <div className="flex md:px-2 w-[580px] max-w-[580px] md:min-w-[580px]">
              {
                tab_group && tab_group.map((tab) => (
                  <NavbarTab
                    key={tab.index}
                    index={tab.index}
                    label={tab.label}
                    callback={(index) => { handleSetTab(index); tab.callback(index) }}
                    selected={tab.selected}
                  />
                ))
              }
            </div>
          </div>
        }
        {
          search_visible &&
          <div className="lg:hidden w-full grow shadow-md bg-light-gray-0">
            <div className="p-2">
              Posts containing <i>aaaa</i>
            </div>
            <div className="p-2 bg-gray-300">
              People
            </div>
            <ul>
              {
                users.map((user) => {
                  return (<>
                    <li
                      className="text p-2 font-semibold hover:bg-gray-200 cursor-pointer dark:hover:bg-quick5 dark:text-white flex"
                      key={user.uid}
                      onMouseDown={(e) => { e.preventDefault() }}
                      onClick={() => {
                        navigate("/profile?user=" + user.uid);
                        window.location.reload();
                      }}
                    >
                      <div>
                        <img
                          className="w-10 h-10 rounded mr-2"
                          src={user.avatar}
                          alt="Imagen de user"
                        />
                      </div>
                      <div className="h-fit">{user.name}</div>
                    </li>
                  </>)
                })
              }
            </ul>
          </div>
        }
      </div>
    </>
  );
};
