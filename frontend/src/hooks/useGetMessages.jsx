import React, { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '..';

const useGetMessages = () => {
    const selectedUsers = useSelector(state => state.user.selectedUsers)
// console.log(selectedUsers)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:3000/api/message/receive/${selectedUsers?._id}`);
                // console.log()
                dispatch(setMessages(res.data.messages))
            } catch (error) {
                console.log(error.response);
                dispatch(setMessages([]))

            }
        }
        fetchMessages();
    }, [selectedUsers?._id,setMessages]);
}

export default useGetMessages