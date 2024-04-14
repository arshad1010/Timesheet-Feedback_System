import React, { useState } from 'react';
import './AddUser.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [userRole, setUserRole] = useState(''); // Add state for userRole

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/api/users/add-user", { username, email, role, userRole }) // Send userRole in the request
      .then(result => {
        toast.success('User Added Successfully');
        console.log(result)
      })
      .catch(err => console.log(err));

    // Clear form fields after submission
    setUsername('');
    setEmail('');
    setRole('');
    setUserRole('');
  };

  return (
    <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{ padding: 20 }}>JIN</h3>
          <hr></hr>
          <AdminSideBar />
        </div>
        <div className='col'>
          <div className='add-user-page'>
            <h2>Add User</h2>
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
                  type='email'
                  id='email'
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type='text'
                  id='userRole'
                  value={userRole}
                  placeholder='User Role' // Add input for userRole
                  onChange={(e) => setUserRole(e.target.value)}
                  required
                />
              </div>
              <div className='options'>
                <label>
                <input
                  type='radio'
                  id='role'
                  name='role'
                  value="Admin"
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <p>Admin</p>
                </label>
                <label>
                <input
                  type='radio'
                  id='role'
                  name='role'
                  value="User"
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <p>User</p>
                </label>
              </div>
              <button className='add-user-btn' type='submit'>Add User</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddUser;
