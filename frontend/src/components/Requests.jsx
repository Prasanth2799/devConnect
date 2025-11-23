import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequests } from "../store/requestSlice"

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.request);
  const fetchRequests = async() => {
    try{
        const res = await axios.get(BASE_URL+"/user/requests/received", {withCredentials : true})
        dispatch(addRequests(res?.data?.data))
    }catch(err){
        console.error(err)
    }
  }
  const reviewRequest = async (status, _id) => {
    try{
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials: true})
      dispatch(removeRequests(_id))
    }catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchRequests();
  },[])
  if(!requests) return;
  if(requests.length === 0) return <h1 className="p-4 text-center">No Requests</h1>
  return (
    <div className="my-10 text-center">
      <h1>Requests</h1>
      {requests?.map((request) => {
        const {firstName, lastName, photoUrl, about, _id, age, gender} = request?.fromUserId;
        return(
          <div className="bg-base-300 flex p-4 m-4 w-1/2 mx-auto rounded" key={_id}>
            <div>
              <img src={photoUrl} alt="user-photo" className="h-16 rounded-4xl"/>
            </div>
            <div className="text-left mx-4">
              <h1>{firstName +" "+lastName}</h1>
              <p>{age && gender && <p>{age + " "+gender}</p> || gender && <p>{gender}</p> || age && <p>{age}</p>}</p>
              <div className="mt-2">
                <button className="btn btn-error text-white mr-2"
                onClick={() => reviewRequest("rejected", request?._id)}
                >Reject</button>
                <button className="btn btn-accent text-white"
                onClick={() => reviewRequest("accepted", request?._id)}
                >Accept</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests
