import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupUser } from '../../api/user.api';
import { useAuth } from '../../hooks/useAuth';

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { setUserName, setUserId ,setRole } = useAuth();

  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Role", name: "role", type: "radio", options: ["member", "admin"] }
  ];

  const onSubmit = async (data) => {
    const toastId = toast.loading("please wait...");

    const res = await signupUser(data);
    toast.dismiss(toastId);

    if (res.success) {
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data._id);

      setUserName(res.data.name);
      setUserId(res.data._id);
      setRole(res.data.role);

      setTaskCount({
        totalTask: 0,
        pendingTask: 0,
        completedTask: 0,
        overdueTask: 0,
      });


      toast.success(res.message);

      navigate("/");
    } else {
      toast.error(res.message);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className='w-full h-screen flex items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-blue-100 m-5 w-[80%] md:w-[70%] lg:w-[45%] mx-auto border border-gray-400 rounded-md p-4 my-10'
      >
        <div className='flex items-center'>
          <h1 className='text-2xl my-2'>Signup to your account!</h1>
          <p className='mx-2'>|</p>
          <span className='text-sm mt-1'>
            Already have an account!
            <Link to="/login" className='text-pink-600 mx-1'>
              Login
            </Link>
          </span>
        </div>

        {formFields.map((field) => (
          <div key={field.name} className='mt-4'>
            <div className='flex'>
              <label className='mr-1'>{field.label}</label>
              <span className='text-red-500'>
                {errors[field.name] && errors[field.name].message}
              </span>
            </div>

            {field.type === "radio" ? (
              <div className='flex gap-4 mt-2'>
                {field.options.map((option) => (
                  <label key={option} className='flex items-center gap-1'>
                    <input
                      type="radio"
                      value={option}
                      {...register(field.name, { required: "*Required" })}
                    />
                    <span className='capitalize'>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={field.type}
                className='w-full border rounded-md p-1'
                {...register(field.name, { required: "*Required" })}
                placeholder={`Enter ${field.label}`}
              />
            )}
          </div>
        ))}

        <button
          className='mt-3 p-1 border rounded w-full text-white font-semibold bg-pink-600 cursor-pointer'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;