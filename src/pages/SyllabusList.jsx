// src/pages/SyllabusList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SyllabusList = () => {
  const [syllabi, setSyllabi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/syllabus/');
      const data = await res.json();
      setSyllabi(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`http://localhost:8000/api/syllabus/${id}/`, {
        method: 'DELETE',
      });
      fetchSyllabus();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Syllabus List</h2>
      <button onClick={() => navigate('/syllabus/add')} style={{ margin: '10px 0', padding: '6px 12px' }}>
        Add New Syllabus
      </button>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Title</th>
            <th>Description</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {syllabi.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.course_name || item.course}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                {item.file ? (
                  <a href={item.file} target="_blank" rel="noreferrer">View</a>
                ) : (
                  'No file'
                )}
              </td>
              <td>
                <button onClick={() => navigate(`/syllabus/edit/${item.id}`)}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
          {syllabi.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No syllabus found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SyllabusList;
