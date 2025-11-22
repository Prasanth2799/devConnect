import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const userConnections = useSelector(store => store.connections);
  const fetchConnections = async () => {
    try{
      const res = await axios.get(BASE_URL+"/user/connections", {withCredentials: true})
      dispatch(addConnections(res?.data?.data))
    }catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchConnections()
  },[])
  if(!userConnections) return;
  if(userConnections.length === 0) return <h1 className="p-4 text-center">No Connections</h1>
  return (
    <div className="p-4 text-center">
      <h1>Connections</h1>
      {userConnections?.map((connection,index) => {
        const {firstName, lastName, photoUrl, about, _id, age, gender} = connection;
        return(
          <div className="bg-base-300 items-center flex p-4 m-4 w-1/2 mx-auto rounded" key={_id}>
            <div>
              <img src={photoUrl} alt="user-photo" className="h-16 rounded-4xl mr-4"/>
            </div>
            <div className="text-left">
              <h1>{firstName +" "+lastName}</h1>
              <p>{age && gender && <p>{age + " "+gender}</p> || gender && <p>{gender}</p> || age && <p>{age}</p>}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections