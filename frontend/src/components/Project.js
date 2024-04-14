import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import './Project.css'
import { alignProperty } from '@mui/material/styles/cssUtils';

function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchUsers()
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async () => {
    console.log("fetch")
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUsers = (e) => {
    const { value } = e.target;
    setSelectedUsers((prevUsers) => {
      if (prevUsers.includes(value)) {
        return prevUsers.filter((user) => user !== value);
      } else {
        return [...prevUsers, value];
      }
    });
    console.log(users)
  };

  const handleAddProject = async () => {
    console.log("handle add project")
    console.log(users)
    try {
      const newProject = {
        activity,
        name,
        description,
        startDate,
        endDate,
        users : selectedUsers
      };

      console.log("new project", newProject)

      // Send a POST request to the backend to add the new project
      await axios.post('http://localhost:3001/api/projects', newProject)
      .then(response => {
        console.log(response);
        
      // Close modal after successful submission
      setShowModal(false);

      // Fetch projects again to update the list
      fetchProjects();
      setUsers([])
      })
    } catch (error) {
      console.error('Error adding project:', error);
    }
    setUsers([])
  };

  return (

    <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{padding:20}}>JIN</h3>
          <hr></hr>
          <AdminSideBar />
        </div>
        <div className='col'>
        <div class="container-fluid p-3">
          <h4 >Projects</h4>
        <button class="add-project-btn" onClick={() => setShowModal(true)}>Add Project</button>
            <div className="row p-3">
              {projects.map((project) => (
                <div className="col-4" key={project._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{project.name}</h5>
                      <p className="card-text">{project.description}</p>
                      <p className="card-text">Start Date: {new Date(project.startDate).toISOString().split('T')[0]}</p>
                      <p className="card-text">End Date: {new Date(project.endDate).toISOString().split('T')[0]}</p>
                      {/* Display other project details */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
      {showModal && (
        <div className="modal1">
          <div className="modal-content1">
            <span className="close1" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Add Project</h2>
            <form onSubmit={handleAddProject}>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="BAU"
                  checked={activity === "BAU"}
                  onChange={(e) => setActivity(e.target.value)}
                />
                BAU Activity
              </label>
              <label>
                <input
                  type="radio"
                  value="Sales"
                  checked={activity === "Sales"}
                  onChange={(e) => setActivity(e.target.value)}
                />
                Sales Activity
              </label>
            </div>
            <input
            className='inp'
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
            className='inp'
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
            className='inp'
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            {/* Add input fields for other fields such as users */}

            <select className='select' multiple value={selectedUsers} onChange={handleUsers} required>
            {/* <select multiple value={users} onChange={handleUsers} required> */}
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <button className='add-project'>Add Project</button>
            </form>
          </div>
        </div>
      )}
        </div>
      </div>  
    </div>
  );
}

export default Project;
