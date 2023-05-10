import React from 'react'

function Header() {
    return (
        <>

            <section className="container items-center px-4 pb-12 mx-auto mt-20 md:px-40">
                <p className='text-4xl font-bold text-center'>
                    Setiap Suara Berarti! Dengan Memberikan Suara, Kita <span className='text-blue-700'> Membangun Masa Depan yang Lebih Baik! </span>
                </p>
                <p className='text-center text-gray-600 font-light mt-6'>MyVote, inovasi terbaru dalam dunia pemilihan online, mempermudah proses voting bagi siapa pun. Dengan menggunakan MyVote, partisipan dapat dengan mudah mengungkapkan suara mereka dalam hitungan detik.
                </p>
                <div class="w-3/4 container mx-auto mt-10 rounded-full">
                    <img src="banner.png" class="object-contain w-full h-full" alt="Gambar" />
                </div>

            </section>
        </>
    )
}

export default Header