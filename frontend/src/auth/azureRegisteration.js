import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AzureAuth() {
  const { instance, accounts } = useMsal();
  const [m_strUser, setm_strUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there are accounts in the cache and set the user accordingly
    if (accounts.length > 0) {
      const username = accounts[0].username;
      if (username) {
        setm_strUser(username);
      }
    }
  }, [accounts]);

  


  const handleLogin = async () => {
    try {
      // Check if the user is already logged in
      if (accounts.length === 0) {
        // If not logged in, initiate the login process
        const loginResponse = await instance.loginPopup();
        const username = loginResponse.account?.username;
        setm_strUser(username || "");

        // Store tokens in local storage
        localStorage.setItem('msalAccount', JSON.stringify(loginResponse.account));
        navigate('/Editprofile');
      }

      
      const data = await fetch("https://graph.microsoft.com/v1.0/me");
      console.log(data.json)

      postDataToBackend(data);
      
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const postDataToBackend = async (data) => {
    try {
      
      const response = await fetch('http://localhost:8080/api/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      );

      if (!response.ok) {
        throw new Error('Failed to post login data to backend');
      }

      console.log('Login data posted to backend successfully');
    } catch (error) {
      console.error('Error posting login data to backend:', error);
    }
  };
 
  const handleLogout = () => {
    instance.logout();
    setm_strUser("");

    // Clear tokens from local storage
    localStorage.removeItem('msalAccount');
  
  };

  return (
    <div className="auth">
      <h1>Welcome to Your App</h1>
      {m_strUser ? (
        <div>
          <p>User: {m_strUser}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>This is some content on your homepage.</p>
          <button onClick={handleLogin}>Login with Microsoft</button>
        </div>
      )}
    </div>
  );
}

export default AzureAuth;