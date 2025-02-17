import React, { useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import '../styles/Home.css'
import submitBtn from '../assets/submit.png'

function Home() {
  const[userQuery, setUserQuery] = useState('');
  const[messages, setMessages] = useState([]);

  const sendMessage = async()=>{
    if(userQuery.trim() === ''){
      return;
    }

    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      console.error("User ID is missing. Ensure the user is logged in.");
      setMessages([...messages, { sender: 'user', text: userQuery }, { sender: 'bot', text: 'Error: User not authenticated' }]);
      setUserQuery('');
      return;
    }

    setMessages([...messages, {sender:'user', text:userQuery}]);

    try{
      // const response = await axios.post('http://172.16.33.167:5000/ask',{
      // const response = await axios.post('http://localhost:5000/ask',{
      const response = await axios.post('https://chatvitus-app.onrender.com/ask',{
        user_id: user_id,  
        query:userQuery,
        // messages: [{ sender: "user", text: userQuery }],
    });

      const formattedResponse = response.data.response.replace(/\n/g,'<br/>');

      setMessages([
        ...messages,
        {sender:'user', text:userQuery},
        {sender:'bot', text: formattedResponse},
      ]);
      setUserQuery('');
    }
    catch(error){
      console.error("Error: ", error);
      console.error("Error response: ",error.response);

      setMessages([
        ...messages,
        {sender:'user', text:userQuery},
        {sender:'bot', text:'Sorry, there was an error processing your request'},
      ]);

      setUserQuery('');
    }
  };

  return (
    <Layout>
      <div className='container'>
        <div className='chat-area'>
          {messages.map((message, index)=>(
            <div key={index} className={`message ${message.sender}`}>
                <p dangerouslySetInnerHTML={{__html: message.text}}/>
            </div>
          ))}
        </div>
        <div className='inp-section'>
          <input 
            type="text"
            placeholder='Ask us anything'
            id='inp-bar' 
            value={userQuery}
            onChange={(e)=>setUserQuery(e.target.value)}
          />
          <button 
            id='submit-btn'
            onClick={sendMessage}
            >
              <img src={submitBtn} alt="" />
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
