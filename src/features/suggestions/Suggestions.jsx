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
				h-fit
        w-full dark:bg-quick4 dark:text-white lg:dark:bg-quick4">
			{/* <h1 className="text-black dark:text-white dark:border-quick5 border-b">Suggestions</h1> */}
			<div className="
				m-2
				font-semibold
				text-xl
			">
				Who to follow
			</div>
			<div className="dark:bg-quick4 flex flex-col items-center text-center group">
				<ul className="w-full text-sm">
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