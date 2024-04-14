import React, {useState} from 'react'
import UserSideBar from './UserSideBar'
import './Feedback.css'
import axios from 'axios'
import { useEffect } from 'react'

function Feedback() {

  const userDataString = localStorage.getItem('user');

    const userData = JSON.parse(userDataString);
    const userRole = userData.userRole;
    const userId = userData.id
    const selectedProjects = userData.projects || [];

  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    // Accessing user data from local storage
    const userDataString = localStorage.getItem('user');
    if (!userDataString) {
      console.error('User data not found in local storage');
      return;
    }

    const userData = JSON.parse(userDataString);
    const userRole = userData.userRole;
    const userId = userData.id
    const selectedProjects = userData.projects || [];

    // Fetch pending feedbacks from the backend
    axios
      .get('http://localhost:3001/api/feedback-question/user', {
        params: {
          role: userRole,
          userId: userId,
          projectIds: selectedProjects,
        },
      })
      .then((response) => {
        console.log(response.data);
        const { pendingFeedbacks, submittedFeedbacks } = response.data;
        setPendingFeedbacks(pendingFeedbacks);
        setSubmittedFeedbacks(submittedFeedbacks);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }, []);

  // useEffect(() => {
  //   // Fetch pending feedbacks from the backend
  //   axios.get('http://localhost:3001/api/feedback', {
  //     params: {
  //       role: userRole, // Assuming userRole is the role of the current user
  //       projectIds: selectedProjects // Assuming selectedProjects contains the projects of the current user
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.data)
  //       const { pendingFeedbacks, submittedFeedbacks } = response.data;
  //       setPendingFeedbacks(pendingFeedbacks);
  //       setSubmittedFeedbacks(submittedFeedbacks);
  //     })
  //     .catch(error => {
  //       console.error('Error fetchingfeedbacks:', error);
  //     });

  //   // Fetch submitted feedbacks from the backend
  //   // axios.get('http://localhost:3001/api/feedbacks/submitted')
  //   //   .then(response => {
  //   //     setSubmittedFeedbacks(response.data);
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error fetching submitted feedbacks:', error);
  //   //   });
  // }, [userRole, selectedProjects]);

  // Function to handle answering a feedback question
  const answerFeedback = () => {

    axios.post('http://localhost:3001/api/feedback/submit', {
      questionId: selectedFeedback._id,
      answer: answer,
      userId,
    })
    .then(response => {
      console.log('Answer submitted successfully:', response.data);

        axios.get('http://localhost:3001/api/feedback-question/user', {
          params: {
            role: userRole,
            userId: userId,
            projectIds: selectedProjects,
          },
        })
        .then((response) => {
          console.log(response.data);
          const { pendingFeedbacks, submittedFeedbacks } = response.data;
          setPendingFeedbacks(pendingFeedbacks);
          setSubmittedFeedbacks(submittedFeedbacks);
        })
        .catch((error) => {
          console.error('Error fetching feedbacks:', error);
        });

      setSelectedFeedback(null);
      setAnswer('');
    })
    .catch(error => {
      console.error('Error submitting answer:', error);
    });
    console.log(selectedFeedback._id)
    console.log('Answer submitted:', answer);

    setSelectedFeedback(null);
    setAnswer('');
  };

    return (
    <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{padding:20}}>JIN</h3>
          <hr></hr>
          <UserSideBar />
        </div>
        <div className='col'>
        <div className="container-fluid">
      <h2> Feedbacks </h2>
      <br></br>
      <div className="row">
        <div className="col">
          <h4>Pending Feedbacks</h4>
          <br></br>
          {pendingFeedbacks.map((feedback) => (
            <div key={feedback.id} className="card mb-3">
              <div className="card-body">
                <p className="card-date position-absolute top-0 end-0 m-1">{new Date(feedback.date).toLocaleDateString()}</p>
                <h5 className="card-title">{feedback.text}</h5>
                <button className="btn btn-primary" onClick={() => setSelectedFeedback(feedback)}>
                  Answer
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <h4>Submitted Feedbacks</h4>
          <br></br>
          {submittedFeedbacks.map((feedback) => (
            <div key={feedback.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{feedback.text}</h5>
                <p className="card-date position-absolute top-0 end-0 m-1">{new Date(feedback.date).toLocaleDateString()}</p>
                {feedback.answers.filter(answer => answer.userId === userId).map(userAnswer => (
                <p key={userAnswer._id} className="card-text">{userAnswer.answer}</p>
            ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal for answering feedback */}
      {selectedFeedback && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Answer Feedback</h5>
                <button type="button" className="close" onClick={() => setSelectedFeedback(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <div>
                <h6>{selectedFeedback.text}</h6>
              </div>
                <div className="form-group">
                  <label htmlFor="answer">Your Answer:</label>
                  <input
                    id="answer"
                    type="number"
                    className="form-control"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedFeedback(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={answerFeedback}>Submit Answer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
      </div>  
    </div>
    )
}

export default Feedback
