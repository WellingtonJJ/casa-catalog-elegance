
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const Admin = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-inter">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <AdminDashboard onLogout={signOut} />
      ) : (
        <AdminLogin />
      )}
    </div>
  );
};

export default Admin;
