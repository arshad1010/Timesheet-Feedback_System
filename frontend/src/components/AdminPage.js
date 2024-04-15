import React from 'react';
import './AdminPage.css'
// import AddUser from './AddUser';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import ChangePassword from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminPage() {

  const navigate = useNavigate();

  const location = useLocation();
  const userData = location.state?.userData;

  useEffect(() => {
    // Check if user details are available in local storage
    const userData = localStorage.getItem('user');
    console.log('from home page')
    if (!userData) {
      // Redirect to login page or another appropriate location if user details are not available
      console.log('unauthorized access')
      navigate('/');
      toast.error("Make sure to login")
    }
    }, [navigate]);

    if (!localStorage.getItem('user')) {
      return null;
    }

  return (
    <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{padding:20}}>JIN</h3>
          <hr></hr>
          <AdminSideBar />
        </div>
        <div className='col'>
            <ChangePassword  userData={userData} />
        </div>
      </div>  
      <ToastContainer />
    </div>
  );
}

export default AdminPage;
