import React from 'react'
import { Outlet } from 'react-router'
import { useState } from 'react'

export const Modal = () => {
    const [isopen, setIsopen] = useState(false);


    return (
        <>
            <button className='bg-green-500 py-2 px-6 rounded-sm text-white font-bold m-5' onClick={() => setIsopen(true)}>
                Toggle modal
            </button>
            {
                isopen && (
                    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                        <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
                            <div>
                                <label className='mr-3 font-semibold'>Test 1</label>
                                <input type="Test" className='w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 duration-200' />
                            </div>
                            <div>
                                <label className='mr-3 font-semibold'>Test 2</label>
                                <input type="Test" className='w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 duration-200' />
                            </div>
                            <div>
                                <button className='bg-red-500 py-2 px-6 rounded-md text-white font-bold m-5' onClick={() => setIsopen(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>

    )
}
