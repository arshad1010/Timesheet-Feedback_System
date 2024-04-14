import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackResponses.css'; 
import AdminSideBar from './AdminSideBar';

function FeedbackResponses() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/feedback-question');
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuestionClick = (questionId) => {
    if (selectedQuestion === questionId) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(questionId);
    }
  };

  return (
    <div className="main container-fluid">
      <div className='row srow'>
        <div className='side-bar col-lg-2'>
          <h3 style={{padding:20}}>JIN</h3>
          <hr />
          <AdminSideBar />
        </div>
        <div className='col'>
          <h1>Feedback Questions</h1>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Date Created</th>
                <th>Responses</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <React.Fragment key={question._id}>
                  <tr>
                    <td onClick={() => handleQuestionClick(question._id)}>
                      <div className="question-header">
                        {question.text}
                        {question.answers.length > 0 && (
                          <span className={`arrow ${selectedQuestion === question._id ? 'expanded' : ''}`}></span>
                        )}
                      </div>
                    </td>
                    <td>{new Date(question.date).toLocaleString()}</td>
                    <td>{question.answers.length}</td>
                  </tr>
                  {selectedQuestion === question._id && question.answers.length > 0 && (
                    <tr>
                      <td colSpan="3">
                        <table className="response-table">
                          <thead>
                            <tr>
                              <th>Date Answered</th>
                              <th>User</th>
                              <th>Answer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {question.answers.map((answer) => (
                              <tr key={answer._id}>
                                <td>{new Date(answer.date).toLocaleString()}</td>
                                <td>{answer.userId.username}</td>
                                <td>{answer.answer}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>  
    </div>
  );
}

export default FeedbackResponses;
