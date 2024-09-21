import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

function OtherUser({ user }) {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers ? onlineUsers.includes(user._id) : false;

    const selectedUserHandler = () => {
        dispatch(setSelectedUser(user));
    }

    return (
        <div>
            <div onClick={selectedUserHandler} className={`${selectedUser && selectedUser._id === user._id ? 'bg-zinc-200' : ''} flex gap-2 items-center hover:bg-zinc-300 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="profile-picture" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between items-center gap-2'>
                        <p className='text-black'>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </div>
    )
}

export default OtherUser;