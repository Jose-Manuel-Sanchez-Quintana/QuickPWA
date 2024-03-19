import React from 'react'
import { useState } from 'react'

export const Modal = (props) => {
	const [isopen, setIsopen] = useState(false);


	return (
		<>
			{
				isopen &&
				<div className='fixed w-screen h-screen z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
					{props.children}
				</div>
			}
		</>
	)
}
