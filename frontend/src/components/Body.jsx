import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react"
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../store/userSlice";
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL+"/profile/view", {withCredentials: true})
      dispatch(addUser(res?.data?.user))
    }catch(err){
      if(err.response.status === 401){
        return navigate("/login")
      }
      console.error(err)
    }
  }
  useEffect(() => {
    fetchUser()
  },[])
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body