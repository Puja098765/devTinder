import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard =({ user })=> {
    if (!user) return null; 
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
      try {
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials:true });
        console.log(res);
        dispatch(removeUserFromFeed(userId));
      } catch(err) {
         console.log(err);
      }
    };
    return (

<div className="card bg-base-300 h-[520px] w-96 shadow-sm">
  <figure className="h-90 overflow-hidden">
    <img
      src={user.photoUrl}
      alt="photo"
      className="h-full w-full object-cover"
      />
  </figure>
  <div className="card-body flex flex-col justify-between overflow-hidden">
    <h2 className="card-title">{firstName + " " + lastName }</h2>
   {age && gender && <p>{age + ", " + gender }</p> }
    <p className=" max-h-24">{about}</p>
    <div className="card-actions justify-center my-4">
   <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
   <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
    </div>
   
  </div>
</div> 
);
   

};
export default UserCard;