import Image from "next/image";
import React from 'react'

export default function Loader() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-100">
            <Image
                width={100}
                height={100}
                alt="loading..."
                src="/loader.svg"
            />
        </div>
    )
}
