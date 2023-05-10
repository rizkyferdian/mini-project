"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { db, storage } from '@/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore';
import SideBar from '@/app/components/sideBar';
import Swal from 'sweetalert2'

export default function EditCandidate() {
    const [enterNomor, setNomor] = useState(0)
    const [enterJumlah, setJumlah] = useState(0)
    const [enterNama, setNama] = useState('')
    const [enterVisi, setVisi] = useState('')
    const [enterCandidateImage, setCandidateImage] = useState(null)
    const [updateId, setUpdateId] = useState(null) // Menambahkan state untuk ID data yang akan diupdate

    const router = useRouter()
    const pathname = usePathname()

    const updateCandidate = async (e) => {
        e.preventDefault()

        if (enterCandidateImage) {
            const storageRef = ref(storage, `candidate-images/${updateId}-${enterCandidateImage.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterCandidateImage)

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'candidates', updateId), {
                            nomor: enterNomor,
                            nama: enterNama,
                            visi: enterVisi,
                            jumlah: enterJumlah,
                            imageUrl: downloadURL
                        })
                        Swal.fire(
                            'Update Data Sukses!',
                            'You clicked the button!',
                            'success'
                        )
                        router.push(`/dashboard`)
                    })
                }
            )
        } else {
            await updateDoc(doc(db, 'candidates', updateId), {
                nomor: enterNomor,
                nama: enterNama,
                visi: enterVisi,
                jumlah: enterJumlah
            })

            router.push(`/dashboard`)
        }
    }

    useEffect(() => {
        const id = pathname.split("/")[2]

        if (id) {
            const getCandidate = async () => {
                const candidateRef = doc(db, 'candidates', id)
                const candidateDoc = await getDoc(candidateRef)
                const candidateData = candidateDoc.data()

                setNomor(candidateData.nomor)
                setJumlah(candidateData.jumlah)
                setNama(candidateData.nama)
                setVisi(candidateData.visi)
                setUpdateId(id)
            }

            getCandidate()
        }
    }, [router.query])

    return (
        <>
            <div className='flex'>
                <SideBar />
                <div class="w-full max-w-sm mx-auto">
                    <div className='justify-center mt-6'>
                        <p className='text-xl text-center font-bold '>Update Data</p>
                    </div>
                    <form onSubmit={updateCandidate} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' >
                        <div class="mb-4">
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nomor">Nomor:</label>
                            <input type="number" id="nomor" name="nomor"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={enterNomor}
                                onChange={e => setNomor(e.target.value)}
                            />
                        </div>
                        <div class="mb-4">
                            <label htmlFor="nama" className='block text-gray-700 text-sm font-bold mb-2'>Nama:</label>
                            <input type="text" id="nama" name="nama"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={enterNama}
                                onChange={e => setNama(e.target.value)}
                            />
                        </div>
                        <div class="mb-4">
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="visi">Visi:</label>
                            <textarea id="visi" name="visi"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={enterVisi}
                                onChange={e => setVisi(e.target.value)}
                            ></textarea>
                        </div>
                        <div class="mb-4">
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="jumlah">Jumlah Suara:</label>
                            <input type="number" disabled id="jumlah" name="jumlah"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={enterJumlah}
                                onChange={e => setJumlah(e.target.value)}
                            />
                        </div>
                        <div class="mb-4">
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="candidate-image">Gambar:</label>
                            <input type="file" id="candidate-image" name="candidate-image"
                                onChange={e => setCandidateImage(e.target.files[0])}
                            />
                        </div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 place-items-end' type="submit">Simpan</button>
                    </form>
                </div>
            </div>
        </>
    )
}

