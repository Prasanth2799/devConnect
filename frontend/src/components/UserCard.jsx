import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch} from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
const UserCard = ({userData, showButtons=true}) => {
  const dispatch = useDispatch();
  const {firstName, lastName, photoUrl, age, about, skills, gender, _id} = userData;
  const handleSendRequest = async (status, userId) => {
    try{
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {}, {withCredentials: true});
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className="card w-64 h-[380px] shadow-sm bg-base-300 p-2 items-center">
  <figure>
    <img src={photoUrl} alt="feed-user-photo" className="w-64 h-64 object-cover" />
  </figure>

  <div className="card-body p-2 flex flex-col justify-between">
    <div>
      <h2 className="card-title truncate">
        {firstName} {lastName}
      </h2>

      {(age || gender) && (
        <p className="text-sm opacity-80">
          {age && age} {gender && gender}
        </p>
      )}

      <p className="text-sm line-clamp-5 mt-1">
        {about}
      </p>

      {skills && (
        <p className="text-xs mt-2">
          <span className="font-bold">Skills:</span> {skills}
        </p>
      )}
    </div>

    {showButtons && (
      <div className="card-actions justify-between mt-2">
        <button className="btn btn-secondary btn-sm"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignored
        </button>
        <button className="btn btn-primary btn-sm"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Interested
        </button>
      </div>
    )}
  </div>
</div>

    
  )
}

export default UserCard