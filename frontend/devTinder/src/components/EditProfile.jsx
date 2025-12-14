import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile =({ user })=> {
        const [firstName, setFirstName] =useState(user.firstName);
        const [lastName, setLastName] =useState(user.lastName);
        const [photoUrl, setPhotoUrl] =useState(user.photoUrl);
        const [age, setAge] =useState(user.age);
        const [gender, setGender] =useState(user.gender);
        const [about, setAbout] =useState(user.about);
        const [error, setError] = useState("");
        const dispatch = useDispatch();
        const [showToast, setShowTost] = useState(false);

        const saveProfile = async() => {
            setError("");
            try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {firstName,lastName,photoUrl,age,gender,about,}, { withCredentials:true });
            dispatch(addUser(res?.data?.data));
            setShowTost(true);
            setTimeout(() => {
                setShowTost(false);
            }, 3000);
            } catch (err) {
                setError(err.response.data);
            }
        }


    return (
      <>
        <div className=" min-h-screen w-full">
       <div className=" min-h-screen w-full flex justify-center pt-16  bg-cover bg-center " style={{backgroundImage: "url('https://cdn.shopify.com/s/files/1/0070/7032/articles/cover_20photo_ae0bed76-904c-4632-b191-02ab732c946d.png?v=1745611027')",}}>
         <div className="flex items-start gap-10">
    <div className="card bg-base-300 w-96  shadow-xl bg-opacity-90 ">
  <div className="card-body h-full ">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div >
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">First Name:</span>
         </div>
        <input type="text" value={firstName} className="input input-border w-full max-w-xs"  onChange={(e) => setFirstName(e.target.value)}/>
       </label>
             <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Last Name:</span>
         </div>
        <input type="text" value={lastName} className="input input-border w-full max-w-xs"  onChange={(e) => setLastName(e.target.value)}/>
       </label>
         <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Photo URL:</span>
         </div>
        <input type="text" value={photoUrl} className="input input-border w-full max-w-xs" onChange={(e) => setPhotoUrl(e.target.value)}/>
       </label>
       
         <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Age:</span>
         </div>
        <input type="number" value={age} className="input input-border w-full max-w-xs" onChange={(e) => setAge(e.target.value)}/>
       </label>
         <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Gender:</span>
         </div>
        <input type="text" value={gender} className="input input-border w-full max-w-xs" onChange={(e) => setGender(e.target.value)}/>
       </label>
         <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">About:</span>
         </div>
        <input type="text" value={about} className="input input-border w-full max-w-xs" onChange={(e) => setAbout(e.target.value)}/>
       </label>
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>

    <div className="w-96 ">
    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
    </div>
    </div>
    </div>
    {showToast && (
   <div className="toast toast-top toast-center">
   <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>
)}
    </>
    );
};
export default EditProfile;