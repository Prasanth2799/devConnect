import { useState } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
const Login = () => {
  const[emailId, setEmailId] = useState("");
  const[password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[isSignInForm, setIsSignInForm] = useState(false);
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try{
        const res = await axios.post(BASE_URL+"/login", {
            emailId, password
        }, {withCredentials : true})
        dispatch(addUser(res?.data?.user))
        return navigate("/")
    }catch(err){
        console.error(err)
        setError(err?.response?.data)
    }finally {
      setLoading(false)
    }
  }
  const handleSignUp = async () => {
    setLoading(true)
    setError("")
    try{
      const res = await axios.post(BASE_URL+"/signup",
        {firstName, lastName, emailId, password},
        {withCredentials: true}
      )
      dispatch(addUser(res?.data?.data))
      return navigate("/profile")
    }catch(err){
      console.error(err)
      setError(err?.response?.data)
    }finally {
      setLoading(false)
    }
  }
  return (
    <>
    <div className="card bg-base-300 w-96 mx-auto rounded-lg shadow-lg my-24">
  <div className="card-body items-center">
    <h2 className="card-title">{isSignInForm ? "Login" : "Sign Up"}</h2>
    {
    !isSignInForm &&
    <>
    <label className="floating-label">
  <input type="text" placeholder="First Name" className="input input-md w-50 mb-2" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
  <span>First Name</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="Last Name" className="input input-md w-50 mb-2" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
  <span>Last Name</span>
</label>
</>
}
    <label className="floating-label">
  <input type="text" placeholder="Email Id" className="input input-md w-50 mb-2" value={emailId} onChange={(e) => setEmailId(e.target.value)}  />
  <span>Email Id</span>
</label>
<label className="floating-label">
  <input type="password" placeholder="Password" className="input input-md w-50" value={password} onChange={(e) => setPassword(e.target.value)} />
  <span>Password</span>
</label>
<p className="text-red-600">{error}</p>
    <div className="card-actions mt-4">
      <button className="btn btn-primary w-32" onClick={isSignInForm ? handleLogin : handleSignUp}>
        {loading ? (
          <>
          <span className="loading loading-spinner"></span>
          {isSignInForm ? "Logging In..." : "Signing Up..."}
          </>
        ) : 
        (
          <>{isSignInForm ? "Login In" : "Sign Up"}</>
        )
        }
      </button>
    </div>
    <p className="m-auto cursor-pointer" onClick={() => setIsSignInForm(value => !value)}>{isSignInForm ? "New User, Please Sign UP" : "Existing User, Please Login in"}</p>
  </div>
</div>
    </>
    
  )
}

export default Login