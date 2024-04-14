
import React from 'react'
import './TimeSheet.css'
import { useState, useEffect } from 'react';
import UserSideBar from './UserSideBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Timesheet() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()
    const [ibrows, isetbRows] = useState([
        {
            id: Date.now(),
            projectType: 'BAU Activity',
            projectName: 'p1',
            task: 't1',
            hours: [0, 0, 0, 0, 0],
            total: 0,
            startDate: startDate,
            endDate: endDate,
        },
        

    ]);
    const [isrows, isetsRows] = useState([
        {
            projectType: 'Sales Activity',
            projectName: 'p1',
            task: 't1',
            hours: [0, 0, 0, 0, 0],
            total: 0,
            startDate: startDate,
            endDate: endDate,
        },
        
    ]);


    useEffect(() => {
        const fetchInitialData = async () => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            const mondayDate = new Date(today);
            mondayDate.setDate(today.getDate() - daysToSubtract);
            setStartDate(mondayDate);

            const endDate = new Date(mondayDate);
            endDate.setDate(endDate.getDate() + 4);
            setEndDate(endDate);

            await fetchData(mondayDate);
            await fetchProjects();
        };

        fetchInitialData();
    }, []);

    const fetchProjects = async () => {
        try {
            const userDataString = localStorage.getItem('user');
            if (!userDataString) {
                console.error('User data not found in local storage');
                return;
            }
            const user = JSON.parse(userDataString);
            const response = await axios.get('http://localhost:3001/api/projects/user', {
                params: {
                    userId: user.id
                }
            });
            console.log(response.data)
            if (response.data) {
                setProjects(response.data);
            } else {
                console.error('No projects found');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    

    // useEffect(() => {
    //     // Fetch timesheet data for the specified date range
    //     console.log('from fetch data use effect')
    //     fetchData();
       
    // }, [startDate]);

    // Function to fetch timesheet data from the server
    const fetchData = async (startDate) => {

        console.log("called fetchData", startDate)

        const userDataString = localStorage.getItem('user');
        if (!userDataString) {
          console.error('User data not found in local storage');
          return;
        }
        const user = JSON.parse(userDataString);
      
        const utcDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));

        const dateOnly = utcDate.toISOString().split('T')[0];

        console.log("dateOnly",dateOnly)
     
        try {
            // Make HTTP GET request to fetch timesheet data
            const response = await axios.get('http://localhost:3001/api/timesheet/week', {
                params: {
                    startDate: dateOnly,
                    userId: user.id
                }
            });
            console.log('response from ',response.data)
            // Update state with fetched data
            if (response.data && response.data.brows && response.data.brows.length>0) {
                // Update state for bRows with fetched data
                setbRows(response.data.brows);
            } else {
                setbRows(ibrows);
                console.log('Fetched bRows data is null');
            }
    
            // Check if fetched data for srows is not null
            if (response.data && response.data.srows && response.data.srows.length>0) {
                // Update state for sRows with fetched data
                setsRows(response.data.srows);
            } else {
                setsRows(isrows);
                console.log('Fetched sRows data is null');
            }
        } catch (error) {
            console.error('Error fetching timesheet data:', error);
        }
    };

    
 
    const [brows, setbRows] = useState([
        {
            id: Date.now(),
            projectType: 'BAU Activity',
            projectName: 'p1',
            task: 't1',
            hours: [0, 0, 0, 0, 0],
            total: 0,
            startDate: startDate,
            endDate: endDate,
        },
        
    ]);
 
    const bAUAddRow = () => {
        setbRows(prevRows => [
            ...prevRows,
            {
                id: Date.now(),
                projectType: 'BAU Activity',
                projectName: 'p1',
                task: 't1',
                hours: [0, 0, 0, 0, 0],
                total: 0,
                startDate: startDate,
                endDate: endDate,
            },
        ]);
    };
 
    const [srows, setsRows] = useState([
        {
            projectType: 'Sales Activity',
            projectName: 'p1',
            task: 't1',
            hours: [0, 0, 0, 0, 0],
            total: 0,
            startDate: startDate,
            endDate: endDate,
        },
        
    ]);
 
    const salesAddRow = () => {
        setsRows(prevRows => [
            ...prevRows,
            {
                projectType: 'Sales Activity',
                projectName: 'p1',
                task: 't1',
                hours: [0, 0, 0, 0, 0],
                total: 0,
                startDate: startDate,
                endDate: endDate,
            },
        ]);
    };
 
    const bAURemoveRow = (id) => {
        setbRows((prevRows) => {
            console.log('from remove row')
            console.log("ididi",id)
            const rowsArray = Array.isArray(prevRows) ? prevRows : [];
            console.log(rowsArray)
            console.log("new",rowsArray.filter((row) => row.id !== id))
            return rowsArray.filter((row) => row.id !== id);
        });
        console.log(brows);
    };
 
    const salesRemoveRow = (index) => {
        setsRows(prevRows => prevRows.filter((_, i) => i !== index));
    };
 
    const bAUInputChange = (index, field, value) => {
        console.log(brows);
        setbRows(prevRows => {
            const newRows = [...prevRows];
            if(Number.isInteger(field))
            {
                newRows[index].hours[field]=value;
                var sum=0;
                for(var i=0;i<newRows[index].hours.length;i++) sum+=parseInt(newRows[index].hours[i]);
                newRows[index].total=sum;
            }
            else newRows[index][field] = value;
            return newRows;
        });
        console.log(brows);
    };
 
    const salesInputChange = (index, field, value) => {
        setsRows(prevRows => {
            const newRows = [...prevRows];
            if(Number.isInteger(field))
            {
                newRows[index].hours[field]=value;
                var sum=0;
                for(var i=0;i<newRows[index].hours.length;i++) sum+=parseInt(newRows[index].hours[i]);
                newRows[index].total=sum;
            }
            else newRows[index][field] = value;
            return newRows;
        });
    };

    const cal_col = (ind) => {
        var sum=0;
        for(var i=0;i<brows.length;i++) sum+=parseInt(brows[i].hours[ind]);
        for(i=0;i<srows.length;i++) sum+=parseInt(srows[i].hours[ind]);
        return sum;
    };

    const cal_tot = () => {
        var sum=0;
        for(var i=0;i<brows.length;i++) sum+=parseInt(brows[i].total);
        for(i=0;i<srows.length;i++) sum+=parseInt(srows[i].total);
        return sum;
    };
    
        // Function to navigate to the previous week
    const goToPreviousWeek = () => {
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);
        newStartDate.setDate(newStartDate.getDate() - 7);
        newEndDate.setDate(newEndDate.getDate() - 7);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        console.log("calling fetchdata previous", startDate)
        console.log("calling fetchdata previous", endDate)
        fetchData(newStartDate)
        // Additional logic to fetch or recalculate timesheet data for the new date range
    };
    
        // Function to navigate to the next week
    const goToNextWeek = () => {
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);
        newStartDate.setDate(newStartDate.getDate() + 7);
        newEndDate.setDate(newEndDate.getDate() + 7);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        console.log("calling fetchdata next", startDate)
        fetchData(newStartDate)
        // Additional logic to fetch or recalculate timesheet data for the new date range
    };

    const saveTimesheet = async () => {
        console.log("save");
        const userDataString = localStorage.getItem('user');
        if (!userDataString) {
          console.error('User data not found in local storage');
          return;
        }
        const user = JSON.parse(userDataString);
        try {
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(startDate.getDate()).padStart(2, '0');

            const xstartDate = `${year}-${month}-${day}`;
            // Make an HTTP POST request to your backend endpoint using Axios
            const response = await axios.post('http://localhost:3001/api/timesheet', {
                startDate: xstartDate,
                userId: user.id,
                brows: brows,
                srows: srows,
            });

            // Handle the response
            if (response.status === 201) {
                toast.success("Timesheet Saved")
                console.log('Timesheet saved successfully');
            } else {
                console.error('Failed to save timesheet');
            }
        } catch (error) {
            console.error('Error saving timesheet:', error);
        }
    };

    const submitTimesheet = async () => {
        saveTimesheet();
        console.log("submit");
        const userDataString = localStorage.getItem('user');
        if (!userDataString) {
          console.error('User data not found in local storage');
          return;
        }
        const user = JSON.parse(userDataString);
        try {
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(startDate.getDate()).padStart(2, '0');

            const xstartDate = `${year}-${month}-${day}`;
            // Make an HTTP POST request to your backend endpoint using Axios
            const response = await axios.post('http://localhost:3001/api/timesheet/submit', {
                startDate: xstartDate,
                userId: user.id,
                brows: brows,
                srows: srows,
            });

            // Handle the response
            if (response.status === 201) {
                toast.success("Timesheet submitted successfully")
                console.log('Timesheet saved successfully');
                navigate('/user-page/feedback')
            } else {
                console.error('Failed to save timesheet');
            }
        } catch (error) {
            console.error('Error saving timesheet:', error);
        }
    };
    
    console.log("brows",brows);

    return (
        <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{padding:20}}>JIN</h3>
          <hr></hr>
          <UserSideBar />
        </div>
        <div className='col'>
        <h3 style={{padding:10}}>Timesheet</h3>
            <div className="header">
                <button className='change-week' onClick={goToPreviousWeek}>{'<'}</button>
                <h5 style={{ padding: 10 }}>
                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </h5>
                <button className='change-week' onClick={goToNextWeek}>{'>'}</button>
            </div>
            <br></br>
            <div className='headings container-fluid'>
                <div className='row p-2'>
                    <div className='col-lg-2'>
                        <h6>Project Type</h6>
                    </div>
                    <div className='col-lg-2'>
                        <h6>Project Name</h6>
                    </div>
                    <div className='col-lg-1'>
                        <h6>Task</h6>
                    </div>
                    <div className='col'>
                        <h6>Mon</h6>
                    </div>
                    <div className='col'>
                        <h6>Tue</h6>
                    </div>
                    <div className='col'>
                        <h6>Wed</h6>
                    </div>
                    <div className='col'>
                        <h6>Thu</h6>
                    </div>
                    <div className='col'>
                        <h6>Fri</h6>
                    </div>
                    <div className='col'>
                        <h6>Total</h6>
                    </div>
                    <div className='col'></div>
                    <div className='col'></div>
                </div>
                {brows.map((row, index) => (
                <div key={index} className='row p-2'>
                    <div className='col-lg-2'>
                        <h7>BAU Activity</h7>
                    </div>
                    <div className='col-lg-2'>
                    <select
                        name={`bau-p-${index}`} // Update name attribute to be unique for each select element
                        id={`bau-p-${index}`} // Update id attribute to be unique for each select element
                        value={row.projectName}
                        onChange={(e) => bAUInputChange(index, 'projectName', e.target.value)}>
                        {projects
                            .filter((project) => project.projectType === 'BAU') // Filter projects based on project type
                            .map((project) => (
                                <option key={project.id} value={project.name}>
                                    {project.name}
                                </option>
                            ))}
                    </select>

                    </div>
                    <div className='col-lg-1'>
                        <select name="bau-t" id="bau-t" value={row.task} onChange={(e) => bAUInputChange(index, 'task', e.target.value)}>
                        <option value="t1">Task 1</option>
                        <option value="t2">Task 2</option>
                        <option value="t3">Task 3</option>
                        <option value="t4">Task 4</option>
                        </select>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[0]===0 ? '' : row.hours[0]} style={{width:40}} onChange={(e) => bAUInputChange(index, 0, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[1]===0 ? '' : row.hours[1]} style={{width:40}} onChange={(e) => bAUInputChange(index, 1, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[2]===0 ? '' : row.hours[2]} style={{width:40}} onChange={(e) => bAUInputChange(index, 2, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[3]===0 ? '' : row.hours[3]}  style={{width:40}} onChange={(e) => bAUInputChange(index, 3, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[4]===0 ? '' : row.hours[4]}  style={{width:40}} onChange={(e) => bAUInputChange(index, 4, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <p style={{ color: row.total > 40 ? 'red' : 'black' }}> {brows[index].total} </p>
                    </div>
                    <div className='col'>
                        <button className='add' onClick={bAUAddRow}>+</button>
                    </div>
                    <div className='col'>
                        <button className='add' onClick={()=>bAURemoveRow(row.id)}>-</button>
                    </div>
                </div>
                ))}
                <hr></hr>
                {srows.map((row, index) => (
                <div key={index} className='row p-2'>
                    <div className='col-lg-2'>
                        <h7>Sales Activity</h7>
                    </div>
                    <div className='col-lg-2'>
                    <select
                        name={`sales-p-${index}`} // Update name attribute to be unique for each select element
                        id={`sales-p-${index}`} // Update id attribute to be unique for each select element
                        value={row.projectName}
                        onChange={(e) => salesInputChange(index, 'projectName', e.target.value)}>
                        {projects
                            .filter((project) => project.projectType === 'Sales') // Filter projects based on project type
                            .map((project) => (
                                <option key={project.id} value={project.name}>
                                    {project.name}
                                </option>
                            ))}
                    </select>

                    </div>
                    <div className='col-lg-1'>
                        <select name="sales-t" id="sales-t" value={row.task} onChange={(e)=>salesInputChange(index, 'task', e.target.value)}>
                        <option value="t1">Task 1</option>
                        <option value="t2">Task 2</option>
                        <option value="t3">Task 3</option>
                        <option value="t4">Task 4</option>
                        </select>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[0]===0 ? '' : row.hours[0]} style={{width:40}} onChange={(e)=> salesInputChange(index, 0, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[1]===0 ? '' : row.hours[1]} style={{width:40}} onChange={(e)=> salesInputChange(index, 1, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[2]===0 ? '' : row.hours[2]} style={{width:40}} onChange={(e)=> salesInputChange(index, 2, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[3]===0 ? '' : row.hours[3]} style={{width:40}} onChange={(e)=> salesInputChange(index, 3, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <input type='number' min={0} max={24} value={row.hours[4]===0 ? '' : row.hours[4]} style={{width:40}} onChange={(e)=> salesInputChange(index, 4, e.target.value)}></input>
                    </div>
                    <div className='col'>
                        <p> {srows[index].total} </p>
                    </div>
                    <div className='col'>
                        <button className='add' onClick={salesAddRow}>+</button>
                    </div>
                    <div className='col'>
                        <button className='add' onClick={()=>salesRemoveRow(index)}>-</button>
                    </div>
                </div>
                ))}
                <hr></hr>
                <div className='row p-2'>
                    <div className='col-lg-2'>
                        <h7>Total Hours</h7>
                    </div>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-1'></div>
                    <div className='col'>
                        <p style={{ color: cal_col(0) > 8 ? 'red' : 'black' }}>{cal_col(0)}</p>
                    </div>
                    <div className='col'>
                        <p style={{ color: cal_col(1) > 8 ? 'red' : 'black' }}>{cal_col(1)}</p>
                    </div>
                    <div className='col'>
                        <p style={{ color: cal_col(2) > 8 ? 'red' : 'black' }}>{cal_col(2)}</p>
                    </div>
                    <div className='col'>
                        <p style={{ color: cal_col(3) > 8 ? 'red' : 'black' }}>{cal_col(3)}</p>
                    </div>
                    <div className='col'>
                        <p style={{ color: cal_col(4) > 8 ? 'red' : 'black' }}>{cal_col(4)}</p>
                    </div>
                    <div className='col'>
                        <p style={{ color: cal_tot() > 40 ? 'red' : 'black' }}>{cal_tot()}</p>
                    </div>  
                    <div className='col'></div>
                    <div className='col'></div>
                </div>
                <hr></hr>
                <div className='row'>
                    <div className='col'>
                        <button className='save' onClick={saveTimesheet} >Save</button>
                    </div>
                    <div className='col'>
                        <button className='save' onClick={submitTimesheet} >Submit</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    )
}
 
export default Timesheet;

