import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../nav_bar/Navbar";
import useAdminTools from "./useAdminTools";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import Bottom_NavBar from "../bottom_navbar/Bottom_NavBar";
import { Profile } from "../profile/Profile";
import { Suggestions } from "../suggestions/Suggestions";
import { Modal } from "../modal/Modal";
import PostPreview from "../post_preview/PostPreview";
import DropdownButton from "../dropdown_button/DropdownButton";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";

export const AdminTools = () => {
  XLSX.set_fs(fs);

  const [selected_post, setSelectedPost] = useState(null);
  const [table_rows, setTableRows] = useState(null);
  const TABLE_HEAD = ["ID", "Author", "Date", "Actions"];
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { flagged_posts } = useAdminTools();
  const [modal, setModal] = useState(null);
  const [show_actions, setShowActions] = useState(false);
  const [tabs, setTabs] = useState([
    {
      index: 0,
      label: "Posts",
      callback: (index) => {
        handleSetSettingTab(index);
      },
      selected: true,
    },
    {
      index: 1,
      label: "Users",
      callback: (index) => {
        handleSetSettingTab(index);
      },
      selected: false,
    },
  ]);

  const handleSetModal = (title, message, callback_function) => {
    setModal(
      <Modal title={title} message={message} callback={callback_function} />
    );
  };

  useEffect(() => {
    if (flagged_posts !== null) {
      setTableRows(flagged_posts);
    }
  }, [flagged_posts]);

  return (
    <>
      {modal !== null && modal}
      <div
        className="
        flex flex-col 
        h-screen
        bg-light-pattern
        dark:bg-quick7
        overflow-y-scroll
      "
      >
        <NavBar tab_group={tabs} />
        {/* w-full lg:w-[1010px] xl:w-[1150px] */}
        <div
          className="
          flex
          grow
          justify-center
          w-full lg:w-fit
          bg-light-gray-0
          mx-auto
        "
        >
          {/* w-[590px] max-w-[590px] md:min-w-[590px] */}

          {/* <Speed_Dial clickHandler={() => { setQtActive(true) }} /> */}
          <div className="hidden md:block grow lg:w-[100px] xl:w-[250px]">
            <Profile name={""} avatar={""} />
          </div>
          <div
            className="
            md:border-x border-light-grey-border
						md:px-2
            box-content
						w-[580px] max-w-[580px] md:min-w-[580px]
					"
          >
            <div
              className="
            h-full
						justify-center md:justify-start lg:justify-center
          "
            >
              {/* <div className='hidden md:block h-screen w-auto bg-gray-400 dark:bg-quick7 p-4 grid grid-cols-1 gap-3 lg:grid-cols-1 lg:p-10 md:grid-cols-1 md:p-10 sm:grid-cols-1 sm:p-10 '> */}
              <div className="dark:bg-quick4 h-full border-x border-light-gray-border p-2">
                <div className="flex justify-between border-b-2 border-dashed border-light-gray-border font-semibold w-full pb-5 text-xl text-black dark:text-white">
                  <p>Flagged & inactive posts</p>
                  <button
                    onClick={() => {
                      // Extract Data (create a workbook object from the table)
                      var ws = XLSX.utils.json_to_sheet(table_rows);
                      var wb = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(wb, ws, "People");
                      XLSX.writeFile(
                        wb,
                        "flagged_and_inactive_posts" +
                          new Date().toISOString() +
                          ".xlsx"
                      );
                    }}
                  >
                    <IoMdDownload />
                  </button>
                </div>
                <div className="w-full gap-5">
                  {
                    table_rows !== null &&
                      table_rows.map((post, i) => (
                        <div
                          key={post.id}
                          className={`cursor-pointer ${
                            !post.active
                              ? "bg-light-error-0 even:bg-light-error-1 hover:bg-light-error-3"
                              : "even:bg-light-gray-1 hover:bg-light-gray-3"
                          } p-2 border-b border-light-gray-border-0`}
                          onClick={() => {
                            setSelectedPost(post);
                          }}
                        >
                          <div className="flex justify-between text-sm text-light-gray-text-0">
                            <span className="flex gap-x-1">
                              <p>{post.id}</p>
                              <p>-</p>
                              <p
                                className="hover:underline"
                                onClick={() => {
                                  navigate("/profile?user=" + post.author.id);
                                }}
                              >
                                {post.author.name}
                              </p>
                            </span>
                            {post.active && (
                              <DropdownButton
                                actions={[
                                  {
                                    action: () => {
                                      handleSetModal(
                                        "Unflag post",
                                        "This will unflag the post for all administrators, are you sure?",
                                        (modal_response) => {
                                          setModal(null);
                                          if (modal_response) {
                                            axios
                                              .post(
                                                `https://quick-api-9c95.onrender.com/administration/unflag/post/${post.id}`,
                                                {},
                                                {
                                                  params: {
                                                    requester_id: user.uid,
                                                  },
                                                }
                                              )
                                              .then((response) => {
                                                if (response.status === 200) {
                                                  const new_tr = [
                                                    ...table_rows,
                                                  ];
                                                  new_tr.splice(
                                                    table_rows.findIndex(
                                                      (e) => e.id === post.id
                                                    ),
                                                    1
                                                  );
                                                  setTableRows(new_tr);
                                                }
                                              });
                                          }
                                        }
                                      );
                                    },
                                    label: "Unflag",
                                  },
                                  {
                                    action: () => {
                                      handleSetModal(
                                        "Deactivate post",
                                        "This will deactivate the post, making it unavailable for all users, are you sure?",
                                        (modal_response) => {
                                          setModal(null);
                                          if (modal_response) {
                                            axios
                                              .post(
                                                `https://quick-api-9c95.onrender.com/administration/post/${post.id}/deactivate`,
                                                {},
                                                {
                                                  params: {
                                                    requester_id: user.uid,
                                                  },
                                                }
                                              )
                                              .then((response) => {
                                                if (response.status === 200) {
                                                  table_rows[i].active = false;
                                                  setTableRows([...table_rows]);
                                                }
                                              });
                                          }
                                        }
                                      );
                                    },
                                    label: "Deactivate",
                                  },
                                ]}
                              />
                            )}
                          </div>
                          <div className="mt-2 ">
                            <p className="text-ellipsis overflow-hidden white-nowrap">
                              {post.content === "" ? (
                                <i>Media only</i>
                              ) : (
                                post.content
                              )}
                            </p>
                          </div>
                          <div className="text-sm text-light-gray-text-0">
                            <p>
                              {new Date(post.date._seconds * 1000).toString()}
                            </p>
                          </div>
                        </div>
                      ))

                    //   <td className="border border-light-gray-0">
                    //     <Typography
                    //       variant="small"
                    //       color="blue-gray"
                    //       className="font-normal text-blue-800 hover:underline cursor-pointer"
                    //       onClick={() => {
                    //         setSelectedPost(post);
                    //       }}
                    //     >
                    //       {post.id}
                    //     </Typography>
                    //   </td>
                    //   <td className="border border-light-gray-0">
                    //     <Typography
                    //       variant="small"
                    //       color="blue-gray"
                    //       className="font-normal hover:underline cursor-pointer"
                    //       onClick={() => {
                    //         navigate("/profile?user=" + post.author.id);
                    //       }}
                    //     >
                    //       {post.author.name}
                    //     </Typography>
                    //   </td>
                    //   <td className="border border-light-gray-0">
                    //     <Typography
                    //       variant="small"
                    //       color="blue-gray"
                    //       className="font-normal"
                    //     >
                    //       {new Date(post.date._seconds * 1000).toString()}
                    //     </Typography>
                    //   </td>
                    //   <td className="border border-light-gray-0">
                    //     {post.active && post.flagged_by.id === user.uid && (
                    //       <Button
                    //         className="bg-yellow-600"
                    //         onClick={() => {
                    //           handleSetModal(
                    //             "This will unflag the post for all administrators, are you sure?",
                    //             () => {
                    //               axios
                    //                 .post(
                    //                   `https://quick-api-9c95.onrender.com/administration/unflag/post/${post.id}`,
                    //                   {},
                    //                   {
                    //                     params: {
                    //                       requester_id: user.uid,
                    //                     },
                    //                   }
                    //                 )
                    //                 .then((response) => {
                    //                   if (response.status === 200) {
                    //                     const new_tr = [...table_rows];
                    //                     new_tr.splice(
                    //                       table_rows.findIndex(
                    //                         (e) => e.id === post.id
                    //                       ),
                    //                       1
                    //                     );
                    //                     setTableRows(new_tr);
                    //                   }
                    //                 });
                    //             }
                    //           );
                    //         }}
                    //       >
                    //         Unflag
                    //       </Button>
                    //     )}
                    //     {post.active && post.flagged_by.id === user.uid && (
                    //       <Button
                    //         className="bg-red-800"
                    //         onClick={() => {
                    //           axios
                    //             .post(
                    //               `https://quick-api-9c95.onrender.com/administration/post/${post.id}/deactivate`
                    //             )
                    //             .then((response) => {
                    //               if (response.status === 200) {
                    //                 console.log(post);
                    //                 // console.log(table_rows.findIndex((e) => (e.id === post.id)))
                    //                 const new_tr = [...table_rows];
                    //                 new_tr[
                    //                   table_rows.findIndex(
                    //                     (e) => e.id === post.id
                    //                   )
                    //                 ].active = false;
                    //                 setTableRows(new_tr);
                    //               }
                    //             });
                    //         }}
                    //       >
                    //         Deactivate
                    //       </Button>
                    //     )}
                    //   </td>
                    // </tr>
                  }
                  {/*
                  <table className="w-full border border-light-gray-0 min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th key={head} className="bg-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table_rows !== null &&
                        table_rows.map((post) => (
                          <tr
                            key={post.id}
                            className={`cursor-pointer ${
                              post.active
                                ? "even:bg-slate-100 hover:bg-slate-200"
                                : "bg-red-100 hover:bg-red-200"
                            }`}
                          >
                            <td className="border border-light-gray-0">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-blue-800 hover:underline cursor-pointer"
                                onClick={() => {
                                  setSelectedPost(post);
                                }}
                              >
                                {post.id}
                              </Typography>
                            </td>
                            <td className="border border-light-gray-0">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal hover:underline cursor-pointer"
                                onClick={() => {
                                  navigate("/profile?user=" + post.author.id);
                                }}
                              >
                                {post.author.name}
                              </Typography>
                            </td>
                            <td className="border border-light-gray-0">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {new Date(post.date._seconds * 1000).toString()}
                              </Typography>
                            </td>
                            <td className="border border-light-gray-0">
                              {post.active &&
                                post.flagged_by.id === user.uid && (
                                  <Button
                                    className="bg-yellow-600"
                                    onClick={() => {
                                      handleSetModal(
                                        "This will unflag the post for all administrators, are you sure?",
                                        () => {
                                          axios
                                            .post(
                                              `https://quick-api-9c95.onrender.com/administration/unflag/post/${post.id}`,
                                              {},
                                              {
                                                params: {
                                                  requester_id: user.uid,
                                                },
                                              }
                                            )
                                            .then((response) => {
                                              if (response.status === 200) {
                                                const new_tr = [...table_rows];
                                                new_tr.splice(
                                                  table_rows.findIndex(
                                                    (e) => e.id === post.id
                                                  ),
                                                  1
                                                );
                                                setTableRows(new_tr);
                                              }
                                            });
                                        }
                                      );
                                    }}
                                  >
                                    Unflag
                                  </Button>
                                )}
                              {post.active &&
                                post.flagged_by.id === user.uid && (
                                  <Button
                                    className="bg-red-800"
                                    onClick={() => {
                                      axios
                                        .post(
                                          `https://quick-api-9c95.onrender.com/administration/post/${post.id}/deactivate`
                                        )
                                        .then((response) => {
                                          if (response.status === 200) {
                                            console.log(post);
                                            // console.log(table_rows.findIndex((e) => (e.id === post.id)))
                                            const new_tr = [...table_rows];
                                            new_tr[
                                              table_rows.findIndex(
                                                (e) => e.id === post.id
                                              )
                                            ].active = false;
                                            setTableRows(new_tr);
                                          }
                                        });
                                    }}
                                  >
                                    Deactivate
                                  </Button>
                                )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                                  */}
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <aside className="w-[300px] min-w-[300px] max-w-[300px]">
            <span className="sticky top-navbar-height">
              <div className="text-xl p-2 font-semibold">Post preview</div>
              <PostPreview post_data={selected_post} />
            </span>
            {/* <Suggestions /> */}
          </aside>
        </div>
        <Bottom_NavBar />
      </div>
    </>
  );
};
