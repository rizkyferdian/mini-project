"use client"
import React, { useState } from 'react'
import SideBar from '../components/sideBar'
import ListCandidate from '../components/listCandidate'
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';


export default function page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const handleRoute = () => {
        setIsLoading(true)
        setTimeout(() => {
            router.push("/dashboard/add")
        }, 1500)

    }
    return (
        <>
            <div className='flex'>
                <SideBar />

                <div className='container mx-auto mt-6'>
                    <button className="bg-green-600 hover:bg-green-800 ml-28 my-10 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleRoute} >
                        {isLoading ? <Loader /> : "Tambah Data"}
                    </button>
                    <ListCandidate />
                </div>
            </div>
        </>
    )
}
