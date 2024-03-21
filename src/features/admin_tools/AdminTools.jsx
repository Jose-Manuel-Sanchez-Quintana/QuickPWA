import React, { useContext, useEffect, useState } from 'react'
import { NavBar } from '../nav_bar/Navbar'
import useAdminTools from './useAdminTools'
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../App';
import Bottom_NavBar from '../bottom_navbar/Bottom_NavBar';
import { Profile } from '../profile/Profile';
import { Suggestions } from '../suggestions/Suggestions';
import { Modal } from '../modal/Modal';
import PostPreview from '../post_preview/PostPreview';

export const AdminTools = () => {
  const [selected_post, setSelectedPost] = useState(null)
  const [table_rows, setTableRows] = useState(null)
  const TABLE_HEAD = ['ID', 'Author', 'Date', 'Actions'];
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const {
    flagged_posts
  } = useAdminTools()
  const [tabs, setTabs] = useState([
    {
      index: 0,
      label: 'Posts',
      callback: (index) => { handleSetSettingTab(index) },
      selected: true
    },
    {
      index: 1,
      label: 'Users',
      callback: (index) => { handleSetSettingTab(index) },
      selected: false
    }
  ])

  useEffect(() => {
    if (flagged_posts !== null) {
      setTableRows(flagged_posts)
    }
  }, [flagged_posts])

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
            <Profile name={''} avatar={''} />
          </div>
          <div className="
            md:border-x border-light-grey-border
						md:px-2
            box-content
						w-[580px] max-w-[580px] md:min-w-[580px]
					">
            <div className="
            h-full
						justify-center md:justify-start lg:justify-center
          ">
              {/* <div className='hidden md:block h-screen w-auto bg-gray-400 dark:bg-quick7 p-4 grid grid-cols-1 gap-3 lg:grid-cols-1 lg:p-10 md:grid-cols-1 md:p-10 sm:grid-cols-1 sm:p-10 '> */}
              <div className="dark:bg-quick4 h-full p-2 dark:outline dark:outline-1 dark:outline-quick5">
                <div className="font-semibold w-full mb-7 text-xl text-black dark:text-white">Flagged posts</div>
                <div className="w-full gap-5">
                  <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table_rows !== null && table_rows.map((post) => (
                          <tr key={post.id} className={`cursor-pointer ${post.active ? 'even:bg-slate-100 hover:bg-slate-200' : 'bg-red-100 hover:bg-red-200'}`}>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal text-blue-800 hover:underline cursor-pointer"
                                onClick={() => { setSelectedPost(post) }}
                              >
                                {post.id}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal hover:underline cursor-pointer"
                                onClick={() => { navigate('/profile?user=' + post.author.id) }}
                              >
                                {post.author.name}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {new Date(post.date._seconds * 1000).toString()}
                              </Typography>
                            </td>
                            <td className="p-4">
                              {
                                post.active && post.flagged_by.id === user.uid && <Button className='bg-yellow-600 mr-5'
                                  onClick={() => {
                                    axios.post(`https://quick-api-9c95.onrender.com/administration/unflag/post/${post.id}`, {}, {
                                      params: {
                                        requester_id: user.uid
                                      }
                                    }).then((response) => {
                                      if (response.status === 200) {
                                        const new_tr = [...table_rows]
                                        new_tr.splice(table_rows.findIndex((e) => (e.id === post.id)), 1)
                                        setTableRows(new_tr)
                                      }
                                    })
                                  }}
                                >
                                  Unflag
                                </Button>
                              }
                              {
                                post.active && post.flagged_by.id === user.uid && <Button className='bg-red-800'
                                  onClick={() => {
                                    axios.post(`https://quick-api-9c95.onrender.com/administration/post/${post.id}/deactivate`).then((response) => {
                                      if (response.status === 200) {
                                        console.log(post)
                                        // console.log(table_rows.findIndex((e) => (e.id === post.id)))
                                        const new_tr = [...table_rows]
                                        new_tr[table_rows.findIndex((e) => (e.id === post.id))].active = false
                                        setTableRows(new_tr)
                                      }
                                    })
                                  }}
                                >
                                  Deactivate
                                </Button>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <aside className="w-[300px] min-w-[300px] max-w-[300px] p-2">
            <div className="text-xl font-semibold mb-7">
              Post preview
            </div>
            <PostPreview post_data={selected_post} />

            {/* <Suggestions /> */}
          </aside>
        </div>
        <Bottom_NavBar />
      </div >
    </>
  )
}
