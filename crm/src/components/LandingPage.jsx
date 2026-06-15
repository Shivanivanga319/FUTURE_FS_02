import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ flex: 1, backgroundColor: '#111827', color: '#ffffff', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: '#10b981', fontWeight: '700', fontSize: '14px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
          PLATFORM V1.0
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px' }}>
          Client Lead<br />Management
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.6', maxWidth: '460px', margin: 0 }}>
          A minimal, high-performance CRM engine built to capture incoming website forms, track pipeline conversions, and organize historical chronological team follow-up logs smoothly.
        </p>
      </div>
      <div style={{ flex: 1, backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>
            Secure Administrative Gateway
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>
            Access your internal business pipeline dashboards and analytics panels.
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{ width: '100%', padding: '14px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            Get Started Panel →
          </button>
        </div>
      </div>
    </div>
  );
}