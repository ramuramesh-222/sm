import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('access');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('/teacher-student/', { headers });
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({ ...student, ...student.user });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/teacher-student/${id}/`, { headers });
    fetchStudents();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      user: {
        username: form.username,
        email: form.email,
      }
    };

    if (editingId) {
      await axios.put(`/teacher-student/${editingId}/`, payload, { headers });
    } else {
      await axios.post('/teacher-student/', payload, { headers });
    }

    setForm(null);
    setEditingId(null);
    fetchStudents();
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>

      <h3>{editingId ? 'Edit Student' : 'Add Student'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form?.username || ''} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form?.email || ''} onChange={handleChange} />
        <input name="roll_number" placeholder="Roll No" value={form?.roll_number || ''} onChange={handleChange} required />
        <input name="standard" placeholder="Standard" value={form?.standard || ''} onChange={handleChange} />
        <input name="tamil" placeholder="Tamil" value={form?.tamil || ''} onChange={handleChange} />
        <input name="english" placeholder="English" value={form?.english || ''} onChange={handleChange} />
        <input name="maths" placeholder="Maths" value={form?.maths || ''} onChange={handleChange} />
        <input name="science" placeholder="Science" value={form?.science || ''} onChange={handleChange} />
        <input name="scoialscience" placeholder="Social Science" value={form?.scoialscience || ''} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <h3>Student List</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.user.username} - Tamil: {s.tamil}, English: {s.english}, Maths: {s.maths}
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
