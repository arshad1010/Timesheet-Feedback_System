import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import ChangePassword from './components/ChangePassword';
import AddUser from './components/AddUser';
import Timesheet from './components/Timesheet';
import Feedback from './components/Feedback';
import Leave from './components/Leave';
import WFH from './components/WFH';
import Survey from './components/Survey';
import AdminFeedback from './components/AdminFeedback';
import Project from './components/Project';
import FeedbackResponses from './components/FeedbackResponses';


function App() {
  return (
           <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/user-page" element={<UserPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<AdminPage />} />
            
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/feedback-responses" element={<FeedbackResponses />} />
            {/* <Route path="/admin/change-password" element={<ChangePassword />} /> */}
            <Route path="/admin/add-user" element={<AddUser />} />
            {/* <Route path="/admin/timesheet" element={<AdminTimesheet />} />  */}
            <Route path="/admin/feedback" element={<AdminFeedback />} /> 

            {/* <Route exact path="/user-page/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/user-page/" element={<ChangePassword />} /> */}
            <Route path="/user-page/timesheet" element={<Timesheet />} /> 
            <Route path="/user-page/feedback" element={<Feedback />} />

            <Route path="/admin/projects" element={<Project />} />

            <Route path="/leave" element={<Leave />} /> 
            <Route path="/survey" element={<Survey />} /> 
            <Route path="/wfh" element={<WFH />} /> 
           </Routes> 
  );
}

export default App;
