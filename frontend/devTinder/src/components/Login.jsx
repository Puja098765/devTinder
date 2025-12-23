import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login =()=>{
    const [emailId,setEmailId] =useState("");
    const [password,setPassword] =useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const[isLoginForm,setIsLoginForm] = useState(true);
     const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    // fun  make an api call to login by axios inplace of fetch
    const handleLogin = async ()=>{
       
     try {
       const res = await axios.post( BASE_URL + "/login", {
        emailId,
        password,
       },
       { withCredentials: true }
       
    );
    // console.log(res.data);
    dispatch(addUser(res.data));
    return navigate("/");
     } catch (err) {
      setError(err?.response?.data || "Something went wrong");
       
     }
    }; 

    const handleSignUp =async () =>{
      try {
         const res = await axios.post(BASE_URL + "/signup", {firstName,lastName,emailId,password }, { withCredentials:true});
         dispatch(addUser(res.data.data));
         return navigate("/profile");
      } catch(err) {
          setError(err?.response?.data || "Something went wrong");
      }
    };

    return ( 
    <div className=" min-h-screen flex justify-center items-center bg-cover bg-center " style={{backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681400054984-c20bf5879c3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D')",}}>
         
    <div className="card bg-base-300 w-96 shadow-xl bg-opacity-90 -translate-y-30 mt-20">
  <div className="card-body ">
    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
    <div >
    {!isLoginForm && (
      <>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">First Name</span>
         </div>
        <input type="text" value={firstName} className="input input-border w-full max-w-xs"  onChange={(e) => setFirstName(e.target.value)}/>
       </label>
        <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Last Name</span>
         </div>
        <input type="text" value={lastName} className="input input-border w-full max-w-xs"  onChange={(e) => setLastName(e.target.value)}/>
       </label>
       </> 
    )}
        <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Email ID</span>
         </div>
        <input type="text" value={emailId} className="input input-border w-full max-w-xs"  onChange={(e) => setEmailId(e.target.value)}/>
       </label>
        <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Password</span>
         </div>
        <input type="password" value={password} className="input input-border w-full max-w-xs" onChange={(e) => setPassword(e.target.value)}/>
       </label> 
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignUp}>{isLoginForm? "Login" : "Sign Up"}</button>
    </div>
    <p className="m-auto cursor-pointer py-2" onClick={()=>setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? Signup Here": "Existing User? Login Here"}</p>
  </div>
</div>
    </div>
    );

};
export default Login;