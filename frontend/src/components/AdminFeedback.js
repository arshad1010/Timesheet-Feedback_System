import React, {useState} from 'react'
import AdminSideBar from './AdminSideBar'
import axios from 'axios'
import './AdminFeedback.css'

function AdminFeedback() {

  const [questionText, setQuestionText] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [message, setMessage] = useState('');

  const roles = [
    { id: 'developer', name: 'Developer' },
    { id: 'manager', name: 'Manager' },
    { id: 'qa', name: 'QA' },
    { id: 'data engineer', name: 'Data Engineer' },
    { id: 'data analyst', name: 'Data Analyst' },
  ];

  // Define hardcoded projects
  const projects = [
    {  id: '609b8d6d8e69770a6c6e81e0' , name: 'p1'},
    {  id: '609b8d6d8e69770a6c6e81e1' , name: 'p2'},
    {  id: '609b8d6d8e69770a6c6e81e2' , name: 'p3'},
    {  id: '609b8d6d8e69770a6c6e81e3' , name: 'p4'},
    {  id: '609b8d6d8e69770a6c6e81e4' , name: 'p5'},
  ];

  // Function to handle question text input change
  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  // Function to handle role selection change
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setSelectedRoles((prevRoles) => {
      if (prevRoles.includes(value)) {
        return prevRoles.filter((role) => role !== value);
      } else {
        return [...prevRoles, value];
      }
    });
  };

  // Function to handle project selection change
  const handleProjectChange = (e) => {
    const { value } = e.target;
    setSelectedProjects((prevProjects) => {
      if (prevProjects.includes(value)) {
        return prevProjects.filter((project) => project !== value);
      } else {
        return [...prevProjects, value];
      }
    });
    console.log(selectedProjects)
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    console.log(questionText)
    console.log(selectedRoles)
    console.log(selectedProjects)
    e.preventDefault();
    axios.post("http://localhost:3001/api/feedback-question", {questionText,selectedRoles,selectedProjects})
    .then(response => {
      console.log(response);
      setMessage('Feedback question successfully added');
      // Clear form fields
      setQuestionText('');
      setSelectedRoles([]);
      setSelectedProjects([]);
    })
    .catch(err=>{
      console.log(err)
      //setError('Invalid username or password');
    })
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
        <div className="container-fluid">
      <h2>Feedback Question Form</h2>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='col' >
          <label htmlFor="questionText" className="form-label">Question:</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={handleQuestionChange}
            className="form-control"
            required
          />
          </div>
        </div>
        <div className='row'>
        <div className="col">
          <label htmlFor="roles" className="form-label">Select Roles:</label>
          <select
            id="roles"
            multiple
            value={selectedRoles}
            onChange={handleRoleChange}
            className="form-select"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="projects" className="form-label">Select Projects:</label>
          <select
            id="projects"
            multiple
            value={selectedProjects}
            onChange={handleProjectChange}
            className="form-select"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        </div>
        <br></br>
        <div className='row' >
          <div className='col' >
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </div>
      </form>
    </div>
        </div>
      </div>  
    </div>
    )
}

export default AdminFeedback
