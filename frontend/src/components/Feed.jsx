import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    try{
      const res = await axios.get(BASE_URL+"/feed",  {withCredentials : true})
      dispatch(addFeed(res?.data?.data))
    }catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchFeed()
  },[])
  return (
    <>
    {feed && 
    <div className="flex justify-center my-16">
      <UserCard userData={feed[0]}/>
    </div>}
    </>
  )
}

export default Feed