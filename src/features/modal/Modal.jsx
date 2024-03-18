import React from 'react'
import { Outlet } from 'react-router'
import { useState } from 'react'

export const Modal = (props) => {
    const [isopen, setIsopen] = useState(false);


    return (
        <>
            <div className=''>
                <button className='bg-green-500 py-2 px-6 rounded-sm text-white font-bold m-5' onClick={() => setIsopen(true)}>
                    Toggle modal
                </button>
                {
                    isopen && (
                        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                            <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
                                <div>{props.children}</div>
                                <div>
                                    <button className='bg-red-500 py-2 px-6 rounded-md text-white font-bold m-5' onClick={() => setIsopen(false)}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>

    )
}
