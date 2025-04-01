import React, { useState } from 'react';
import signupimg from '../images/signup.webp';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [ifsignup, setifsignup] = useState(true);
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(null);
  const nav = useNavigate()

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validatePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setIsValid(passwordRegex.test(inputPassword));
  };

  const validateEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(emailRegex.test(inputEmail));
  };

  const signup = async(e) => {
    e.preventDefault();
    const data = {
        name:e.target.name.value,
        email:e.target.email.value,
        password:e.target.password.value
    }
    console.log(data)
    try {
        const responce = await axios.post(`${import.meta.env.VITE_localhost}/user/sign-up`, data)
        "i loveyou"
        console.log(responce)
    }
    catch(err) {
        console.log("mistake")
        console.log(err.message)
    }
   
  };

  const handlelogin = async(e)=> {
    e.preventDefault();
    const data = {
        useremail:e.target.useremail.value,
        userpassword:e.target.userpassword.value
    }
    console.log(data)
    try {
        const responce = await axios.post(`${import.meta.env.VITE_localhost}/user/log-in`,data)
        console.log(responce)
        if(responce.status == 200) {
            Cookies.set("webtoken", JSON.stringify(responce.data.token))
            nav("/rent/laskdf")

        }
        

    }
    catch(err) {
        console.log(err)
        if(err.status === 400) alert(err.response.data.message)
    }
  }
  return (
    <div className='text-white grid grid-cols-1 md:grid-cols-2 shadow-[2px_3px_10px_white] rounded-[30px] m-[50px_10px] md:m-[50px_50px] lg:m-[100px_200px] overflow-hidden'>
      <div className='p-[20px] flex flex-col gap-[10px]'>
        <div className='grid grid-cols-2 gap-[20px]'>
          <button className='rounded-[8px] border cursor-pointer border-slate-400 flex items-center gap-[10px] p-[8px_10px]'>
            <FcGoogle className='text-[20px]' /> Sign up with Google
          </button>
          <button className='rounded-[8px] border cursor-pointer border-slate-400 flex items-center gap-[10px] p-[8px_10px]'>
            <FaApple className='text-white text-[20px]' /> Sign up with Apple
          </button>
        </div>

        {ifsignup ? (
          <form onSubmit={handlelogin}>
            <fieldset className='border border-slate-400 rounded-[10px]'>
              <legend className='ms-[20px]'>Email</legend>
              <input
                type='email'
                placeholder='User Email'
                value={email}
                name='useremail'
                onChange={validateEmail}
                className='focus:outline-none w-full p-[4px_10px] rounded-[8px]'
              />
            </fieldset>
            {isEmailValid === false && (
              <p className='text-red-500 text-[12px] mt-1'>Invalid email format</p>
            )}

            <fieldset className='border border-slate-400 rounded-[10px]'>
              <legend className='ms-[20px]'>Password</legend>
              <input
                type='password'
                name='userpassword'
                placeholder='User password'
                className='focus:outline-none w-full p-[4px_10px] rounded-[8px]'
              />
            </fieldset>
            <div className='text-end text-[15px] text-blue-500 font-semibold'>
              <small>Forgot password?</small>
            </div>

            <button type='submit' className='w-full mt-3 rounded-[8px] border cursor-pointer border-slate-400 p-[10px_20px]'>
              Login
            </button>

            <div className='text-end text-[15px] text-blue-500 font-semibold'>
              <button
                type='button'
                className='underline'
                onClick={() => setifsignup(false)}
              >
                New user?
              </button>
            </div>
          </form>
        ) : (
          <form className='flex flex-col gap-2' onSubmit={signup}>
            <fieldset className='border border-slate-400 rounded-[10px]'>
              <legend className='ms-[20px]'>Name</legend>
              <input
                type='text'
                name='name'
                placeholder='Name'
                className='focus:outline-none w-full p-[4px_10px] rounded-[8px]'
              />
            </fieldset>

            <fieldset className='border border-slate-400 rounded-[10px]'>
              <legend className='ms-[20px]'>Email</legend>
              <input
                type='email'
                placeholder='User Email'
                value={email}
                name='email'
                onChange={validateEmail}
                className='focus:outline-none w-full p-[4px_10px] rounded-[8px]'
              />
            </fieldset>
            {isEmailValid === false && (
              <p className='text-red-500 text-[12px] mt-1'>Invalid email format</p>
            )}

            <fieldset className='border border-slate-400 rounded-[10px]'>
              <legend className='ms-[20px]'>Password</legend>
              <input
                type='password'
                placeholder='User password'
                value={password}
                onChange={validatePassword}
                className='focus:outline-none w-full p-[4px_10px] rounded-[8px]'
                name='password'
              />
            </fieldset>
            {isValid === false && (
              <p className='text-red-500 text-[12px] mt-1'>
                Password must be 8+ chars with a number & special character
              </p>
            )}
            {isValid === true && (
              <p className='text-green-500 text-[12px] mt-1'>Password is strong</p>
            )}

            <button type='submit' className='w-full mt-3 rounded-[8px] border cursor-pointer border-slate-400 p-[10px_20px]'>
              Sign Up
            </button>

            <div className='text-end text-[15px] text-blue-500 font-semibold'>
              <span className='underline' onClick={() => setifsignup(true)}>
                Already have an account?
              </span>
            </div>
          </form>
        )}
      </div>
      <div className='flex justify-center items-center'>
        <img className='rounded-[10px]' width='100%' src={signupimg} alt='Signup Illustration' />
      </div>
    </div>
  );
};

export default Login;
