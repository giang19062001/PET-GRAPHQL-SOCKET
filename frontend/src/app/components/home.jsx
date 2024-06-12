import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { GET_USERS } from "../graphql/user";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import { GET_CHATS } from "../graphql/chat";
import Blogs from "./blog";

const HomeComponent = () => {
  const { data: session  } = useSession();
  const [openChat, setOpenChat] = useState(false)
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USERS);
  const [getChats, { loading: loadingChat, error: errorChat, data: dataChat }] = useLazyQuery(GET_CHATS);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [typing, setTyping] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    // render lại các tin nhắn trước đó lưu trong DB
    if (dataChat) {
      setMessages((prevMessages) => [...prevMessages, ...dataChat.chats]);
      setOpenChat(true)
    }
  }, [dataChat])

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    if (session?.user.email) {
      socketRef.current.emit('register', session?.user.email); // lưu email của người nhận vào redis
    }
    socketRef.current.on('receive-typing', () => {
      setTyping(true)
    });

    socketRef.current.on('receive-message', (data) => {
      setTyping(false)
      setOpenChat(true)
      setRecipient(data.recipient)
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socketRef.current.off('receive-message');
    };
  }, []);

  const handleOpenChat = (email) => {
    // render lại các tin nhắn trước đó lưu trong DB
    getChats({ variables: { sender: session?.user.email, recipient: email } })
    // lưu email của người nhận 
    setRecipient(email)
  }

  const handleCloseChat = () => {
    setOpenChat(false)
  }
  const handelSetMessage = (text) => {
    setMessage(text)
  }
  const sendMessage = () => {
    socketRef.current.emit('send-message', { message: message, recipient: recipient, sender: session?.user.email });
    //gửi message cho người nhận , recipient: email của người nhận
    setMessage('');
  };
  const handleSendOn = (event) => {
    if (event.key === 'Enter') {
      setTyping(false)
      sendMessage()
    } else {
      socketRef.current.emit('typing', { recipient: recipient, sender: session?.user.email });
    }
  };

    return  session?.user && (
      <div>
        <Blogs></Blogs>
        {openChat && (<div className="fixed right-64 bottom-10 h-96 w-72  border-2	border text-white shadow-lg">
          <div className="px-3 py-2 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <h2 className="text-lg font-semibold p-1">Chat</h2>
            <button onClick={() => handleCloseChat()} className="bg-red-500 px-1 rounded-sm">x</button>
          </div>
          <div className="p-4 overflow-scroll w-full h-full flex flex-col	relative pb-32">
            {typing && (<small className="text-black absolute left-4 bottom-24">User is typing...</small>)}
              {messages.map((msg, index) => (
                <div key={index} >
                  <p className={`text-black ${msg.sender == session?.user.email ? 'float-right bg-blue-200 rounded-md p-2 w-fit mt-1' : 'float-left bg-gray-200 rounded-md p-2 w-fit mt-1'}`} key={index}>{msg.message}</p>
                  <br />
                </div>
              ))}

          </div>
          <div className="absolute bottom-0 p-1 flex items-center justify-between gap-2 w-full" >
            <input
              value={message}
              onChange={(e) => handelSetMessage(e.target.value)}
              onKeyUp={handleSendOn}
              type="text"
              className="w-full bg-gray-200 text-black rounded focus:outline-none p-2"
              placeholder="Aa"
            />
          </div>
        </div>)}

        <div className="fixed right-0 bottom-10 h-96 w-64  border-2	border text-white shadow-lg p-3">
          {data &&
            data.users.map((user, index) =>
              user.email !== session.user.email ? (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-2" onClick={() => handleOpenChat(user.email)}>
                    <div className="relative">
                      <Avatar alt="" src={user.image} />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <p className="mb-2 text-black">{user.name}</p>
                  </div>

                  <hr />
                </div>
              ) : null
            )}
        </div>
      </div>
    );
};

export default HomeComponent;
