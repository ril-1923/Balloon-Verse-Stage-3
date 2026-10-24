import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/common/Navbar';
import { Toasts } from './components/common/Toasts';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const SimulatorPage = lazy(() => import('./pages/SimulatorPage'));
const WorldExplorerPage = lazy(() => import('./pages/WorldExplorerPage'));
const BalloonStudioPage = lazy(() => import('./pages/BalloonStudioPage'));
const MissionsPage = lazy(() => import('./pages/MissionsPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function Shell() {
  const { pathname } = useLocation();
  const immersive = pathname.startsWith('/simulator');
  return (
    <>
      {!immersive && <Navbar />}
      <Suspense fallback={<LoadingScreen label="Preparing the launch pad" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/worlds" element={<WorldExplorerPage />} />
          <Route path="/studio" element={<BalloonStudioPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toasts />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
