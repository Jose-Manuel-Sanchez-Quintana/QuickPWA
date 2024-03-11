import React, { useState, useEffect } from "react";
import UseFollowerPicker from "./UseFollowerPicker";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Search } from "../search/Search";
import ReactSwitch from 'react-switch';
import { RxCross1 } from "react-icons/rx";
import BuyButton from "../buy_button/BuyButton";
import { Avatar, Chip, Typography, button } from "@material-tailwind/react";

export const FollowerPicker = ({ current_chatroom, handleAddParticipants, handleClose }) => {
	const { searchUsers, search_results, participan_list, addParticipant, removeParticipant } = UseFollowerPicker();
	const [search_value, setSearchValue] = useState(null);
	const [search_active, setSearchActive] = useState(false);

	useEffect(() => {
		if (search_value !== null) {
			searchUsers(search_value)
		}
	}, [search_value])

	return (
		<>
			<div class="flex bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen md:max-h-full">
				<div class="relative p-0: md:p-4 w-full max-w-2xl max-h-full">
					<div class="relative h-screen md:h-auto bg-white shadow dark:bg-gray-700">
						<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
								Add participants
							</h3>
							<button type="button" onClick={handleClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
								<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<div className="w-100">
							<input type="text" className="text-white w-auto bg-transparent border-transparent ring-offset-0 focus:border-transparent focus:ring-0 p-2 font-lg" placeholder="Search in followers..." value={search_value} onChange={(e) => { setSearchValue(e.target.value) }} />

						</div>
						<div class="">
							{/* <div className="container w-80 ml-24  absolute mt-11 z-50"> */}
							<ul className="dark:bg-zinc-800 font-normal border-transparent text-black bg-white">
								{search_results != null && search_results.map((result) => (
									current_chatroom.participants.findIndex((e) => (e.id === result.id)) === -1 ?
										<li
											className="flex items-center dark:hover:bg-zinc-700 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
											key={result.uid}
											onMouseDown={(e) => { e.preventDefault() }}
											onClick={() => {
												addParticipant(result)
											}}
										>
											<img
												className="w-10 h-10 rounded-full mr-2"
												src={result.avatar}
												alt="Imagen de result"
											></img>
											<p>{result.name}</p>
										</li>
										:
										null
								))}
							</ul>
							{/* </div> */}
						</div>
						<div className="flex gap-3 p-3">
							{
								participan_list !== null && participan_list.map((participant) => (
									<Chip variant="outlined" size="lg" value={
										<Typography variant="small"
											color="white"
											className="font-medium capitalize leading-none"
										>{participant.name}</Typography>
									} className="rounded-full hover:bg-red-700 hover:bg-opacity-30 cursor-pointer" onClick={() => { removeParticipant(participant) }} />
								))
							}
						</div>
						<div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button disabled={participan_list.length === 0} onClick={() => { handleAddParticipants(current_chatroom.id, participan_list.map((e) => (e.id))); handleClose() }} type="button" class="text-white dark:disabled:bg-slate-600 bg-green-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700">Add</button>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};
