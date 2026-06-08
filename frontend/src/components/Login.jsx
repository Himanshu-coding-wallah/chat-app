import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user)
    try {
      const res = await axios.post(`http://localhost:3000/api/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
    }
    console.log(user)
    setUser({
      email: "",
      password: ""
    })

  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg bg-gray backdrop-blur-md border border-white/20 shadow-lg'>

        <h1 className='text-3xl font-bold text-center text-gray-800'>Login</h1>

        <form onSubmit={onSubmitHandler} >
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
          <p className='text-center my-2 text-gray-800'>Don't have an account? <Link to="/signup"> Signup </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login