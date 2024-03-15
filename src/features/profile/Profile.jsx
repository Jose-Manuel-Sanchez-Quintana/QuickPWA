import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


export const Profile = ({ name, avatar }) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	return (
		<>
			{/* Profile */}
			<div className="
        hidden md:block sticky
				overflow-hidden
				top-0
				w-full h-fit
				dark:bg-quick4 dark:outline dark:outline-1 
				dark:outline-quick5 text-center text-3xl 
				rounded-lg row-span-3  
				lg:bg-white lg:dark:bg-quick4 
				lg:dark:outline lg:dark:outline-1 lg:dark:outline-quick5 lg:text-center 
				lg:text-3xl lg:rounded-lg lg:row-span-3
				md:bg-white md:dark:bg-quick4 md:dark:outline md:dark:outline-1 
				md:dark:outline-quick5 md:text-center md:text-3xl md:rounded-lg md:row-span-3">
				<div className="p-2 flex flex-col border-b dark:border-quick5 items-center">
					<img className="rounded-full cursor-pointer w-9/12 lg:w-1/2 aspect-square" src={avatar} onClick={() => { navigate("/profile?user=" + user.uid) }} />
					<h1 className="flex text-xl font-sembold text-black dark:text-white hover:underline hover:cursor-pointer mt-5" onClick={() => { navigate("/profile?user=" + user.uid) }}>
						{name} {user.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
					</h1>
				</div>
				<div className="
					flex flex-col
					divide-y divide-light-grey-border
				">
					<a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` p-3 w-full text-xl text-left text-gray-600 font-semibold" href={"/dms?to=" + user.uid}><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
					<a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` p-3 w-full text-xl text-left text-gray-600 font-semibold" href="/settings"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
					{
						user.role.indexOf('administrator') !== -1 &&
						<a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` p-3 w-full text-xl text-left text-gray-600 font-semibold" href="/admintools"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Administrator tools</a>
					}
				</div>
			</div>
		</>
	)
}

