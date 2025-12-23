import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections =()=>{
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
          const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true,});
          dispatch(addConnections(res.data.data));
        } catch (err) {
         console.log(err);
        }
    };

    // As this page load fetchconn calll once
    useEffect(()=> {
        fetchConnections();
    },[]);

    if(!connections) return;
    if (connections.length === 0) return <h1 className="flex justify-center my-10"> No Connection Found</h1>
    return (
        <div className="min-h-screen w-full  bg-no-repeat bg-center text-center text-center items-start pt-20 relative" style={{
      backgroundImage:
        "url('https://media.istockphoto.com/id/2193558493/photo/social-media-followers.jpg?s=612x612&w=0&k=20&c=OB1bPfDagbKgcbyX6YOpkuzgmfagIozJ3_NioC0qx7Q=')",
         backgroundSize: "cover",
         backgroundPosition:"center",
    }}>
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            <h1 className="font-bold text-5xl text-gray-800">Connections</h1>
            {connections.map((connection) => {
                const { _id,firstName, lastName, photoUrl, age, gender, about } = connection;
                return (
                   <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                    <div>
                        <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                           {age && gender && <p>{age + " , "  + gender}</p>}
                            <p>{about}</p>
                   
                    </div>
                  <Link to={`/chat/${_id}`}> <button className="btn btn-primary">Chat</button> </Link>
                    </div>
                );
                
})}
            </div>
    );
};
export default Connections;