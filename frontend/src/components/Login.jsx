import { useState } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
const Login = () => {
  const[emailId, setEmailId] = useState("prasanth2@gmail.com");
  const[password, setPassword] = useState("Prasanth@123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try{
        const res = await axios.post(BASE_URL+"/login", {
            emailId, password
        }, {withCredentials : true})
        dispatch(addUser(res?.data?.user))
        return navigate("/")
    }catch(err){
        console.error(err)
    }
  }
  return (
    <div className="card bg-base-300 w-[360px] h-[280px] mx-auto rounded-lg shadow-lg my-24">
  <div className="card-body items-center">
    <h2 className="card-title">Login</h2>
    <label className="floating-label">
  <input type="text" placeholder="Email Id" className="input input-md w-50 mb-2" value={emailId} onChange={(e) => setEmailId(e.target.value)}  />
  <span>Email Id</span>
</label>
<label className="floating-label">
  <input type="password" placeholder="Password" className="input input-md w-50" value={password} onChange={(e) => setPassword(e.target.value)} />
  <span>Password</span>
</label>
    <div className="card-actions mt-4">
      <button className="btn btn-primary w-32" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
  )
}

export default Login