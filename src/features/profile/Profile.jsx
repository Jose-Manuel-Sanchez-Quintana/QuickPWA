import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { BiSolidMessageRoundedDetail } from 'react-icons/bi';
import { BsBellFill, BsFillGearFill } from 'react-icons/bs';
import { FaWrench } from 'react-icons/fa';


export const Profile = ({ name, avatar }) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	return (
		<>
			{/* Profile */}
			<div className="
        sticky
				top-navbar-height
				overflow-hidden
				w-full h-fit
				dark:bg-quick4 text-center 
				dark:bg-quick4 
				lg:text-center lg:row-span-3
				dark:bg-quick4 md:dark:outline md:dark:outline-1 
				md:dark:outline-quick5 md:text-center md:row-span-3
			">
				{/* <div className="p-2 flex flex-col border-b dark:border-quick5 items-center">
					<img className="rounded-full cursor-pointer w-9/12 lg:w-1/2 aspect-square" src={avatar} onClick={() => { navigate("/profile?user=" + user.uid) }} />
					<h1 className="flex text-xl font-sembold text-black dark:text-white hover:underline hover:cursor-pointer mt-5" onClick={() => { navigate("/profile?user=" + user.uid) }}>
						{name} {user.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
					</h1>
				</div> */}
				<div className="
					flex flex-col
					text-xs xl:text-base
					
				">
					<div className="items-stretch col-span-1">
						<button className="flex flex-col xl:flex-row items-center p-2 text-sm hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white w-full text-gray-600 font-semibold" onClick={() => { navigate("/dms?to=" + user.uid) }}>
							<span className="xl:mr-3">
								<img src={user.avatar} className="rounded bg-black h-12 w-12 object-contain" alt="" />
							</span>
							<span className="hidden xl:flex">
								{user.name}
								{user.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
							</span>
						</button>
					</div>
					<button className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white w-full text-gray-600" onClick={() => { navigate("/dms?to=" + user.uid) }}>
						<BsBellFill className="xl:mr-3" />
						<span className='hidden lg:block'>
							Notifications
						</span>
					</button>
					<button className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600" onClick={() => { navigate("/dms?to=" + user.uid) }}>
						<BiSolidMessageRoundedDetail className="xl:mr-3" />
						<span className='hidden lg:block'>
							Messages
						</span>
					</button>
					<button className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600" onClick={() => { navigate('/settings') }}>
						<BsFillGearFill className="xl:mr-3" />
						<span className='hidden lg:block'>
							Settings
						</span>
					</button>
					{
						user.role.indexOf('administrator') !== -1 &&
						<button className="flex flex-col xl:flex-row items-center p-3  hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600" onClick={() => { navigate("/dms?to=" + user.uid) }}>
							<FaWrench className="xl:mr-3" />
							<span className='hidden lg:block'>
								Administrator tools
							</span>
						</button>
					}
				</div>
			</div >
		</>
	)
}

