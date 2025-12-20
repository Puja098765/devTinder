import { useDispatch ,useSelector} from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed =()=>{
const feed = useSelector((store) => store.feed);    
const dispatch = useDispatch();

    const getFeed = async ()=> {
        // if (feed) return;
        if (feed && feed.length) return <h1 flex justify-center my-10>No new users founds!</h1>; 
        try {
        const res= await axios.get(BASE_URL + "/feed", {withCredentials:true});
        dispatch(addFeed(res?.data?.data));
        } catch (err) {

        }

    };

    useEffect(()=> {
        getFeed();
    },[]);
    // if (feed && feed.length) return <h1 flex justify-center my-10>No new users founds!</h1>; 
    return ( 
        
        feed && (
            
    <div className="flex justify-center my-10">
  <UserCard user={feed[0]}/>
    </div>
        )
    );
};
export default Feed;