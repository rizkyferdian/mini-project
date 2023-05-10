import Image from 'next/image'
import Navbar from './components/navbar'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Content />
      <Footer />
    </>
  )
}
