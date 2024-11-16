import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Top from './pages/top';
import Watched from './pages/watched';
import Watchlist from './pages/watchlist';
import Movie from './pages/movie';
import Navbar from './Components/Navbar';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Password from './Components/Authentication/Password';
import Authentication from './pages/Authentication';

const App = () => {
  const [, setVisible] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const isAuthenticated = Boolean(localStorage.getItem('authenticated'));
  const userId = Number(localStorage.getItem('userId'));
  const username: string | null = localStorage.getItem('username');

  useEffect(() => {
    setAuthenticated(localStorage.getItem('authenticated') === 'true');
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          authenticated={authenticated}
          isAuthenticated={isAuthenticated}
          userId={userId}
          setVisible={setVisible}
          setAuthenticated={setAuthenticated}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home userId={userId} isAuthenticated={isAuthenticated} />} />
          <Route path="/auth/*" element={<Authentication />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="password" element={<Password />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/:userId"
            element={isAuthenticated ? <Home userId={userId} isAuthenticated={isAuthenticated} /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/:userId/watched"
            element={isAuthenticated ? <Watched /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/:userId/watchlist"
            element={isAuthenticated ? <Watchlist /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/movie/:title"
            element={isAuthenticated ? <Movie /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/:userId/top"
            element={isAuthenticated ? <Top username={username} /> : <Navigate to="/auth/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
