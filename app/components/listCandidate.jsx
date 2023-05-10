import React, { useState } from 'react'
import useGetData from '../api/useGetData'
import { db } from '@/firebase/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import Link from 'next/link';
import Swal from 'sweetalert2'
import Loader from './Loader';

export default function ListCandidate() {
    const [isLoading, setIsLoading] = useState(false)
    const { data: candidatesData } = useGetData('candidates')
    console.log(candidatesData)

    const deleteCandidates = async (id) => {
        await deleteDoc(doc(db, 'candidates', id))
        Swal.fire(
            'Delete Success!',
            'You clicked the button!',
            'success'
        )
    }


    const handleRoute = () => {
        setIsLoading(true)
        setTimeout(() => {
        }, 1500)

    }

    return (
        <>
            <table className="table-auto mx-auto border-collapse w-4/5">
                <thead className='bg-blue-600 text-white'>
                    <tr>
                        <th className="border p-3">Image</th>
                        <th className="border p-3">Nomor</th>
                        <th className="border p-3">Nama</th>
                        <th className="border p-3">Visi</th>
                        <th className="border p-3">Jumlah</th>
                        <th className="border p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {candidatesData.map(item => (
                        <tr key={item.id}>
                            <td className='border p-3'>
                                <img src={item.imageUrl} alt="image" width={200} />
                            </td>
                            <td className="border p-3">{item.nomor}</td>
                            <td className="border p-3">{item.nama}</td>
                            <td className="border p-3">{item.visi}</td>
                            <td className="border p-3">{item.jumlah}</td>
                            <td className="border p-3">
                                <div className='flex'>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white px-2 rounded-full"
                                        onClick={() => { deleteCandidates(item.id) }}
                                    >
                                        Delete
                                    </button>
                                    <Link href={`/dashboard/${item.id}`}>
                                        <button onClick={handleRoute} class="bg-blue-500 ml-1 hover:bg-blue-700 text-white  px-2 rounded-full">
                                            {isLoading ? <Loader /> : "Edit"}
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >

        </>
    )
}
