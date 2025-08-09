import React, { useState, useEffect } from 'react';

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn }) => {
  const navStyle = {
    backgroundColor: '#2563eb',
    padding: '1rem',
    marginBottom: '2rem'
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap'
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li>
          <span
            style={currentPage === 'home' ? activeNavLinkStyle : navLinkStyle}
            onClick={() => setCurrentPage('home')}
          >
            Submit Complaint
          </span>
        </li>
        <li>
          <span
            style={currentPage === 'track' ? activeNavLinkStyle : navLinkStyle}
            onClick={() => setCurrentPage('track')}
          >
            Track Complaint
          </span>
        </li>
        {!isLoggedIn ? (
          <li>
            <span
              style={currentPage === 'login' ? activeNavLinkStyle : navLinkStyle}
              onClick={() => setCurrentPage('login')}
            >
              Admin Login
            </span>
          </li>
        ) : (
          <>
            <li>
              <span
                style={currentPage === 'dashboard' ? activeNavLinkStyle : navLinkStyle}
                onClick={() => setCurrentPage('dashboard')}
              >
                Admin Dashboard
              </span>
            </li>
            <li>
              <span
                style={navLinkStyle}
                onClick={handleLogout}
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Complaint Form Component
const ComplaintForm = ({ complaints, setComplaints }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    complaint: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#374151'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const buttonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const successStyle = {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #a7f3d0'
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateComplaintId = () => {
    return `CMP-${Date.now()}`;
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile || !formData.complaint) {
      alert('Please fill in all fields');
      return;
    }

    const complaintId = generateComplaintId();
    const newComplaint = {
      id: complaintId,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      complaint: formData.complaint,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setComplaints([...complaints, newComplaint]);
    setSuccessMessage(`Your complaint has been submitted successfully! Complaint ID: ${complaintId}`);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      complaint: ''
    });

    // Clear success message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
        Submit Your Complaint
      </h2>
      
      {successMessage && (
        <div style={successStyle}>
          {successMessage}
        </div>
      )}

      <div style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle} htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle} htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle} htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle} htmlFor="complaint">Complaint Details *</label>
          <textarea
            id="complaint"
            name="complaint"
            value={formData.complaint}
            onChange={handleInputChange}
            style={textareaStyle}
            placeholder="Please describe your complaint in detail..."
            required
          />
        </div>

        <button type="button" onClick={handleSubmit} style={buttonStyle}>
          Submit Complaint
        </button>
      </div>
    </div>
  );
};

// Admin Login Component
const AdminLogin = ({ setIsLoggedIn, setCurrentPage }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#374151'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const errorStyle = {
    color: '#dc2626',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
        Admin Login
      </h2>
      
      <div style={formStyle}>
        {error && <div style={errorStyle}>{error}</div>}
        
        <div style={inputGroupStyle}>
          <label style={labelStyle} htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <button onClick={handleSubmit} style={buttonStyle}>
          Login
        </button>
        
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
          Demo credentials: admin / admin123
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ complaints, setComplaints }) => {
  const containerStyle = {
    padding: '2rem'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const thStyle = {
    backgroundColor: '#f3f4f6',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb'
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    verticalAlign: 'top'
  };

  const selectStyle = {
    padding: '0.25rem 0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '0.875rem'
  };

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ef4444';
      case 'In Progress': return '#f59e0b';
      case 'Resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>
        Admin Dashboard - All Complaints ({complaints.length})
      </h2>
      
      {complaints.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No complaints submitted yet.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Complaint</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Created</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td style={tdStyle}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {complaint.id}
                    </span>
                  </td>
                  <td style={tdStyle}>{complaint.name}</td>
                  <td style={tdStyle}>{complaint.email}</td>
                  <td style={tdStyle}>{complaint.mobile}</td>
                  <td style={tdStyle}>
                    <div style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                      {complaint.complaint}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                      style={{
                        ...selectStyle,
                        color: getStatusColor(complaint.status),
                        fontWeight: '600'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Track Complaint Component
const TrackComplaint = ({ complaints }) => {
  const [complaintId, setComplaintId] = useState('');
  const [foundComplaint, setFoundComplaint] = useState(null);
  const [error, setError] = useState('');

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const inputGroupStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'end',
    flexWrap: 'wrap'
  };

  const inputStyle = {
    flex: '1',
    minWidth: '200px',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const resultStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const detailRowStyle = {
    display: 'flex',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#374151',
    minWidth: '120px',
    marginRight: '1rem'
  };

  const valueStyle = {
    color: '#1f2937',
    flex: '1'
  };

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!complaintId.trim()) {
      setError('Please enter a complaint ID');
      setFoundComplaint(null);
      return;
    }

    const complaint = complaints.find(c => c.id === complaintId.trim());
    
    if (complaint) {
      setFoundComplaint(complaint);
      setError('');
    } else {
      setFoundComplaint(null);
      setError('Complaint not found. Please check your complaint ID.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ef4444';
      case 'In Progress': return '#f59e0b';
      case 'Resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusBadgeStyle = (status) => ({
    backgroundColor: getStatusColor(status),
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.875rem',
    fontWeight: '600'
  });

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
        Track Your Complaint
      </h2>
      
      <div style={formStyle}>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="Enter your complaint ID (e.g., CMP-1234567890)"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleSearch} style={buttonStyle}>
            Track
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '4px',
          border: '1px solid #fecaca',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {foundComplaint && (
        <div style={resultStyle}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>
            Complaint Details
          </h3>
          
          <div style={detailRowStyle}>
            <span style={labelStyle}>Complaint ID:</span>
            <span style={{ ...valueStyle, fontFamily: 'monospace' }}>
              {foundComplaint.id}
            </span>
          </div>

          <div style={detailRowStyle}>
            <span style={labelStyle}>Name:</span>
            <span style={valueStyle}>{foundComplaint.name}</span>
          </div>

          <div style={detailRowStyle}>
            <span style={labelStyle}>Email:</span>
            <span style={valueStyle}>{foundComplaint.email}</span>
          </div>

          <div style={detailRowStyle}>
            <span style={labelStyle}>Mobile:</span>
            <span style={valueStyle}>{foundComplaint.mobile}</span>
          </div>

          <div style={detailRowStyle}>
            <span style={labelStyle}>Status:</span>
            <span style={getStatusBadgeStyle(foundComplaint.status)}>
              {foundComplaint.status}
            </span>
          </div>

          <div style={detailRowStyle}>
            <span style={labelStyle}>Submitted:</span>
            <span style={valueStyle}>
              {new Date(foundComplaint.createdAt).toLocaleString()}
            </span>
          </div>

          <div style={detailRowStyle}>
            <span style={labelStyle}>Complaint:</span>
            <span style={valueStyle}>{foundComplaint.complaint}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <ComplaintForm complaints={complaints} setComplaints={setComplaints} />;
      case 'track':
        return <TrackComplaint complaints={complaints} />;
      case 'login':
        return <AdminLogin setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return isLoggedIn ? (
          <AdminDashboard complaints={complaints} setComplaints={setComplaints} />
        ) : (
          <AdminLogin setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage} />
        );
      default:
        return <ComplaintForm complaints={complaints} setComplaints={setComplaints} />;
    }
  };

  return (
    <div style={appStyle}>
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div style={{ padding: '0 1rem' }}>
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default App;