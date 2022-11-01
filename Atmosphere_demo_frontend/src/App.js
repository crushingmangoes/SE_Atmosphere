import React, { useEffect, useState , useRef} from 'react';
import Button from '@material-ui/core/Button';
import {over} from 'stompjs';
import './App.css';
import atmosphere from 'atmosphere.js';
import Input from './components/Input/Input';
import LoginForm from './components/LoginForm';
import Messages from './components/Messages/Messages';
import { randomColor } from './utils/common';

var stompClient = null;
var socket = null;
var subs = null;


const SOCKET_URL = 'http://localhost:8080/ws-chat/';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("ONLINE");
  const [getUser, setGetUser] = useState(0);
  
  const statusRef = useRef(status);
  useEffect(() => {
    // console.log(status)
  },[status, messages]);

  const onConnected = (username) => {
    setStatus("ONLINE");
    
    
    setTimeout(()=> 
    {
      stompClient.subscribe('/topic/group', onMessageReceived)
      {
        console.log("Connected!!")
        stompClient.send("/app/newUser",
        {},
        JSON.stringify({sender: username, status:status, content: 'Logged In'})
    )

      }

    }, 500);

  }

  const userJoin = () => 
  {
    var chatMessage = 
    {
      sender: user.username,
      content: "JOINED"
    }
    stompClient.send("/app/send", {}, JSON.stringify(chatMessage));
  }

  const onError = (err) => 
  {
    console.log(err);
  }

  const onChangeStatus = () => {
    console.log("Status Changed");
  }

  const onMessageReceived = (payload) => {
    console.log('New Message Received!!', payloadData);
    var payloadData = JSON.parse(payload.responseBody);


    console.log(status)
    messages.push(payloadData)
    setMessages([...messages]);

  }

  const onSendMessage = (msgText) => {

      var chatMessage = {
        sender: user.username,
        content: msgText
        // status:"MESSAGE"
      };
      console.log('Hello');
      subs.push(JSON.stringify(chatMessage));      
    
  }

  const handleLoginSubmit = (username) => {
    console.log(username, " Logged in..");

    setUser({
      username: username,
      color: randomColor()
    })

  	// var request = new  atmosphere.AtmosphereRequest(); 
    var request = {
      url : 'http://localhost:8080/chat',
      contentType : "application/json",
      logLevel : 'debug',
      transport : 'websocket',
      trackMessageLength : true,
      reconnectInterval : 5000
    };
    socket = atmosphere;
    request.onOpen = (response) => {console.log(response.transport)};
    request.onMessage = onMessageReceived;
    subs = socket.subscribe(request);
  }

  const pulseServer = () => 
  {
    //Task3
    //Hint adapt the onSendMessage function to perform a push to server

  }

  return (
    <div className="App">
      {!!user ?
        (
            <>
            <Messages
              messages={messages}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage} currentUser={user}  status={status}/>
            <div>
              <Button color="secondary" onClick={pulseServer}>PULSE</Button>
            </div>
          </>
        ) :
        <LoginForm onSubmit={handleLoginSubmit} />
      }
    </div>
  )
}

export default App;
