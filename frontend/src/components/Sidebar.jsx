import React, { useEffect, useState } from 'react'
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { IoMdSearch } from "react-icons/io";

import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice.js';
import { setMessages } from '../redux/messageSlice.js';
// import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([])
    
    const otherUsers = useSelector(store=>store.user.otherUsers);
    
    useEffect(()=>{
        setUsers(otherUsers)
    }, [])
    
    console.log(users)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        
        const conversationUser = users?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col h-full'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <IoMdSearch className='w-6 h-6 outline-none'/>
                </button>   
            </form>
            <div className="divider px-3"></div> 
            <div className='flex-1 overflow-y-auto'>
                <OtherUsers/> 
            </div>
            <div>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar