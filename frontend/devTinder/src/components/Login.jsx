import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login =()=>{
    const [emailId,setEmailId] =useState("puja@gmail.com");
    const [password,setPassword] =useState("Puja@123");
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

    return ( 
    <div className=" min-h-screen flex justify-center items-center bg-cover bg-center " style={{backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681400054984-c20bf5879c3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D')",}}>
         
    <div className="card bg-base-300 w-96 shadow-xl bg-opacity-90 -translate-y-30">
  <div className="card-body ">
    <h2 className="card-title justify-center">Login</h2>
    <div >
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
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
    );

};
export default Login;