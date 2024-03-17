import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePost from "./usePost";
import { FaSync } from "react-icons/fa";
import { UserContext } from "../../App";
import { Spinner } from "@material-tailwind/react";
import { IoIosFlag } from "react-icons/io";
import axios from "axios";

const relativeDate = (date) => {
	const diff = Math.round((new Date() - new Date(date)) / 1000);
	const minute = 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = day * 30;
	const year = month * 12;

	if (diff < 30) {
		return "Just now";
	} else if (diff < minute) {
		return diff + " seconds ago";
	} else if (diff < 2 * minute) {
		return "A minute ago";
	} else if (diff < hour) {
		return Math.floor(diff / minute) + " minutes ago";
	} else if (Math.floor(diff / hour) === 1) {
		return "1 hour ago";
	} else if (diff < day) {
		return Math.floor(diff / hour) + " hours ago";
	} else if (diff < day * 2) {
		return "1 day ago";
	} else if (diff < week) {
		return Math.floor(diff / day) + " days ago";
	} else if (diff < month) {
		return Math.floor(diff / week) + " weeks ago";
	} else if (diff < year) {
		return Math.floor(diff / month) + " months ago";
	} else {
		////////////////////////////
		return Math.floor(diff / year) + " years ago";
	}
}

export const Post = ({ post, like, repost, unlike, unrepost, profile_user }) => {

	const [updating_likes, setUpdatingLikes] = useState(true);
	const [updating_reposts, setUpdatingReposts] = useState(true);
	//const and var para obtener la fecha de la publicacion
	// const sec = post.date._seconds;
	// const out = new Date(sec * 1000);
	// const time = out.toLocaleString('default');
	const navigate = useNavigate();
	const [search_params] = useSearchParams();
	const [is_flagged, setFlagged] = useState(null)
	const is_repost = post.original_post !== undefined

	const {
		user,
	} = usePost();

	useEffect(() => {
		setUpdatingLikes(false);
	}, [post.liked])

	useEffect(() => {
		console.log(post)
		setUpdatingReposts(false);
	}, [post.reposted])

	useEffect(() => {
		setFlagged(false)
	},)

	return (
		(is_repost || (!is_repost && post.active === true)) &&
		<>
			<div className="
			

				bg-light-white-0 dark:bg-quick4 dark:text-white ">
				<div className="sm:mt-0 sm:text-left break-all w-full">
					{/* Div para la foto de perfil, nombre y numero de followers */}
					<div className="hover:rounded p-3" >
						<span className="flex justify-between">

							<p className="text-xl font-sembold text-slate-400 ml-2 mb-5 hover:underline cursor-pointer" onClick={() => { navigate("/profile?user=" + post.author.id) }}>
								{
									is_repost ?

										post.author.id === user.uid ?
											"You reposted"

											:
											`${post.author.name} reposted`

										:
										""
								}
							</p>
							{
								is_flagged !== null && user.role.indexOf('administrator') !== -1 &&
								<button>
									<IoIosFlag color={is_flagged ? '#facc15' : '#a8a29e'} onClick={() => {
										axios.post(`https://quick-api-9c95.onrender.com/administration/flag/post/${post.id}`, {}, {
											params: { requester_id: user.uid }
										}).then((response) => {
											if (response.status === 200) {
												setFlagged(true)
											}
										})
									}} />
								</button>
							}
						</span>
						<div className="flex justify-between">
							<span className="flex items-center space-x-4">
								{
									is_repost ?
										<img className="w-12 h-12 rounded cursor-pointer" onClick={() => { navigate("/profile?user=" + post.original_post.author.id) }} src={post.original_post.author.avatar} alt="user avatar" loading="lazy"></img>
										:
										<img className="w-12 h-12 rounded cursor-pointer" onClick={() => { navigate("/profile?user=" + post.author.id) }} src={post.author.avatar} alt="user avatar" loading="lazy"></img>

								}
								<div className="">
									<div>
										{/* <a className="dark:text-white"> */}
										{
											is_repost ?
												<h1 className="text-xl font-sembold text-black dark:text-white hover:underline cursor-pointer" onClick={() => { navigate("/profile?user=" + post.original_post.author.id) }}>
													<span className="flex">{post.original_post.author.name} {post.original_post.author.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}</span>
												</h1>
												// post.original_post.author.name
												:
												<h1 className="text-xl font-sembold text-black dark:text-white hover:underline cursor-pointer" onClick={() => { navigate("/profile?user=" + post.author.id) }}>
													<span className="flex">{post.author.name} {post.author.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}</span>
												</h1>
											// post.author.name
										}
										{/* </a> */}
									</div>
									<span className="text-sm text-gray-500 dark:text-gray-400">
										<h1 href="" class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400">
											{
												is_repost ?
													relativeDate(post.original_post.date._seconds * 1000)
													:
													relativeDate(post.date._seconds * 1000)
											}
										</h1>
									</span>
								</div>
							</span>
							<span>
								{

								}
							</span>
						</div>
					</div>
					{/* Seccion para el post de las personas */}
					<div className="p-3">
						<p className="text-gray-600 font-serif dark:text-white lg:pb-8 content-start">

							{

								is_repost ?
									post.original_post.active === true ?

										post.original_post.content
										:
										<p className="text-slate-400">Original post unavailable</p>
									:
									post.active === true ?
										post.content
										:
										<p className="text-slate-400">Post unavailable</p>

							}
						</p>
						{
							!is_repost ?
								post.active === true &&
								<div className={post.media.length > 1 && 'grid grid-cols-2 gap-1'}>
									{
										post.media.length > 1 ?
											post.media.slice(0, 4).map((file) => (
												<img src={file.url} className='rounded-md bg-black h-72 object-cover object-center w-full' alt="" />
											))
											:
											post.media.length > 0 && <img src={post.media[0].url} className='bg-black w-auto h-72 object-contain' alt="" />
									}
								</div>
								:
								post.original_post.active === true &&

								<div className={post.original_post.media.length > 1 && 'grid grid-cols-2 gap-1'}>
									{
										post.original_post.media.length > 1 ?
											post.media.slice(0, 4).map((file) => (
												<img src={file.url} className='rounded-md bg-black h-72 object-cover object-center w-full' alt="" />
											))
											:
											post.original_post.media.length > 0 && <img src={post.original_post.media[0].url} className='rounded-md object-cover w- max-w-xs' alt="" />
									}
								</div>
						}
						<div className="flex gap-x-5 pt-7">
							<div className="flex items-center space-x-4">
								<span onClick={() => {
									setUpdatingLikes(true);
									!updating_likes &&
										is_repost ?
										post.original_post.active === true &&
										(post.original_post.liked ? unlike(post.original_post.id) : like(post.original_post.id))
										:
										post.active === true &&
										(post.liked ? unlike(post.id) : like(post.id))
								}}>
									{
										updating_likes ?
											<Spinner className="h-6 w-6" />
											:
											is_repost ?
												post.original_post.active === true &&
												<svg class="cursor-pointer h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill={post.original_post.liked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
												:
												post.active === true &&
												<svg class="cursor-pointer h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill={post.liked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
									}
								</span>
								<h1 className="text-md text-gray-500 dark:text-gray-400">
									{
										is_repost ?
											post.original_post.active === true &&
											post.original_post.likes
											:
											post.active === true &&
											post.likes
									}
								</h1>
							</div>
							<div className="flex items-center space-x-4">
								{
									< span onClick={() => {
										setUpdatingReposts(true);
										!updating_reposts &&
											is_repost ?
											(post.original_post.reposted ? unrepost(post.original_post.id) : repost(post.original_post.id))
											:
											(post.reposted ? unrepost(post.id) : repost(post.id))
									}}>
										{
											updating_reposts ?
												<Spinner className="h-6 w-6" />
												:
												is_repost ?
													post.original_post.active === true &&
													<svg className={`cursor-pointer h-6 w-6 ml-2 items-center ${post.original_post.reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
													:
													post.active === true &&
													<svg className={`cursor-pointer h-6 w-6 ml-2 items-center ${post.reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
										}
									</span>
								}
								<h1 className="text-md text-gray-500 dark:text-gray-400">
									{
										is_repost ?
											post.original_post.active === true &&
											post.original_post.reposts
											:
											post.active === true &&
											post.reposts
									}
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div >
		</>
	)
}