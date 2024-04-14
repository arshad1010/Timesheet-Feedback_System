import React from 'react';
import './AdminPage.css'
// import AddUser from './AddUser';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import ChangePassword from './ChangePassword';

function AdminPage() {

  const location = useLocation();
  const userData = location.state?.userData;

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
    </div>
  );
}

export default AdminPage;
