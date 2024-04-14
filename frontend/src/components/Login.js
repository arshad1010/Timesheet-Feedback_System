import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/api/users/login", {username, password})
    .then(response => {
      const { token, userData } = response.data;
      console.log(userData);
      localStorage.setItem('token', token); // Store token in local storage
      localStorage.setItem('user', JSON.stringify(userData))
      if(userData.role==="Admin") navigate('/admin/dashboard')
      else navigate('/user-page', { state: { userData: userData } }); 
    })
    .catch(err=>{
      console.log(err)
      console.log("invalid")
      toast.error('Invalid credentials');
      // setError('Invalid username or password');
    })
    console.log('Username:', username);
    console.log('Password:', password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            id='username'
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            id='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <button type='submit' className='login-btn'>Login</button>
        <hr></hr>
        <Link to='/forgot-password' style={{color:'blue'}}>Forgot Password ?</Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
