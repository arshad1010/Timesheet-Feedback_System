import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './UserSideBar.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function UserSideBar() {

    const location = useLocation();
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   const handleBeforeUnload = (event) => {
    //     // Check if the URL pathname is different from the expected logout destination
    //     if (location.pathname !== '/') { // Adjust '/login' to your logout destination
    //       // Cancel the navigation if the user tries to go back
    //       event.preventDefault();
    //       // Navigate to the desired location after logout
    //       navigate('/'); // Change '/login' to the desired logout destination
    //     }
    //   };
  
    //   // Add the event listener when the component mounts
    //   window.addEventListener('beforeunload', handleBeforeUnload);
  
    //   // Clean up the event listener when the component unmounts
    //   return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    //   };
    // }, [location.pathname, navigate]);

    const userDataString = localStorage.getItem('user');
    if (!userDataString) {
      console.error('User data not found in local storage');
      return;
    }

    const user = JSON.parse(userDataString);
    const username = user.username;

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/')
    };

    return (
            <ul>
                {/* <li><Link to="/user-page/dashboard">Dashboard</Link></li> */}
                <li><Link to="/user-page/">Change Password</Link></li>
                <li><Link to="/user-page/timesheet">Timesheets</Link></li>
                <li><Link to="/user-page/feedback">Feedback</Link></li>
                <li><Link to="/leave">Leave</Link></li>
                <li><Link to="/wfh">Work from Home</Link></li>
                <li><Link to="/survey">Survey</Link></li>
                <li><Link to="/service-desk">Service Desk</Link></li>
                <li><Link to="/forms">Forms</Link></li>
                <li><Link to="/travel">Travel</Link></li>
                <li><Link to="/expenses">Expenses</Link></li>
                <li><Link to="/resourcing">Resourcing</Link></li>
                <hr></hr>
                <br></br>
                <li> 
                    <div className='logout-btn' onClick={handleLogout} >
                        <h6 style={{marginRight:10}}>{username}</h6>
                        <i class="bi bi-box-arrow-right"></i>
                    </div>
                </li>
            </ul>
    )
}

export default UserSideBar
