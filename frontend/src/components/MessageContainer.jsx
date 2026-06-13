import React, { useEffect, useState } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice.js';

const MessageContainer = () => {
    const selectedUsers  = useSelector(store => store.user.selectedUsers);
    const authUser  = useSelector(store => store.user.authUser);
    const dispatch = useDispatch();
    // const [selectedUser, setSelectedUser] = useState(1)
    // const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
        
            {
                selectedUsers !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            <div 
                            // className={`avatar ${isOnline ? 'online' : ''}`}
                            >
                                <div className='w-12 rounded-full'>
                                    <img 
                                    src={selectedUsers?.profilePhoto} 
                                    alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>
                                      {selectedUsers?.fullName}
                                      </p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) :(
                  <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-white font-bold'>
                          Hi,{authUser?.fullName} 
                          
                          </h1>
                        <h1 className='text-2xl text-white'>Let's start conversation</h1>

                  </div> 
                )
          
            }
        </>

    )
}

export default MessageContainer