// src/pages/SyllabusForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const SyllabusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    course: '',
    title: '',
    description: '',
    file: null,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    if (isEdit) fetchSyllabus();
  }, []);

  const fetchCourses = async () => {
    const res = await axiosInstance.get('courses/');
    setCourses(res.data);
  };

  const fetchSyllabus = async () => {
    const res = await axiosInstance.get(`syllabus/${id}/`);
    setForm({ ...res.data, file: null }); // file is not returned; keep it null
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    if (isEdit) {
      await axiosInstance.put(`syllabus/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      await axiosInstance.post('syllabus/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    navigate('/syllabus');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Syllabus</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="course" value={form.course} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <input type="file" name="file" onChange={handleChange} className="w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default SyllabusForm;
