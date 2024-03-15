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
				border border-light-gray-border 
        w-full h-1/2 bg-white text-white dark:bg-quick4 dark:text-white text-center text-3xl py-2 rounded-lg lg:text-white lg:dark:bg-quick4 lg:dark:text-white lg:dark:outline lg:dark:outline-1 lg:dark:outline-quick5 lg:text-center lg:text-3xl lg:py-2 lg:rounded-lg lg:block md:text-white md:dark:bg-quick4 md:dark:text-white md:dark:outline md:dark:outline-1 md:dark:outline-quick5 md:text-center md:text-3xl md:py-2 md:rounded-lg md:row-span-3 md:block sm:hidden ">
			<h1 className="text-black dark:text-white dark:border-quick5 border-b">Suggestions</h1>
			<div className="dark:bg-quick4 pt-6 flex flex-col items-center text-center group bg-white">
				<ul className="w-full ">
					{
						users.map((user) => {
							return (<>
								<li
									className="text-gray-900 hover:bg-green-400 dark:hover:bg-quick5 dark:text-white flex text-lg p-4 hover:cursor-pointer transition-all duration-100"
									key={user.uid}
									onMouseDown={(e) => { e.preventDefault() }}
									onClick={() => {
										navigate("/profile?user=" + user.uid, {
											replace: true,
										});
										window.location.reload();
									}}
								>
									<img
										className="w-10 h-10 rounded-full mr-2"
										src={user.avatar}
										alt="Imagen de user"
									></img>
									<p>{user.name}</p>
								</li>
							</>)
						})
					}
				</ul>
			</div>
		</div>
	)
}