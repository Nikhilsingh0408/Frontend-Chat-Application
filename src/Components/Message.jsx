import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import store from '../redux/store';

function Message({message}) {
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store=>store.user);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:'smooth'});
    }, []);

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }); // Get the current time in HH:MM format

    return (
        <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={authUser?._id === message?.senderId ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{currentTime}</time>
            </div>
            <div className={`chat-bubble ${authUser?._id === message?.senderId ? 'bg-blue-300 text-black' : 'text-white'} `}>{message?.message}</div>
        </div>
    )
}

export default Message