import React, { useState } from 'react';
import axios from '../api/axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await axios.post('http://localhost:8000/api/token/', {
          username,
          password,
        });
  
        const { access, refresh } = res.data;
  
        // Store tokens
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
  
        // ✅ Decode token to check user role
        const decoded = jwtDecode(access);
  
        // Django sends custom claims (like `is_admin`, etc.)
        if (decoded.is_admin) {
          navigate('/admin-dashboard');
        } else if (decoded.is_teacher) {
          navigate('/teacher-dashboard');
        } else if (decoded.is_student) {
          navigate('/student-dashboard');
        } else {
          alert('Unknown role');
        }
  
      } catch (err) {
        console.error('Login failed', err);
      }
    };
    
return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername({ ...username, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword({ ...password, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
