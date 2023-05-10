"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/auth';
import Link from 'next/link';
import Loader from './Loader';

export default function SideBar() {
    const { authUser, isLoading, signOut } = useAuth()

    const router = useRouter()
    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login")
        }
    }, [authUser, isLoading])

    const [isLoad, setIsLoading] = useState(false)
    const handleRoute = () => {
        setIsLoading(true)
        setTimeout(() => {
            router.push("/dashboard")
        }, 1500)

    }
    return (
        <>
            <div className="flex flex-col w-64 bg-white text-black border-r">
                <div className="flex items-center ml-4 h-16">

                    <span className="text-2xl font-bold text-blue-600">Dashboard</span>
                </div>
                <nav className="flex-grow">
                    <button className="flex items-center text-gray-600 px-4 py-2 hover:bg-gray-200" onClick={handleRoute}>
                        <svg
                            className="h-6 w-6 fill-current mr-2"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2 6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2-2v2h12V4H4zm12 10v-6H4v6h12zm-4 2v2h-4v-2h4z" />
                        </svg>
                        {isLoad ? <Loader /> : "Dashboard"}
                    </button>

                    <a className="flex items-center text-gray-600  px-4 py-2 hover:bg-gray-200" href="#" onClick={signOut}>
                        <svg
                            className="h-6 w-6 fill-current mr-2"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M3 3h3v2H3V3zm5 0h2v2H8V3zm4 0h2v2h-2V3zm4 0h3v2h-3V3zM3 6h14v2H3V6zm0 4h6v2H3v-2zm8 0h6v2h-6v-2zm-8 4h14v2H3v-2z" />
                        </svg>
                        <span>Logout</span>
                    </a>
                </nav>
                <div className="flex items-center justify-center h-16">
                    <span>© 2023 My Website</span>
                </div>

            </div>
        </>
    )
}
