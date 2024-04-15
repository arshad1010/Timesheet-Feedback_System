import React, { useState, useEffect } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import './Dashboard.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [timesheetData, setTimesheetData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3001/api/users');
                console.log(response.data)
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

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


    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/admin/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (userId) => {
        console.log('Edit user:', userId);
    };

    const handleViewTimesheet = async (userId) => {
        console.log("view timesheet");
        try {
            const currentDate = new Date();
            const currentDayOfWeek = currentDate.getDay();
            console.log("current date : ", currentDate)
            console.log("current day : ", currentDayOfWeek)
            const daysToAdd = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // Adjust if Sunday
            const startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() + daysToAdd);
            console.log("start date : ", startDate)
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 5); // Set the end date to the upcoming Saturday
            setCurrentWeekStartDate(startDate);
            setStartDate(startDate.toISOString().split('T')[0]);
            setEndDate(endDate.toISOString().split('T')[0]);
            fetchTimesheetData(userId, startDate);
        } catch (error) {
            toast.error('User has not submitted Timesheet');
            console.error('Error fetching timesheet data:', error);
        }
    };

    const fetchTimesheetData = async (userId, startDate) => {
        try {
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(startDate.getDate()).padStart(2, '0');

            const xstartDate = `${year}-${month}-${day}`;
            console.log("start date in fetch timesheet data", xstartDate)
            const response = await axios.get('http://localhost:3001/api/timesheet', {
                params: {
                    userId: userId,
                    startDate: xstartDate,
                },
            });
            console.log(response.data);
            setTimesheetData(response.data);
            setIsModalOpen(true);
            setSelectedUserId(userId);
        } catch (error) {
            toast.error('No Data to fetch');
            console.error('Error fetching timesheet data:', error);
        }
    };

    const handlePrevWeek = () => {
        const prevWeekStartDate = new Date(currentWeekStartDate);
        prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
        setCurrentWeekStartDate(prevWeekStartDate);
        fetchTimesheetData(selectedUserId, prevWeekStartDate);
    };
    
    const handleNextWeek = () => {
        const nextWeekStartDate = new Date(currentWeekStartDate);
        nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
        setCurrentWeekStartDate(nextWeekStartDate);
        fetchTimesheetData(selectedUserId, nextWeekStartDate);
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
        setTimesheetData(null);
        setSelectedUserId(null);
    };

    const renderTimesheetTable = () => {
        if (!timesheetData) return null;

        console.log("timesheetdata")
        console.log(timesheetData)

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Project Type</th>
                        <th>Project</th>
                        <th>Task</th>
                        <th>Hours</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {timesheetData && timesheetData.timesheet && timesheetData.timesheet.length > 0 && (
        timesheetData.timesheet.map((item, index) => (
            item.projects.map((project, projectIndex) => (
                <tr key={`${index}-${projectIndex}`}>
                    {/* Render project details */}
                    <td>{project.projectType}</td>
                    <td>{project.project}</td>
                    <td>{project.task}</td>
                    <td>{project.hours.join(', ')}</td>
                    <td>{project.total}</td>
                </tr>
            ))
        ))
    )}
            </table>
        );
    };

    return (
        <div className="main container-fluid">
            <div className='row srow'>
                <div className='side-bar col-lg-2'>
                    <h3 style={{ padding: 20 }}>JIN</h3>
                    <hr />
                    <AdminSideBar />
                </div>
                <div className='col'>
                    <h3>Admin Dashboard</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="button delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                        <button className="button edit-button" onClick={() => handleEditUser(user._id)}>Edit</button>
                                        <button className="button timesheet-button" onClick={() => handleViewTimesheet(user._id)}>Timesheet</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && selectedUserId && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Timesheet Data</h2>
                        <div className='date'>
                        <button onClick={handlePrevWeek}>{'<'}</button>
                        <h6>{startDate}--{endDate}</h6>
                        <button onClick={handleNextWeek}>{'>'}</button>
                        </div>
                        {renderTimesheetTable()}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Dashboard;
