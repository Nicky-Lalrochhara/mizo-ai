import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const aiMessage = { text: response.data.reply, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: "Hmanlai ah harsatna a awm e. Hmalamah hman leh rawh.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>Mizo AI Chatbot</h1>
      <p>He chatbot hi Mizo tawng chauh a sawi thei.</p>
      
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message ai">Tha i zawh lai...</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mizo tawngin ziak rawh..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Tha i zawh lai...' : 'Tawng'}
        </button>
      </form>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #2d3748;
        }
        .chat-container {
          height: 500px;
          overflow-y: auto;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 20px;
          background-color: #f7fafc;
        }
        .message {
          margin: 10px 0;
          padding: 10px;
          border-radius: 8px;
          max-width: 70%;
        }
        .user {
          background-color: #4299e1;
          color: white;
          margin-left: auto;
        }
        .ai {
          background-color: #e2e8f0;
          color: #2d3748;
          margin-right: auto;
        }
        input {
          width: 70%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          margin-right: 10px;
        }
        button {
          padding: 10px 20px;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}