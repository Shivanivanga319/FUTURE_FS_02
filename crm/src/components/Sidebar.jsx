import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ width: '240px', backgroundColor: '#1e2530', color: '#ffffff', display: 'flex', flexDirection: 'column', padding: '30px 20px', boxSizing: 'border-box' }}>
      {/* Sidebar Original Logo Title Header */}
      <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981', marginBottom: '50px', paddingLeft: '10px' }}>
        Info Panel
      </div>

    
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '10px' }}>
        <div 
          onClick={() => setCurrentTab('overview')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', color: currentTab === 'overview' ? '#10b981' : '#60a5fa', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}
        >
          📊 Overview
        </div>
        <div 
          onClick={() => setCurrentTab('performance')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', color: currentTab === 'performance' ? '#10b981' : '#60a5fa', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}
        >
          📈 Performance
        </div>
        <div 
          onClick={() => setCurrentTab('settings')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', color: currentTab === 'settings' ? '#10b981' : '#60a5fa', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}
        >
          ⚙️ Setup Settings
        </div>
      </div>

    
      <button 
        onClick={handleLogout}
        style={{ width: '100%', padding: '10px', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
      >
        Sign Out
      </button>
    </div>
  );
}