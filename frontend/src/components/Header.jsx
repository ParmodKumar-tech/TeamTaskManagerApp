import React, { useState } from 'react';
import {Link, NavLink } from 'react-router-dom';

import { logoutUser } from '../api/user.api';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

function Header(){
    const {userName,setUserName,userId, setUserId ,role,setRole}=useAuth();
    const [menuItems,setMenuItems]=useState(false);
  
    const handleLogout=async()=>{
        const toastId = toast.loading("logout...");

        const res=await logoutUser();
        toast.dismiss(toastId);

        if(res.success){
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("userId");
            toast.success(res.message);
            setUserName(null);
            setUserId(null);
            setRole(null);
        }
        else{
            toast.error(res.message);
        }
        
    }


    const handleMenuItems=()=>{
        setMenuItems(!menuItems);
    }

    const handleAutoCloseMenu=()=>{
        setMenuItems(false);
    }
    return(
        <header className='mb-2 w-screen bg-blue-100 flex items-center gap-2 p-2 z-10'>
        
        <div className='w-[50%] mx-2 p-2 '>

        <div className='flex flex-col'>
        <Link to="/"><h2 className='font-bold sm:text-xl lg:text-xl shadow-transparent inline'>Team Task Manager App</h2></Link>
        <p className=''>{userName?'Welcome Back!':'Login/Signup for view your tasks!'}</p>
        </div>
        
        </div>

        <nav className='w-[50%] flex flex-row md:h-fit items-center justify-center'>
            
            <ul className={'flex flex-row items-center justify-center'}>
                {userName && role && userId &&
                <div className='flex'>
                <li onClick={handleLogout} className='mx-2 rounded p-2 bg-red-600 text-white font-semibold shadow-2xl'><NavLink to="#">Logout</NavLink></li>
                
                </div>
                }

                {!userName &&
                <li onClick={handleAutoCloseMenu} 
                className='rounded p-2  bg-pink-600 text-white font-semibold shadow-2xl'>
                    <NavLink to="/login">Login/Signup</NavLink></li>
                }
                    
                {

                <div className='hidden md:flex'>    
                <p className='my-auto font-bold mx-2'>|</p>
                <div className='flex flex-col'>
                <p>{userName?`${userName} (${role})`:"Not login"}</p>
                <p>{userId && `${userId}`}</p>
                </div>
                </div>
                }
            </ul>
            
        </nav>
       </header>

    )
}

export default Header;
