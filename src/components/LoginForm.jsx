import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material UI

export default function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  // State to manage loading
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true); // Start loader
    console.log(`URL============>${import.meta.env.VITE_BASE_URL}/auth/login`);
    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, { withCredentials: true })
      .then(response => {
        if (response.data.data.role === "admin") {
          localStorage.setItem('userId', response.data.data._id);
          localStorage.setItem('userName', response.data.data.name);
          navigate(`/home/hotels`);
        } else {
          alert('Unauthorized Access');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false); // Stop loading after navigation
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
      <input 
        type="email" 
        id="email"  
        {...register("email", { required: true })} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      {errors.email && <span className="text-white text-sm font-bold">This field is required</span>}

      <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
      <input 
        type="password" 
        id="password" 
        {...register("password", { required: true })} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors.password && <span className="text-white text-sm font-bold">This field is required</span>}

      {loading ? (
        <div className="w-full flex justify-center mb-4">
          <CircularProgress />  
        </div>
      ) : (
        <input 
          className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"  
          type="submit" 
          value={"LOGIN"}
        />
      )}
    </form>
  );
}
