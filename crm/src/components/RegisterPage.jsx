import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const response = await fetch('https://crm-backend-ogi0.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message === 'Failed to fetch' 
        ? 'Failed to fetch: Browser script cannot connect to Port 8000.' 
        : err.message
      );
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#111827', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#e5e7eb', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '440px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: '25px' }}>Create Admin Account</h2>
        
        
        {error && <div style={{ color: '#dc2626', marginBottom: '15px', fontSize: '14px', textAlign: 'center', fontWeight: '600' }}>{error}</div>}
        {success && <div style={{ color: '#059669', marginBottom: '15px', fontSize: '14px', textAlign: 'center', fontWeight: '600' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '600', fontSize: '14px' }}>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '600', fontSize: '14px' }}>E-mail Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '600', fontSize: '14px' }}>Set Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '600', fontSize: '14px' }}>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '14px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>Sign Up</button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#4b5563', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}