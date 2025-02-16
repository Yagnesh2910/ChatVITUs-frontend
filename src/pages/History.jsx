import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/History.css';
import binIcon from '../assets/bin.png';

function History() {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user ID (Replace this with actual auth logic)
  const user_id = localStorage.getItem("user_id"); // Get from authentication or context

  useEffect(() => {
  const fetchHistory = async () => {
    if (!user_id) return;
    
    setLoading(true);
    try {
      // const response = await fetch(`http://localhost:4000/chats/getChatHistory/${user_id}`);
      const response = await fetch(`https://chatvitus-backend.onrender.com/chats/getChatHistory/${user_id}`);
      const data = await response.json();

      if (response.ok) {
        setChatHistory(data.messages || []);
      } else {
        console.error("Error:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      setError("Failed to load chat history.");
    } finally {
      setLoading(false);
    }
  };
  fetchHistory();
}, [user_id]);

  const clearHistory = async () => {
    if (!user_id) return;

    try {
      // const response = await fetch(`http://localhost:4000/chats/clearChatHistory/${user_id}`, {
      const response = await fetch(`https://chatvitus-backend.onrender.com/chats/clearChatHistory/${user_id}`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setChatHistory([]);
      } else {
        console.error("Error:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to clear history:", error);
      setError("Failed to clear chat history.");
    }
  };

  return (
    <Layout>
      <div className='container'>
        <div className='chat-area'>
          {loading ? (
            <p id='text'>Loading chat history...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : chatHistory.length > 0 ? (
            chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <p dangerouslySetInnerHTML={{ __html: message.text }} />
                <small>{new Date(message.timestamp).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p id='history-text'>No chat history found.</p>
          )}
        </div>

        {/* Clear Chat History Button */}
        <div className="clear-history">
          <img src={binIcon} alt="" onClick={clearHistory}/>
        </div>
      </div>
    </Layout>
  );
}

export default History;
