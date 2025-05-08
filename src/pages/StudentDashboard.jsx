import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('access');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('/my-student/', { headers })
      .then(res => {
        if (res.data.length === 0) {
          localStorage.clear();
          navigate('/login');
        } else {
          setStudent(res.data[0]);
        }
      })
      .catch(err => {
        console.error(err);
        localStorage.clear();
        navigate('/login');
      });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <h3>Welcome, {student.user.username}</h3>
      <p><strong>Roll No:</strong> {student.roll_number}</p>
      <p><strong>Standard:</strong> {student.standard}</p>

      <h4>Marks</h4>
      <ul>
        <li>Tamil: {student.tamil}</li>
        <li>English: {student.english}</li>
        <li>Maths: {student.maths}</li>
        <li>Science: {student.science}</li>
        <li>Social Science: {student.scoialscience}</li>
      </ul>
    </div>
  );
};

export default StudentDashboard;