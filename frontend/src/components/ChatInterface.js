import React, { useState, useEffect, useRef } from 'react';
import { Send, Train, Clock, IndianRupee, MapPin, Bot, User } from 'lucide-react';
import './ChatInterface.css';

const ChatInterface = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      loadConversationHistory();
    }
  }, [sessionId]);

  const loadConversationHistory = async () => {
    try {
      const response = await fetch(`/api/chat/history/${sessionId}`);
      const data = await response.json();
      
      if (data.success && data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        setConversationHistory(data.messages);
      }
    } catch (error) {
      console.error('Failed to load conversation history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !sessionId) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();
      console.log('Backend response:', data); // Debug log

      if (data.success) {
        const aiMessage = {
          id: Date.now(),
          type: 'assistant',
          content: data.response || 'No response content',
          timestamp: new Date(),
        };
        console.log('AI Message created:', aiMessage); // Debug log
        setMessages(prev => [...prev, aiMessage]);
        setConversationHistory(prev => [...prev, userMessage, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    
    return (
      <div key={message.id} className={`message ${isUser ? 'user' : 'assistant'} fade-in`}>
        <div className="message-avatar">
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>
        <div className="message-content">
          <div className="message-text">{message.content}</div>
          {message.data && renderTrainData(message.data)}
          <div className="message-timestamp">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };

  const renderTrainData = (data) => {
    if (!data || data.error) return null;

    switch (data.action) {
      case 'SEARCH_TRAINS':
        return renderTrainSearchResults(data);
      case 'CHECK_AVAILABILITY':
        return renderAvailabilityData(data);
      case 'GET_FARE':
        return renderFareData(data);
      case 'GET_STATION_INFO':
        return renderStationInfo(data);
      case 'GET_TRAINS_TO_DESTINATION':
        return renderTrainsToDestination(data);
      default:
        return null;
    }
  };

  const renderTrainSearchResults = (data) => {
    if (!data.trains || data.trains.length === 0) {
      return <div className="no-data">No trains found for this route.</div>;
    }

    return (
      <div className="train-results">
        <h4>🚂 Trains from {data.source} to {data.destination}</h4>
        {data.trains.map((train) => (
          <div key={train.id} className="train-card">
            <div className="train-header">
              <div className="train-name">
                <Train size={16} />
                <span>{train.name} ({train.number})</span>
              </div>
              <div className="train-type">{train.type}</div>
            </div>
            <div className="train-details">
              <div className="train-route">
                <div className="route-point">
                  <span className="time">{train.departure}</span>
                  <span className="station">{train.sourceName}</span>
                </div>
                <div className="route-line">
                  <div className="line"></div>
                  <span className="duration">{train.duration}</span>
                </div>
                <div className="route-point">
                  <span className="time">{train.arrival}</span>
                  <span className="station">{train.destinationName}</span>
                </div>
              </div>
              <div className="train-classes">
                <span>Classes: {train.classes.join(', ')}</span>
              </div>
              <div className="train-info">
                <span>Distance: {train.distance} km</span>
                <span>Avg Speed: {train.avgSpeed} km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAvailabilityData = (data) => {
    if (!data.train || !data.availability) return null;

    return (
      <div className="availability-data">
        <h4>🎫 Seat Availability for {data.train.name}</h4>
        <div className="train-info-card">
          <div className="train-basic-info">
            <span><strong>Train:</strong> {data.train.name} ({data.train.number})</span>
            <span><strong>Route:</strong> {data.train.sourceName} → {data.train.destinationName}</span>
          </div>
        </div>
        <div className="availability-grid">
          {Object.entries(data.availability).map(([className, availability]) => (
            <div key={className} className="availability-item">
              <div className="class-name">{className}</div>
              <div className="availability-details">
                <div className="available">
                  <span>Available: {availability.available}</span>
                </div>
                {availability.waiting > 0 && (
                  <div className="waiting">
                    <span>Waiting: {availability.waiting}</span>
                  </div>
                )}
                {availability.rac > 0 && (
                  <div className="rac">
                    <span>RAC: {availability.rac}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFareData = (data) => {
    if (!data.fare) return null;

    return (
      <div className="fare-data">
        <h4>💰 Fare Information</h4>
        <div className="fare-card">
          <div className="fare-route">
            <span><strong>From:</strong> {data.source}</span>
            <span><strong>To:</strong> {data.destination}</span>
          </div>
          {data.className ? (
            <div className="fare-amount">
              <IndianRupee size={20} />
              <span className="amount">{data.fare}</span>
              <span className="class">({data.className} Class)</span>
            </div>
          ) : (
            <div className="fare-breakdown">
              <h5>Fare Breakdown:</h5>
              {Object.entries(data.allFares).map(([className, fare]) => (
                <div key={className} className="fare-item">
                  <span className="class">{className}</span>
                  <span className="amount">₹{fare}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStationInfo = (data) => {
    if (!data.station) return null;

    return (
      <div className="station-info">
        <h4>🏢 Station Information</h4>
        <div className="station-card">
          <div className="station-header">
            <MapPin size={20} />
            <span className="station-name">{data.station.name}</span>
          </div>
          <div className="station-details">
            <div className="detail-item">
              <span className="label">Code:</span>
              <span className="value">{data.station.code}</span>
            </div>
            <div className="detail-item">
              <span className="label">City:</span>
              <span className="value">{data.station.city}</span>
            </div>
            <div className="detail-item">
              <span className="label">State:</span>
              <span className="value">{data.station.state}</span>
            </div>
            <div className="detail-item">
              <span className="label">Zone:</span>
              <span className="value">{data.station.zone}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTrainsToDestination = (data) => {
    if (!data.trains || data.trains.length === 0) {
      return <div className="no-data">No trains found to {data.destination}.</div>;
    }

    return (
      <div className="trains-to-destination">
        <h4>🚂 Trains to {data.destination}</h4>
        {data.trains.map((train) => (
          <div key={train.id} className="train-card">
            <div className="train-header">
              <div className="train-name">
                <Train size={16} />
                <span>{train.name} ({train.number})</span>
              </div>
              <div className="train-type">{train.type}</div>
            </div>
            <div className="train-details">
              <div className="train-route">
                <div className="route-point">
                  <span className="time">{train.departure}</span>
                  <span className="station">{train.sourceName}</span>
                </div>
                <div className="route-line">
                  <div className="line"></div>
                  <span className="duration">{train.duration}</span>
                </div>
                <div className="route-point">
                  <span className="time">{train.arrival}</span>
                  <span className="station">{train.destinationName}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const quickActions = [
    { text: "Train from Delhi to Mumbai", icon: Train },
    { text: "Check 2AC availability", icon: Clock },
    { text: "Fare from Chennai to Bangalore", icon: IndianRupee },
    { text: "Station code for New Delhi", icon: MapPin },
  ];

  return (
    <div className="chat-interface">
      <div className="container">
        <div className="chat-container">
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => setInputMessage(action.text)}
              >
                <action.icon size={16} />
                <span>{action.text}</span>
              </button>
            ))}
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <Bot size={48} />
                <h3>Welcome to RailMate AI!</h3>
                <p>I'm your intelligent railway assistant. Ask me about trains, fares, availability, and more!</p>
              </div>
            ) : (
              messages.map(renderMessage)
            )}
            
            {isLoading && (
              <div className="message assistant fade-in">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span>AI is thinking</span>
                    <div className="dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about trains, fares, availability..."
                rows="1"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="send-btn"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
