import { Outlet } from "react-router-dom"
import Navbar from "../Header/Navbar"
import Footer from "../Footer/Footer"

const Body = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body