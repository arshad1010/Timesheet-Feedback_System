import React, { useState } from 'react';
import './ForgotPassword.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post("http://localhost:3001/api/users/forgot-password", {email})
    .then(response => {
      const userData = response.data.user; // Assuming the user data is returned in the response
      console.log(userData);
      setLoading(false);
      toast.success("Check your email for password recovery");
      navigate('/'); 
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
      toast.error("Invalid Email");
    })
    console.log('Email:', email);
    setEmail('');
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className='register'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='email'
            id='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <hr></hr>
        <ClipLoader color={"#000"} loading={loading} css={override} size={35} />
        {!loading && <button type='submit'>Send Mail</button>}
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
