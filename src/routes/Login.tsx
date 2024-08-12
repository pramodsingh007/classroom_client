import React from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigator = useNavigate()
  const onLoginHandler = async(email,password,role)=>{
    try {
      // Endpoint for login; adjust based on your API
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, {
        email,
        password,
        role
      });

      // Assuming the response contains a token or session information
      console.log('Login successful:', response.data);
      toast("Login successfull",{type:'success'})
      // Handle successful login (e.g., store token, redirect)
      localStorage.setItem('authToken', response.data.token); // Example token storage
      // Redirect or update UI as needed
      navigator(`/${role}`)
    } catch (error) {
      toast('Invalid email or password',{type:'error'})
      console.error('Login failed:', error.response?.data || error.message);
      // Show error to the user
    }
  };
  

  return (
    <>
    <LoginForm onLogin={onLoginHandler}/>
    <ToastContainer/>
    </>
  )
}

export default LoginPage