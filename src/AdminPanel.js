import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [isContributor, setIsContributor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and a contributor
    fetch('http://localhost:5000/api/admin/check', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user || null);
        setIsContributor(data.isContributor || false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user)
    return (
      <div>
        <h2>Admin Panel</h2>
        <a href="http://localhost:5000/api/auth/github">Login with GitHub</a>
      </div>
    );
  if (!isContributor)
    return <div>Access denied. You must be a contributor to this project.</div>;

  return (
    <div>
      <h2>Welcome, {user.login}!</h2>
      <p>You have admin access.</p>
      {/* Admin features go here */}
    </div>
  );
};

export default AdminPanel;
