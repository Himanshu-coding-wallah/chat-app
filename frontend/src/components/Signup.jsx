import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
// import { BASE_URL } from '..';


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", user.fullName);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("confirmPassword", user.confirmPassword);
    formData.append("gender", user.gender);
    formData.append("profilePhoto", user.profilePhoto);

    try {
      const res = await axios.post(`http://localhost:3000/api/user/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        console.log(res)
        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error.response?.data);

    }
    setUser({
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePhoto: null,
      gender: "",
    })

  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg bg-gray backdrop-blur-md border border-white/20 shadow-lg'>

        <h1 className='text-3xl font-bold text-center text-gray-800'>Signup</h1>

        <form onSubmit={onSubmitHandler} >
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-800'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Full Name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-800'>Username</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-800'>Email</span>
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Email' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-800'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-800'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Confirm Password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-800'>Profile photo</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, profilePhoto: e.target.files[0] })}
              className='w-full input input-bordered h-10'
              type="file"
              placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4 gap-4'>
            <div className='flex items-center text-gray-900'>
              <p className='mr-2'>Male</p>
              <input
                type="radio"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox" />
            </div>
            <div className='flex items-center text-gray-900'>
              <p className='mr-2'>Female</p>
              <input
                type="radio"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox " />
            </div>
          </div>
          <p className='text-center my-2 text-gray-800'>Already have an account? <Link to="/login"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup