import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useLocation } from 'react-router-dom';
import UserSideBar from './UserSideBar';
import ChangePassword from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  console.log("User Page")
  console.log(userData)

  const [loading, setLoading] = useState('');

    useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("from home page");
    if (!userData) {
      console.log("unauthorized access");
      toast.error("Make Sure to login!");
      navigate("/");
    }
    // Simulating loading delay
    const timeoutId = setTimeout(() => {
      setLoading(false); // Once data is loaded, set loading to false
    }, 1000);
 
    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [navigate]);

    if (!localStorage.getItem('user')) {
      return null;
    }

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
      <ToastContainer />
    </div>
  );
}

export default UserPage;
