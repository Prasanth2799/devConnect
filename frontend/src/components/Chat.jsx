import { useEffect, useState } from "react"
import {createSocketConnection} from "../utils/socket"
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const Chat = () => {
const[messages, setMessages] = useState([])
const[newMessage, setNewMessage] = useState("");
const {targetUserId} = useParams();
const user = useSelector(store => store.user);
const userId = user?._id
const fetchChatMessages = async () => {
  try{
    const chat = await axios.get(BASE_URL+"/chat/"+targetUserId, {withCredentials : true});
    console.log(chat.data.messages)
    const chatMessages = chat?.data?.messages.map(msg => {
      const {senderId, text} = msg;
      return {firstName : senderId?.firstName, lastName : senderId?.lastName , text}

    })
    setMessages(chatMessages);
  }catch(err){
    console.error("ERROR: "+err.message)
  }
}
useEffect(() => {
  fetchChatMessages();
},[])
useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection()
    // As soon as the page loads, the socket connection is made and joinChat event emits
    socket.emit("joinChat", {targetUserId, userId})
    socket.on("messageReceived", ({firstName, lastName, text}) => {
        setMessages(messages => [...messages, {firstName, lastName, text}])
    } )
    return () => {
        socket.disconnect()
    }
}, [userId, targetUserId])

const sendMessage = () => {
    const socket = createSocketConnection()
    socket.emit("sendMessage", {
        firstName : user?.firstName,
        lastName : user?.lastName,
        userId,
        targetUserId,
        text : newMessage
    })
    setNewMessage("")
}
  return (
    <div className="w-full md:w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="border-b border-gray-600 p-2">Chat</h1>
        <div className="flex-1 overflow-scroll p-5">
            {messages.map((msg, index) => {
                return (
                    <div key={index}>
                        <div className={"chat "+ (user?.firstName === msg?.firstName ? "chat-end" : "chat-start")}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
    </div>
  </div>
  <div className="chat-header">
    {msg?.firstName+ " " +msg?.lastName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{msg?.text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
{/* <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div> */}
                    </div>
                )
            })}
        </div>
        <div className="p-5 border-t-gray-600 flex items-center gap-2">
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 border border-gray-600 text-white rounded p-2"/>
            <button onClick={sendMessage} className="btn btn-info">Send</button>
        </div>
    </div>
  )
}

export default Chat