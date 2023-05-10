"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { db, storage } from '@/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2'

export default function AddCandidate() {
    const [enterNomor, setNomor] = useState(0)
    const [enterJumlah, setJumlah] = useState(0)
    const [enterNama, setNama] = useState('')
    const [enterVisi, setVisi] = useState('')
    const [enterCandidateImage, setCandidateImage] = useState(null)

    const router = useRouter()

    const addCandidate = async (e) => {
        e.preventDefault()
        try {
            const docRef = collection(db, 'candidates')

            const storageRef = ref(storage, `candidateImage/${Date.now() + enterCandidateImage.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterCandidateImage)
            uploadTask.on(
                "state_changed",
                null,
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                        await addDoc(docRef, {
                            nomor: enterNomor,
                            nama: enterNama,
                            visi: enterVisi,
                            jumlah: enterJumlah,
                            imageUrl: downloadUrl,
                        })
                    })

                }
            )
            Swal.fire(
                'Tambah Data Sukses!',
                'You clicked the button!',
                'success'
            )
            setTimeout(() => {
                router.push(`/dashboard`)
            }, 1500)

        } catch (error) {
            alert("Gagal menambahkan data")
            console.log(error);
        }
    }

    return (
        <>
            <div class="w-full max-w-sm mx-auto">
                <div className='justify-center mt-6'>
                    <p className='text-xl text-center font-bold '>Tambah Data</p>
                </div>
                <form onSubmit={addCandidate} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div class="mb-4">
                        <label htmlFor="nomor" className='block text-gray-700 text-sm font-bold mb-2'>Nomor:</label>
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
                        <label htmlFor="visi" className='block text-gray-700 text-sm font-bold mb-2'>Visi:</label>
                        <textarea id="visi" name="visi"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={enterVisi}
                            onChange={e => setVisi(e.target.value)}
                        ></textarea>
                    </div>
                    <div class="mb-4">
                        <label htmlFor="jumlah" className='block text-gray-700 text-sm font-bold mb-2'>Jumlah:</label>
                        <input type="number" disabled id="jumlah" name="jumlah"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

                            value={enterJumlah}
                            onChange={e => setJumlah(e.target.value)}
                        />
                    </div>
                    <label htmlFor="gambar" className='block text-gray-700 text-sm font-bold mb-2'>Gambar:</label>
                    <input className="form-input py-1 px-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline focus:bg-white text-sm" type="file" id="gambar" name="gambar"
                        onChange={e => setCandidateImage(e.target.files[0])}
                    />

                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 place-items-end' type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
