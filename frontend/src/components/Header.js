import React, { useState, useEffect } from 'react';
import { Train, Bot, Sun, Moon } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Train className="logo-icon" />
            <div className="logo-text">
              <h1>RailMate AI</h1>
              <span>Intelligent Railway Assistant</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="ai-status">
              <Bot className="ai-icon" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
