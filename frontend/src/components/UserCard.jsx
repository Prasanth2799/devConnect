import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch} from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
const UserCard = ({userData}) => {
  const dispatch = useDispatch();
  const {firstName, lastName, photoUrl, age, skills, gender, _id} = userData;
  const handleSendRequest = async (status, userId) => {
    try{
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {}, {withCredentials: true});
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.error(err)
    }
  }
  return (
    <>
    <div className="card w-64 h-[380px] shadow-sm bg-base-300 p-2 items-center">
  <figure>
    <img
      src={photoUrl}
      alt="feed-user-photo"
      className="w-64"
      />
  </figure>
  <div className="card-body">
    {firstName && lastName ?<h2 className="card-title">{firstName+" "+lastName}</h2> : <h2 className="card-title">{firstName}</h2>}
     {age && gender && <p>{age + " "+gender}</p> || gender && <p>{gender}</p> || age && <p>{age}</p>}
    <div className="card-actions justify-between">
      <button className="btn btn-secondary" 
      onClick={() => handleSendRequest("ignored", _id)}
      >Ignored</button>
      <button className="btn btn-primary"
      onClick={() => handleSendRequest("interested", _id)}
      >Interested</button>
    </div>
  </div>
</div>
    </>
    
  )
}

export default UserCard