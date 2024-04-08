import React, { useState, useEffect, useContext, useRef } from "react";
import UseNavbar from "./UseNavbar";
import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { auth, db } from "../../firebase";
import { Search } from "../search/Search";
import ReactSwitch from "react-switch";
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
import axios from "axios";

export const NavBar = ({ tab_group }) => {
  const [search_visible, setSearchVisible] = useState(false);
  const { searchUsers /*search_results*/ } = UseNavbar();
  const [search_value, setSearchValue] = useState("");
  const [search_active, setSearchActive] = useState(false);
  const { user } = useContext(UserContext);
  const [drawer_open, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [tabs, setTab] = useState(tab_group);
  const search_area_ref = useRef(null);

  const [search_results, setSearchResults] = useState([]);

  useEffect(() => {
    document.addEventListener("mousedown", handleSetSearchVisible);
    return () => {
      document.removeEventListener("mousedown", handleSetSearchVisible);
    };
  });

  const handleSetSearchVisible = (e) => {
    if (
      search_area_ref.current &&
      !search_area_ref.current.contains(e.target)
    ) {
      setSearchActive(false);
    }
  };

  const handleSetSearchValue = (value) => {
    // handleSearchUsers();
    setSearchValue(value);

    if (value === "") {
      setSearchResults([]);
    } else {
      axios
        .get("https://quick-api-9c95.onrender.com/users?q=" + value)
        .then((response) => {
          setSearchResults(response.data);
          // console.log(response.data);
        });
    }
  };

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
    tabs.map((tab) => (tab.selected = tab.index === index));
    setTab([...tabs]);
  };

  useEffect(() => {}, [search_value]);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const user_list = await getDocs(collection(db, "users"));

      setUsers(
        await Promise.all(
          user_list.docs.slice(0, 6).map(async (user) => {
            let user_data = user.data();
            user_data.uid = user.id;
            return user_data;
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <NavDrawer open={drawer_open} setOpen={setDrawerOpen} />
      <div
        className={`
        sticky
        flex flex-col
        top-0
        ${search_visible && "h-screen lg:h-auto"}
        shadow-navbar-shadow
        shrink-0
        bg-white
        box-content
        z-20
        `}
      >
        <div
          className="
            flex
            items-stretch
            w-full lg:w-fit h-navbar-height
            mx-auto
            shrink-0
          "
        >
          <div className="flex md:grow md:justify-center xl:justify-start items-center lg:w-[100px] xl:w-[250px]">
            <button
              className="flex items-center justify-center md:hidden h-full pl-3"
              onClick={() => {
                setDrawerOpen(true);
                setSearchVisible(false);
              }}
            >
              <img
                src={user.avatar}
                className="rounded w-10 h-10 bg-black object-contain"
                alt=""
              />
            </button>
            <button
              className="hidden md:flex items-center justify-center px-2 w-full h-full"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src="./quick_combo.png"
                className="hidden xl:block max-w-[170px]"
                alt=""
              />
              <img
                src="./quick_picto.png"
                className="xl:hidden max-h-[30px]"
                alt=""
              />
            </button>
          </div>

          <div className="hidden md:flex md:px-2 w-[580px] max-w-[580px] md:min-w-[580px] box-content">
            {tab_group &&
              tab_group.map((tab) => (
                <NavbarTab
                  key={tab.index}
                  index={tab.index}
                  label={tab.label}
                  callback={(index) => {
                    handleSetTab(index);
                    tab.callback(index);
                  }}
                  selected={tab.selected}
                />
              ))}
          </div>
          <div className="flex items-center justify-center p-2 md:hidden grow">
            {search_visible ? (
              <input
                className="bg-light-gray-2 rounded-full w-full h-full px-4 focus:outline-none"
                type="text"
                value={search_value}
                onChange={(e) => {
                  handleSetSearchValue(e.target.value);
                }}
                placeholder="Quick Search"
              />
            ) : (
              <button
                className="md:hidden h-full flex items-center justify-center"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src="./quick_picto.png" className="h-8" alt="" />
              </button>
            )}
          </div>

          <div className="flex relative justify-end items-center shrink-0 md:w-[300px] md:min-w-[300px] md:max-w-[300px]">
            <span className="relative w-full" ref={search_area_ref}>
              <label className="hidden md:flex items-center bg-light-gray-2 rounded h-9 px-3">
                <FaMagnifyingGlass color="black" className="mr-2" />
                <input
                  value={search_value}
                  onFocus={() => {
                    setSearchActive(true);
                  }}
                  onChange={(e) => {
                    handleSetSearchValue(e.target.value);
                  }}
                  className="grow bg-transparent focus:outline-none"
                  type="text"
                  placeholder="Quick Search"
                />
              </label>
              {search_active && search_results.length > 0 && (
                <div className="absolute hidden md:block left-0 w-full shadow-md bg-light-gray-0">
                  {/* <div className="p-2">
                    Posts containing <i>{search_value}</i>
                  </div> */}
                  <div className="p-2 bg-light-gray-2">People</div>
                  <ul>
                    {search_results.map((user) => {
                      return (
                        <>
                          <li
                            className="text p-2 font-semibold hover:bg-light-gray-2 cursor-pointer dark:hover:bg-quick5 dark:text-white flex"
                            key={user.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                            }}
                            onClick={() => {
                              navigate("/profile?user=" + user.id);
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
                        </>
                      );
                    })}
                  </ul>
                </div>
              )}
            </span>
            <div
              className="flex md:hidden h-full w-10 pr-3 justify-center items-center"
              onClick={() => {
                setSearchVisible(!search_visible);
                if (!search_visible) {
                  handleSetSearchValue("");
                }
              }}
            >
              {search_visible ? (
                <RxCross2 color="black" className="w-6 h-6" />
              ) : (
                <FaMagnifyingGlass color="black" className="w-6 h-6" />
              )}
            </div>

            {/* <button className="" type="button">
              <FaMagnifyingGlass color="white" className="block md:hidden" onClick={() => { setSearchActive(true) }} />
              <BiLogOut color="black" className="hidden md:block" onClick={() => { so() }} />
            </button> */}
          </div>
        </div>
        {!search_visible && tab_group && (
          <div className="flex md:hidden justify-center h-navbar-height bg-white">
            <div className="flex md:px-2 w-[580px] max-w-[580px] md:min-w-[580px]">
              {tab_group.map((tab) => (
                <NavbarTab
                  key={tab.index}
                  index={tab.index}
                  label={tab.label}
                  callback={(index) => {
                    handleSetTab(index);
                    tab.callback(index);
                  }}
                  selected={tab.selected}
                />
              ))}
            </div>
          </div>
        )}
        {search_visible && search_results.length > 0 && (
          <div className="lg:hidden w-full grow shadow-md bg-light-gray-0">
            {/* <div className="p-2">
              Posts containing <i>{search_value}</i>
            </div> */}
            <div className="p-2 bg-light-gray-2">People</div>
            <ul>
              {search_results.map((user) => {
                return (
                  <>
                    <li
                      className="text p-2 font-semibold hover:bg-light-gray-2 cursor-pointer dark:hover:bg-quick5 dark:text-white flex"
                      key={user.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => {
                        navigate("/profile?user=" + user.id);
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
                  </>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
