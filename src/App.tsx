import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/Navigation';
import { LevelUpCelebration } from './components/RPGSystem';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import GiverDashboard from './pages/GiverDashboard';
import RunnerDashboard from './pages/RunnerDashboard';
import WalletDetail from './pages/WalletDetail';
import Leaderboard from './pages/Leaderboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-primary-bg text-white font-bold text-2xl animate-pulse italic">LOADING...</div>;
  if (!user) return <Navigate to="/" />;
  return <MainLayout>{children}</MainLayout>;
};

const DashboardSwitch = () => {
    const { profile } = useAuth();
    if (profile?.role === 'runner') return <RunnerDashboard />;
    return <GiverDashboard />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <LevelUpCelebration />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardSwitch /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><WalletDetail /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><GiverDashboard /></ProtectedRoute>} />
            <Route path="/bounty" element={<ProtectedRoute><RunnerDashboard /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
