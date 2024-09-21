import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

function MessageContainer() {
    const { selectedUser, authUser, onlineUsers } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isOnline = onlineUsers ? onlineUsers.includes(selectedUser?._id) : false;

    useEffect(() => {
        return () => {
            if (selectedUser) {
                dispatch(setSelectedUser(null));
            }
        };
    }, []); 

    return (
        <>
            {selectedUser !== null ? (
                <div className='md:min-w-[550px] flex flex-col relative'>
                    <div className='flex gap-2 items-center text-white bg-zinc-800 px-4 py-2 mb-2'>
                        <div className={`avatar ${isOnline ? 'online' : ''}`}>
                            <div className='w-12 rounded-full'>
                                {selectedUser?.profilePhoto && <img src={selectedUser.profilePhoto} alt="profile-picture" />}
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between items-center gap-2'>
                                {selectedUser?.fullName && <p>{selectedUser.fullName}</p>}
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                    {authUser?.fullName && <h1 className='text-4xl font-bold'>Hi, {authUser.fullName} </h1>}
                    <h1 className='text-2xl '>Let's start conversation</h1>
                </div>
            )}
        </>
    );
}

export default MessageContainer;