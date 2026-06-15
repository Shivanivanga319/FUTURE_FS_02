import React, { useState, useEffect } from 'react';

export default function LeadTable() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeadsFromDatabase();
  }, []);
  const fetchLeadsFromDatabase = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/leads');
      const data = await response.json();
      setLeads(data);
      if (data.length > 0) {
        setSelectedLead(data[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setLoading(false);
    }
  };
  const handleSaveNote = async () => {
    if (!noteText.trim()) return;

    try {
      const currentNotes = selectedLead.notes || [];
      const updatedNotes = [noteText, ...currentNotes];
      const response = await fetch(`http://localhost:8000/api/leads/${selectedLead._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: updatedNotes })
      });

      if (!response.ok) throw new Error('Failed to update record on database.');

      const updatedLeadData = await response.json();
      setLeads(prevLeads => prevLeads.map(lead => lead._id === updatedLeadData._id ? updatedLeadData : lead));
      setSelectedLead(updatedLeadData);
      setNoteText(''); // Clean out the textarea container block
      alert('📝 Follow-up note saved securely to Atlas!');
    } catch (err) {
      console.error('Error saving follow-up log:', err);
      alert('Failed to save follow-up note.');
    }
  };
  const totalLeads = leads.length;
  const closedConversions = leads.filter(lead => lead.status === 'Converted').length;
  const growthRate = totalLeads > 0 ? ((closedConversions / totalLeads) * 100).toFixed(1) : '0.0';
  const filteredLeads = leads.filter(lead => {
    const term = search.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.source?.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          ☰ Admin Workspace Panel
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '35px' }}>
        <div style={{ flex: 1, backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '5px solid #2563eb' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Leads Logged</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#111827', marginTop: '6px' }}>{totalLeads}</div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '5px solid #10b981' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Closed Conversions</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginTop: '6px' }}>{closedConversions}</div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '5px solid #3b82f6' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overall Conversion Rate</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#2563eb', marginTop: '6px' }}>{growthRate}%</div>
        </div>
      </div>
      <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <span style={{ position: 'absolute', marginLeft: '16px', color: '#9ca3af', zIndex: 1 }}>🔍</span>
        <input 
          type="text" 
          placeholder="Filter records by prospect name, email, or source..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '14px 16px 14px 45px', borderRadius: '8px', border: '1px solid #e5e7eb', boxSizing: 'border-box', outline: 'none', fontSize: '14px', backgroundColor: '#ffffff', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        <div style={{ flex: 1.8, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6', color: '#4b5563', fontSize: '13px', fontWeight: '600' }}>
                <th style={{ padding: '12px 10px' }}>Registration Date</th>
                <th style={{ padding: '12px 10px' }}>Prospect Details</th>
                <th style={{ padding: '12px 10px' }}>E-mail</th>
                <th style={{ padding: '12px 10px' }}>Source Origin</th>
                <th style={{ padding: '12px 10px' }}>Pipeline Phase</th>
                <th style={{ padding: '12px 10px' }}>Action File</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Loading live records...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No matching leads found.</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr 
                    key={lead._id} 
                    onClick={() => setSelectedLead(lead)}
                    style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', backgroundColor: selectedLead?._id === lead._id ? '#eff6ff' : 'transparent' }}
                  >
                    <td style={{ padding: '16px 10px', color: '#6b7280', fontSize: '14px' }}>
                      {lead.createdAt ? new Date(lead.createdAt).toISOString().split('T')[0] : '2026-06-01'}
                    </td>
                    <td style={{ padding: '16px 10px', fontWeight: '700', color: '#111827', fontSize: '14px' }}>{lead.name}</td>
                    <td style={{ padding: '16px 10px', color: '#4b5563', fontSize: '14px' }}>{lead.email}</td>
                    <td style={{ padding: '16px 10px', color: '#4b5563', fontSize: '14px' }}>{lead.source}</td>
                    <td style={{ padding: '16px 10px' }}>
                      <span style={{ 
                        padding: '6px 14px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        backgroundColor: lead.status === 'Converted' ? '#d1fae5' : lead.status === 'Contacted' ? '#ffedd5' : '#dbeafe',
                        color: lead.status === 'Converted' ? '#065f46' : lead.status === 'Contacted' ? '#9a3412' : '#1e40af'
                      }}>
                        {lead.status || 'Prospect'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 10px' }}>
                      <button style={{ padding: '6px 14px', backgroundColor: '#ffffff', color: '#1f2937', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Manage →</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        
        {selectedLead && (
          <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px', borderTop: '4px solid #2563eb' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '18px', fontWeight: '700' }}>Lead Profile: {selectedLead.name}</h3>
            
            <div style={{ fontSize: '14px', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div><strong>Channel Source:</strong> {selectedLead.source}</div>
              <div><strong>Timeline Date:</strong> {selectedLead.createdAt ? new Date(selectedLead.createdAt).toISOString().split('T')[0] : '2026-06-01'}</div>
              <div><strong>Current Phase:</strong> <span style={{ padding: '4px 10px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '12px', fontSize: '12px', fontWeight: '600', marginLeft: '6px' }}>{selectedLead.status || 'Prospect'}</span></div>
            </div>
            
            <div style={{ color: '#4b5563', fontSize: '14px', marginBottom: '12px', fontWeight: '600' }}>📋 Historical Follow-up Notes</div>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#374151', minHeight: '60px', marginBottom: '20px', borderLeft: '4px solid #10b981', lineHeight: '1.5', maxHeight: '150px', overflowY: 'auto' }}>
              {selectedLead.notes && selectedLead.notes.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedLead.notes.map((note, index) => (
                    <div key={index} style={{ paddingBottom: index !== selectedLead.notes.length - 1 ? '8px' : '0', borderBottom: index !== selectedLead.notes.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                      • {note}
                    </div>
                  ))}
                </div>
              ) : (
                'Form compiled by customer directly.'
              )}
            </div>

            <textarea 
              placeholder={`Type an update log entry for ${selectedLead.name}...`}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{ width: '100%', height: '90px', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', resize: 'none', outline: 'none', fontSize: '14px', marginBottom: '16px' }}
            />
            <button 
              onClick={handleSaveNote}
              style={{ width: '100%', padding: '14px', backgroundColor: '#029664', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(2, 150, 100, 0.2)' }}
            >
              Save Follow-up Note
            </button>
          </div>
        )}

      </div>
    </div>
  );
}