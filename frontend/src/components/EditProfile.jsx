import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch} from "react-redux";
import {addUser} from "../store/userSlice";
import {Link} from "react-router-dom";
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
  const [aiLoading, setAiLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try{
      setError("")
      setIsLoading(true)
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
    }finally{
      setIsLoading(false)
    }
  }
  const handleImproveAbout = async () => {
  try {
    setAiLoading(true);

    const res = await axios.post(
      BASE_URL + "/profile/ai-suggestion",
      { about },
      { withCredentials: true }
    );

    setAbout(res.data.suggestion);

  } catch (err) {
    console.error(err);
    setError("AI generation failed, Please try again after sometime.")
  } finally {
    setAiLoading(false);
  }
};


  return (
    <div>
      <div className="breadcrumbs text-sm mx-2">
  <ul>
    <li>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
        </svg>
        Feed
      </Link>
    </li>
    <li>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
        </svg>
        Profile
      </a>
    </li>
  </ul>
</div>
      <p className="text-center">Try out new <span className="text-blue-500 font-bold text-xl">AI</span> feature to enhance your profile bio</p>
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
  <input type="text" placeholder="React, Node, etc..." className="input input-md w-50 mb-2" value={skills} onChange={(e) => setSkills(e.target.value)} />
  <span>Skills</span>
</label>
<label className="floating-label">
  <input type="text" placeholder="About" className="input input-md w-50 mb-2" value={about} onChange={(e) => setAbout(e.target.value)} />
  <span>About</span>
</label>
<button
  type="button"
  className="btn btn-outline btn-sm mb-3"
  disabled={!about || aiLoading}
  onClick={handleImproveAbout}
>
  {aiLoading ? "Improving..." : "✨ Improve with AI"}
</button>

<span className="text-red-600">{error}</span>
    <div className="card-actions mt-4">
      <button className="btn btn-primary w-32" onClick={handleSaveProfile}>{isLoading ? "Saving..." : "Save"}</button>
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
    </div>
  )
}

export default EditProfile