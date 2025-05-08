import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({});
  const [isTeacher, setIsTeacher] = useState(true);

  const token = localStorage.getItem('access');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    const res = await axios.get('/admin-teachers/', { headers });
    setTeachers(res.data);
  };

  const fetchStudents = async () => {
    const res = await axios.get('/admin-students/', { headers });
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPayload = {
      user: {
        username: form.username,
        email: form.email,
        password: form.password,
      },
    };

    if (isTeacher) {
      await axios.post('/register/teacher/', {
        ...userPayload,
        subject: form.subject,
        employee_id: form.employee_id,
      }, { headers });
      fetchTeachers();
    } else {
      await axios.post('/register/student/', {
        ...userPayload,
        roll_number: form.roll_number,
        standard: form.standard,
        tamil: 0,
        english: 0,
        maths: 0,
        science: 0,
        scoialscience: 0,
      }, { headers });
      fetchStudents();
    }

    setForm({});
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <button onClick={() => setIsTeacher(true)}>Register Teacher</button>
        <button onClick={() => setIsTeacher(false)}>Register Student</button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>{isTeacher ? 'Register Teacher' : 'Register Student'}</h3>
        <input name="username" placeholder="Username" value={form.username || ''} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
        <input name="password" placeholder="Password" value={form.password || ''} onChange={handleChange} type="password" required />

        {isTeacher ? (
          <>
            <input name="employee_id" placeholder="Employee ID" value={form.employee_id || ''} onChange={handleChange} />
            <input name="subject" placeholder="Subject" value={form.subject || ''} onChange={handleChange} />
          </>
        ) : (
          <>
            <input name="roll_number" placeholder="Roll Number" value={form.roll_number || ''} onChange={handleChange} />
            <input name="standard" placeholder="Standard" value={form.standard || ''} onChange={handleChange} />
          </>
        )}

        <button type="submit">Register</button>
      </form>

      <h3>Teachers</h3>
      <ul>
        {teachers.map(t => <li key={t.id}>{t.user.username} - {t.subject}</li>)}
      </ul>

      <h3>Students</h3>
      <ul>
        {students.map(s => <li key={s.id}>{s.user.username} - {s.roll_number}</li>)}
      </ul>
    </div>
  );
};

export default AdminDashboard;
