import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch} from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
const BASE_URL = 'https://backend-chat-application-pwpe.onrender.com';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUser = async() => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user/`);
                // store
                //console.log(res.data);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUser();
    }, [])
}

export default useGetOtherUsers