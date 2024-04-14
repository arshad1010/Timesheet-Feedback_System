import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AdminSideBar.css'
function AdminSideBar() {
    const navigate = useNavigate();

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
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                {/* <li><Link to="/admin/change-password">Change Password</Link></li> */}
                <li><Link to="/admin/add-user">Add User</Link></li>
                <li><Link to="/admin/feedback-responses">Feedback Responses</Link></li>
                {/* <li><Link to="/admin/timesheet">Timesheets</Link></li> */}
                <li><Link to="/admin/feedback">Feedback</Link></li>
                <li><Link to="/admin/projects">Projects</Link></li>
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
                    <div className='logout-btn' onClick={handleLogout}>
                        <h6 style={{marginRight:10}}>{username}</h6>
                        <i class="bi bi-box-arrow-right"></i>
                    </div>
                </li>
            </ul>
    )
}

export default AdminSideBar
