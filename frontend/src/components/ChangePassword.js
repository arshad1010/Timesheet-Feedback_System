import React, { useState } from 'react';
import './UserPage.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import UserSideBar from './UserSideBar';
import './ChangePassword.css'

function ChangePassword({userData}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // const navigate=useNavigate();
  console.log(userData)

  const userDataString = localStorage.getItem('user');
    if (!userDataString) {
      console.error('User data not found in local storage');
      return;
    }

    const user = JSON.parse(userDataString);
    const username = user.username;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('Passwords do not match');
      return;
    }

    axios.post("http://localhost:3001/api/users/change-password", {username, currentPassword, newPassword})
    .then(response => {
        console.log(response)
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('Password changed successfully');
    })
    .catch(err=>{
      console.log(err)
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('Invalid password');
    })
  };

  return (
    // <div className="main container-fluid">
    <div className='row srow'>
      {/* <div className='side-bar col-lg-2'>
        <h3 style={{padding:20}}>JIN</h3>
        <hr></hr>
        <UserSideBar />
      </div> */}
      <div className='col'>
      <div className='user-page'>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='password'
            id='currentPassword'
            value={currentPassword}
            placeholder='Current Password'
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            id='newPassword'
            value={newPassword}
            placeholder='New Password'
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='change-password' >Change Password</button>
        {error && <p className='message1'>{error}</p>}
        {message && <p className='message'>{message}</p>}
      </form>
    </div>
      </div>
    </div>  
  // </div>
    
  );
}

export default ChangePassword;
