import logo from './logo.svg';
import './App.css';
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home';
import Weather from './views/Weather'
import CitySingle from './views/CitySingle';
import { AuthContext } from './contexts/AuthProvider';

function App() {
  const { login, user, logout } = useContext(AuthContext)
  return (
    <BrowserRouter>
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Weather App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
            <Link to="/weather" className="nav-link">Weather</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        <p>Hello, {user.displayName}</p>
      </div>

      <Routes>
        <Route path="/weather/:id" element={<CitySingle/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
