import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const OtherUser = ({user}) => {
    const dispatch = useDispatch()
    const selectedUsers = useSelector(state => state.user.selectedUsers)
    const selectedUserHandler = (user)=>{
        // console.log(user)
        dispatch(setSelectedUser(user))
    }
  return (
    <>
        <div
        onClick={()=>selectedUserHandler(user)}
        className={`${selectedUsers?._id === user?._id ? 'bg-zinc-900' : ''} flex gap-2 items-center hover:bg-zinc-900 rounded p-2 cursor-pointer`}>
            <div className='avatar online'>
                <div className='w-12 rounded-full'>
                    <img src={user.profilePhoto} alt="" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                    <p>{user.fullName}</p>
                </div>
            </div>
        </div>
        <div className=''></div>
    </>
  )
}

export default OtherUser