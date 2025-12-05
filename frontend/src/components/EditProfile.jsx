import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch} from "react-redux";
import {addUser} from "../store/userSlice";

const EditProfile = ({user}) => {
  const[firstName, setFirstName] = useState(user.firstName);
  const[lastName, setLastName] = useState(user.lastName);
  const[age, setAge] = useState(user.age);
  const[gender, setGender] = useState(user.gender);
  const[photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const[skills, setSkills] = useState(user.skills);
  const[about, setAbout] = useState(user.about);
  const[showToast, setShowToast] = useState(false)
  const[error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try{
      setError("")
      const res = await axios.patch(BASE_URL+"/profile/edit", {
        firstName, lastName, age, gender, photoUrl, skills, about
      }, {withCredentials: true})
      dispatch(addUser(res?.data?.data))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 4000)
    }catch(err){
      console.error(err)
      setError(err?.response?.data)
    }
  }
  return (
    <div className="flex justify-center my-10 pb-24">
        <div className="flex flex-col md:flex-row justify-center mx-10">
            <div className="card bg-base-300  md:w-80 w-full md:mr-2 mb-2 shadow-xl">
  <div className="card-body items-center">
    <h2 className="card-title">Edit Profile</h2>
    <label className="floating-label">
  <input type="text" placeholder="First Name" className="input input-md w-50 mb-2" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
  <span>First Name</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="Last Name" className="input input-md w-50 mb-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
  <span>Last Name</span>
</label>
<label className="floating-label">
  <input type="number" placeholder="Age" className="input input-md w-50 mb-2" value={age} onChange={(e) => setAge(e.target.value)} />
  <span>Age</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="Gender" className="input input-md w-50 mb-2" value={gender} onChange={(e) => setGender(e.target.value)} />
  <span>Gender</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="Photo Url" className="input input-md w-50 mb-2" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
  <span>Photo Url</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="Skills" className="input input-md w-50 mb-2" value={skills} onChange={(e) => setSkills(e.target.value)} />
  <span>Skills</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="About" className="input input-md w-50 mb-2" value={about} onChange={(e) => setAbout(e.target.value)} />
  <span>About</span>
</label>
<span className="text-red-600">{error}</span>
    <div className="card-actions mt-4">
      <button className="btn btn-primary w-32" onClick={handleSaveProfile}>Save</button>
    </div>
  </div>
            </div>
            <UserCard userData={{firstName, lastName, photoUrl, age, gender, skills, about}} showButtons={false}/>
        </div>
        {showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
</div>}
    </div>
  )
}

export default EditProfile