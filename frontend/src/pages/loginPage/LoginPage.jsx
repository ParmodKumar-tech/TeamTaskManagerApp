import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../api/user.api';
import { useEffect } from 'react';

function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const {setUserName,setUserId,setRole,setTaskCount}=useAuth();
  const navigate = useNavigate();

  const formFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  const onSubmit = async (data) => {
    const toastId = toast.loading("please wait...");

    const res = await loginUser(data);
    toast.dismiss(toastId);

    if (res.success) {
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userId",res.data._id);
      localStorage.setItem("role", res.data.role);
      setTaskCount({
        totalTask: 0,
        pendingTask: 0,
        completedTask: 0,
        overdueTask: 0,
      });
      
      setUserName(res.data.name);
      setUserId(res.data._id);
      setRole(res.data.role);
      toast.success(res.message);
      
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='w-full h-screen flex items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-blue-100 m-5 w-[80%] md:w-[70%] lg:w-[45%] mx-auto border border-gray-400 rounded-md p-4 my-10'
      >
        <div className='flex items-center'>
          <h1 className='text-2xl my-2'>Login to your account!</h1>
          <p className='mx-2'>|</p>
          <span className='text-sm mt-1'>
            Don't have an account?
            <Link to="/signup" className='text-pink-600 mx-1'>
              Signup
            </Link>
          </span>
        </div>

        {formFields.map((field) => (
          <div key={field.name}>
            <div className='flex mt-4'>
              <label className='mr-1'>{field.label}</label>
              <span className='text-red-500'>
                {errors[field.name] && errors[field.name].message}
              </span>
            </div>

            <input
              type={field.type}
              className='w-full border rounded-md p-1'
              {...register(field.name, { required: "*Required" })}
              placeholder={`Enter ${field.label}`}
            />
          </div>
        ))}

        <button
          type='submit'
          className='mt-3 p-1 border rounded w-full text-white font-semibold bg-pink-600 cursor-pointer'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." :"Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;