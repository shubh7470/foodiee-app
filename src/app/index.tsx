import React from 'react';

import DashboardScreen from '@/components/home/dashboard';
import { useAuth } from '@/context/auth-context';

export default function Index() {
  const { logout } = useAuth();

  return <DashboardScreen onLogout={logout} />;
}

