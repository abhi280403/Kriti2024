import React from 'react';
import './App.css';
import Navbar from './components/header/Navbar';
import Sidebar from './components/pages/Profile/Sidebar';
import AzureAuth from '../src/auth/azureRegisteration';
import Profile from './components/pages/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Profile/>
      {/* <AzureAuth /> */}
    </div>
  );
}

export default App;