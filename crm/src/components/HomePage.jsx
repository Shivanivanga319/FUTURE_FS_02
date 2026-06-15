import React, { useState } from 'react';
import Sidebar from './Sidebar';
import LeadTable from './LeadTable';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState('overview');

  // Local state to keep track of system configurations inside the settings panel
  const [settingsForm, setSettingsForm] = useState({
    adminEmail: 'admin@workspace.vcs',
    webhookUrl: 'https://api.crm.vcs/v1/webhooks/incoming',
    enableNotifications: true
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      {/* 1. Your original structured modular sidebar */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div style={{ flex: 1, padding: '40px', boxSizing: 'border-box', overflowY: 'auto' }}>
        

        {currentTab === 'overview' && <LeadTable />}
        
        
        {currentTab === 'performance' && (
          <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: '700' }}>
              📈 Performance Analytics Panel
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 30px 0' }}>
              Live conversion statistics and pipeline optimization metrics processed from database collections.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              {/* Target Efficiency Progress Bar Card */}
              <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '15px', fontWeight: '600' }}>Workspace Pipeline Efficiency</h4>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', height: '14px', borderRadius: '7px', overflow: 'hidden', marginBottom: '8px' }}>
                  {/* Dynamic filler width mapping */}
                  <div style={{ width: '70%', backgroundColor: '#10b981', height: '100%' }}></div>
                </div>
                <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>70% Target threshold optimization reached</span>
              </div>

          
              <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '15px', fontWeight: '600' }}>Channel Source Capture Strength</h4>
                <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#4b5563' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🌐 Google Search Traffic Indices</span><strong style={{ color: '#10b981' }}>High Performance</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>💼 LinkedIn Referral Funnel</span><strong style={{ color: '#f59e0b' }}>Moderate Stable</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {currentTab === 'settings' && (
          <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: '700' }}>
              ⚙️ System Setup Settings
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 30px 0' }}>
              Configure administrative warning distribution channels and incoming webhook processing endpoints.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('⚙️ Workspace parameters updated locally!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '550px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Primary System Alert Target Email</label>
                <input 
                  type="email" 
                  value={settingsForm.adminEmail}
                  onChange={(e) => setSettingsForm({...settingsForm, adminEmail: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Incoming Webhook Pipeline Endpoint URL</label>
                <input 
                  type="text" 
                  value={settingsForm.webhookUrl}
                  onChange={(e) => setSettingsForm({...settingsForm, webhookUrl: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px', fontFamily: 'monospace', color: '#2563eb' }} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                <input 
                  type="checkbox" 
                  id="notify"
                  checked={settingsForm.enableNotifications}
                  onChange={(e) => setSettingsForm({...settingsForm, enableNotifications: e.target.checked})}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="notify" style={{ fontSize: '14px', color: '#374151', cursor: 'pointer', fontWeight: '500' }}>
                  Dispatch automated diagnostic breakdown summaries immediately upon receiving fresh lead logs
                </label>
              </div>

              <div style={{ marginTop: '10px' }}>
                <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}>
                  Save Workspace Parameters
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}