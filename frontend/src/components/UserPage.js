import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useLocation } from 'react-router-dom';
import UserSideBar from './UserSideBar';
import ChangePassword from './ChangePassword';

function UserPage() {

  const location = useLocation();
  const userData = location.state?.userData;
  console.log("User Page")
  console.log(userData)
  return (
    <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{padding:20}}>JIN</h3>
          <hr />
          <UserSideBar />
        </div>
        <div className='col'>
          <ChangePassword userData={userData} />
        </div>
      </div>  
    </div>
  );
}

export default UserPage;
