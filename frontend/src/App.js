import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';

function App() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Initialize conversation when component mounts
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    try {
      const response = await fetch('/api/chat/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSessionId(data.sessionId);
      }
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <ChatInterface sessionId={sessionId} />
      <Footer />
    </div>
  );
}

export default App;
