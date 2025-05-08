// src/pages/SyllabusList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { Link } from 'react-router-dom';

const SyllabusList = () => {
  const [syllabi, setSyllabi] = useState([]);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const res = await axiosInstance.get('syllabus/');
      setSyllabi(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`syllabus/${id}/`);
    fetchSyllabus();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Syllabus List</h2>
      <Link to="/syllabus/add" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Syllabus
      </Link>
      <ul className="space-y-2">
        {syllabi.map((item) => (
          <li key={item.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
              <p className="text-sm text-gray-500">Course: {item.course_name}</p>
            </div>
            <div className="space-x-2">
              <Link to={`/syllabus/edit/${item.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
              </Link>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SyllabusList;
