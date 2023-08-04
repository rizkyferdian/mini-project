"use client"
import React, { useState, useEffect } from 'react'
import useGetData from '../api/useGetData'
import { db } from '@/firebase/firebase'
import { collection, doc, updateDoc, onSnapshot, increment } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import useGetDataUser from '../api/useGetDataUser';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
export default function Content() {
    const { authUser, isLoading, } = useAuth()

    const router = useRouter()
    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login")
        }
    }, [authUser, isLoading])

    const currentUser = getAuth()



    const [data, setData] = useState([])
    const collectionRef = collection(db, "user")
    const { data: candidatesData } = useGetData('candidates')

    useEffect(() => {
        const getData = async () => {

            onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })

        };
        getData();
    }, []);

    const choosenUser = data.filter((item) => item.uid === currentUser?.currentUser?.uid);
    console.log(currentUser?.currentUser?.uid)


    const handleVote = async (id) => {
        const voteRef = doc(db, "candidates", id)
        const userRef = doc(db, "user", choosenUser[0].id)
        await updateDoc(userRef, {
            isVoted: true
        })
        await updateDoc(voteRef, {
            jumlah: increment(1)
        })
        Swal.fire(
            'Selamat Anda Sudah Vote!',
            'You clicked the button!',
            'success'
        )
    }

    return (
        <>
            <div className='container mx-auto  bg-slate-50'>
                <div className='mt-6'>
                    <p className='text-center font-extrabold text-3xl'><br />
                        Ayo Pilih Sekarang !
                    </p>
                    <p className='text-center font-light text-gray-500'>Pentingnya Suara Anda: Bergabunglah dengan Revolusi Pemilihan!</p>
                </div>
                <div className='flex gap-x-3 justify-center'>

                    {candidatesData.map(item => (
                        <div className="max-w-xs mt-6 mb-14 rounded overflow-hidden bg-white shadow-lg" key={item.id}>
                            <img className="w-full h-52" src={item.imageUrl} alt="image" />
                            <div className="px-6 py-4">
                                <p>Nomor Paslon : {item.nomor}</p>
                                <div className="font-bold text-xl mb-2">{item.nama}</div>
                                <p className="text-gray-700 text-base">Visi : {item.visi}</p>
                                {
                                    choosenUser.length > 0 && choosenUser[0].isVoted ? (
                                        <div>
                                            <p className='bg-blue-600 mt-3 px-3 text-center text-white rounded-xl'>Jumlah Vote : {item.jumlah}</p>
                                            <button onClick={() => handleVote(item.id)} disabled className="bg-gray-200 mt-3 cursor-not-allowed text-black font-bold py-2 px-4 rounded">
                                                Vote
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={
                                            () => handleVote(item.id)
                                        } className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Vote
                                        </button>
                                    )
                                }
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}
