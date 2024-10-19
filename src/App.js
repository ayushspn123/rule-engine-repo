import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CombineRules from './component/CombineRules';
import EvaluateRule from './component/Evaluate';
import CreateRule from './component/CreateRule';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaLayerGroup, FaCheck } from 'react-icons/fa'; 
import './App.css';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Sidebar />
        <div style={styles.contentWrapper}>
          <Header />
          <div style={styles.pageContent}>
            <Routes>
              <Route path="/" element={<CombineRules />} />
              <Route path="/evaluate" element={<EvaluateRule />} />
              <Route path="/create-rule" element={<CreateRule />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.headerTitle}>Rule Engine</h1>
    <div style={styles.authButtons}>
      <button style={styles.loginButton}>Login</button>
      <button style={styles.registerButton}>Register</button>
    </div>
  </header>
);

const Sidebar = () => (
  <aside style={styles.sidebar}>
    <h2 style={styles.sidebarTitle}>Rule Engine</h2>
    <ul style={styles.navList}>
      <li><Link to="/" style={styles.navLink}><FaLayerGroup style={styles.icon} /> Combine Rules</Link></li>
      <li><Link to="/evaluate" style={styles.navLink}><FaCheck style={styles.icon} /> Evaluate Rule</Link></li>
      <li><Link to="/create-rule" style={styles.navLink}><FaPlus style={styles.icon} /> Create Rule</Link></li>
    </ul>
  </aside>
);

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '250px', // Reserve space for the sidebar
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#282c34',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  headerTitle: {
    margin: 0,
  },
  authButtons: {
    display: 'flex',
    gap: '10px',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  },
  registerButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    padding: '20px 10px',
    color: 'white',
    position: 'fixed',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
  sidebarTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#FFDD57',
    fontFamily: 'cursive',
    marginBottom: '20px',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    marginBottom: '5px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  icon: {
    marginRight: '10px',
  },
  pageContent: {
    padding: '20px',
    backgroundColor: '#fff',
    height: 'calc(100vh - 60px)',
    overflowY: 'auto',
  },
};

export default App;
