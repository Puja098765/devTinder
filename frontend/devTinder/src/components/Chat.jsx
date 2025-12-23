import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = ()=> {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store)=> store.user);
    const userId = user?._id;

   const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {withCredentials: true,});
     
    const chatMessages = chat?.data?.messages.map((msg) =>{
        const {senderId, text} = msg;
        return {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text,
        };
    });
    setMessages(chatMessages);
   };
   useEffect(()=> {
    fetchChatMessages();
   },[]);

   useEffect(() => {
    if (!userId) {
        return;
    }
     const socket =createSocketConnection();
    //  As soon as the page loaded the socket connection is made and joinChat event is emmited
     socket.emit("joinChat", { firstName: user.firstName,  userId, targetUserId});
     socket.on("messageReceived", ({ firstName,lastName, text }) => {
     setMessages((messages) =>[...messages, { firstName,lastName, text }]);
     });
     
     return () => {
        socket.disconnect();
     };
   },[userId, targetUserId]);

   const sendMessage =()=> {
    const socket =createSocketConnection();
    socket.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
        text: newMessage,
    });
    setNewMessage("");
   };


    return (
    <div className="min-h-screen bg-[url('https://www.shutterstock.com/image-vector/social-media-sketch-vector-seamless-600nw-1660950727.jpg')] bg-cover bg-center pt-8 flex justify-center items-center">

    <div className="w-3/4  border-2 border-gray-950 m-5 h-[70vh] flex flex-col bg-white/20  " >
        <h1 className="p-5 text-3xl font-bold  border-b-2 border-gray-900 text-gray-800">Chat Box</h1>
        <div className="flex-1 overflow-scroll p-5"> {/* display messages */} 
       {messages.map((msg,index) => {
        return (
            <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
             <div className="chat-header text-gray-600">
              {`${msg.firstName} ${msg.lastName}`}
          <time className="text-xs opacity-90 text-gray-800">2 hours ago</time>
  </div>
  <div className="chat-bubble text-gray-300">{msg.text}</div>
  <div className="chat-footer opacity-90 text-gray-900">Seen</div>
</div>
        );
       })}


        </div>
        <div className="p-5 border-t-1 border-gray-800 flex items-center gap-2">
            <input value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} className="flex-1 border-1 border-gray-800 text-gray-800 rounded p-2"></input>
            <button onClick={sendMessage} className="text-gray-800 btn btn-secondary">Send</button>
        </div>
    </div>
    </div>);
};
export default Chat;