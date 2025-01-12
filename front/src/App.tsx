import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Movie from './pages/movie';
import Navbar from './Components/Navbar';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Password from './pages/Authentication/Password';
import MovieList from './pages/MovieList';

const App = () => {
  const [, setVisible] = useState(false);
  const [, setAuthenticated] = useState(false);

  const isAuthenticated = Boolean(localStorage.getItem('authenticated'));
  const userId = localStorage.getItem('userId');
  const username: string | null = localStorage.getItem('username');

  useEffect(() => {
    setAuthenticated(localStorage.getItem('authenticated') === 'true');
  }, []);

  return (
    <div className="text-center bg-card min-h-screen font-mono">
      <BrowserRouter>
        <Navbar
          setVisible={setVisible}
          setAuthenticated={setAuthenticated}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home userId={userId} isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<Password />} />
          

          {/* Protected Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Home userId={userId} isAuthenticated={isAuthenticated} /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/watched"
            element={isAuthenticated ? <MovieList username={username} /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/watchlist"
            element={isAuthenticated ? <MovieList username={username} /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/top"
            element={isAuthenticated ? <MovieList username={username} /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/movie/:title"
            element={isAuthenticated ? <Movie /> : <Navigate to="/auth/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
