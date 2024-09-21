import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
const BASE_URL = 'https://backend-chat-application-pwpe.onrender.com';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const {messages} = useSelector(store=>store.message);
    useEffect(() => {
        const fetchMessages = async () => {
            // Check if selectedUser exists and has a valid _id
            if (selectedUser?._id) {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`);
                    console.log(res.data); // Log the actual response data
                    dispatch(setMessages(res.data));
                } catch (error) {
                    console.error(error); // Catch any error during the API request
                }
            } else {
                console.log('selectedUser is not defined or does not have a valid _id');
            }
        };

        fetchMessages();
    }, [selectedUser,setMessages,messages]); // Adding selectedUser as a dependency
};

export default useGetMessages;
