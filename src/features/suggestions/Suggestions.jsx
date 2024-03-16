import React from "react";
import useSuggestion from "./useSuggestions";
import { useNavigate } from "react-router-dom";

export const Suggestions = () => {
	const { users } = useSuggestion();
	const navigate = useNavigate()

	return (
		<div className="
				sticky
				top-navbar-height
        overflow-hidden
				h-fit
				p-2
				ml-2 mt-2
				border border-light-gray-border 
        w-full bg-white dark:bg-quick4 dark:text-white lg:dark:bg-quick4">
			{/* <h1 className="text-black dark:text-white dark:border-quick5 border-b">Suggestions</h1> */}
			<div className="bg-red-200">
				How to follow
			</div>
			<div className="dark:bg-quick4 flex flex-col items-center text-center group bg-white">
				<ul className="w-full divide-y-[15px] divide-transparent text-sm">
					{
						users.map((user) => {
							return (<>
								<li
									className="text font-semibold dark:hover:bg-quick5 dark:text-white flex transition-all duration-100"
									key={user.uid}
									onMouseDown={(e) => { e.preventDefault() }}
									onClick={() => {
										navigate("/profile?user=" + user.uid, {
											replace: true,
										});
										window.location.reload();
									}}
								>
									<div>
										<img
											className="w-12 h-12 rounded mr-2"
											src={user.avatar}
											alt="Imagen de user"
										/>
									</div>
									<div className="cursor-pointer hover:underline h-fit">{user.name}</div>
									<div className="flex justify-end items-center grow bg-gray text-gray-500">
										<button className="
											hover:underline 
											decoration-green-500 decoration-2 
											h-fit
											p-1
										">Follow</button>
									</div>
								</li>
							</>)
						})
					}
				</ul>
			</div>
		</div>
	)
}