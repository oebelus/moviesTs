import './App.css';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Home from './pages/home'
import Top from './pages/top'
import Auth from './pages/auth'
import Watched from './pages/watched'
import Watchlist from './pages/watchlist'
import Movie from './pages/movie'

function App() {
  const [visible, setVisible] = useState(false);
  const [authenticated, setAuthenticated] = useState(true)

  const isAuthenticated = Boolean(localStorage.getItem("authenticated"))
  const userId = Number(localStorage.getItem("userId"))
  const username: string | null = localStorage.getItem("username")

  useEffect(() => {
    const isAuthenticated: string | null = localStorage.getItem('authenticated');
    setAuthenticated(isAuthenticated === 'true');
  }, [setAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated")
    setAuthenticated(false);
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
    localStorage.removeItem("isAuthenticated")
    window.location.reload();
    console.log("logout: ", authenticated)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand"></div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className='d-flex'>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className='link-li' to={isAuthenticated ?`/${userId}`: '/'}>
                      <div>Home</div>
                    </Link>
                  </li>
                  {authenticated?
                  <li className="nav-item dropdown">
                    <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      My Movies
                    </div>
                    <ul className="dropdown-menu custom-dropdown" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <Link className='link-li' to={`/${userId}/top`}>
                          <div className='drop-item'>My Top 100 Movies</div>
                        </Link>
                      </li>
                      <li>
                        <Link className='link-li' to={`/${userId}/watchlist`}>
                          <div className='drop-item'>My Watchlist</div>
                        </Link>
                      </li>
                        <li>
                          <Link className='link-li' to={`/${userId}/watched`}>
                            <div className='drop-item'>Watched</div>
                          </Link>
                      </li>
                    </ul>
                  </li>
                  : null }
                  {isAuthenticated?
                  <Link to='/' className="nav-item">
                      <div className='link-li' onClick={handleLogout}>Logout</div>
                  </Link>
                    :
                  <li>
                    <Link className='link-li' to='/login'>
                      <div className='link-li' onClick={() => setVisible(true)}>Login</div>
                    </Link>
                  </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </nav>
      <Routes>
        <Route path={isAuthenticated?`/:userId`:"/"} element={<Home userId={userId} isAuthenticated={isAuthenticated}/>}></Route>
        <Route
          path="/:userId" 
          element={isAuthenticated?<Home userId={userId} isAuthenticated={isAuthenticated}/>:<Navigate to="/" replace/>}>
        </Route>
        <Route path="/" element={<Home userId={userId} isAuthenticated={isAuthenticated} />}></Route>
        <Route path="/login" element={<Auth visible={visible} setVisible={setVisible} authenticated={authenticated}/>}></Route>
        <Route path="/register" element={<Auth visible={visible} setVisible={setVisible} authenticated={authenticated}/>}></Route>
        <Route
          path="/:userId/watched" 
          element={isAuthenticated?<Watched/>:<Navigate to="/" replace/>}>
        </Route>
        <Route
          path="/:userId/watchlist" 
          element={isAuthenticated?<Watchlist/>:<Navigate to="/" replace/>}>
        </Route>
        <Route
          path="/movie/:title" 
          element={isAuthenticated?<Movie/>:<Navigate to="/" replace/>}>
        </Route>
        <Route
          path="/:userId/top" 
          element={isAuthenticated?<Top username = {username}/>:<Navigate to="/" replace/>}>
        </Route>
        <Route
          path={`/${username}/top`}
          element={<Top username = {username}/>}>
        </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;