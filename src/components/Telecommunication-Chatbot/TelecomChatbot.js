import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import MessageTextBox from '../Chatbox_Common/MessageTextBox';
import SendMessage from '../Chatbox_Common/SendMessage';
import Messages from '../Chatbox_Common/Messages';
import '../css/Chat.css';

const SERVER_URL = "http://127.0.0.1:5000/";
//const SERVER_URL = "https://psichatbot-server.herokuapp.com";

export class TelecomChatbot extends Component {
    constructor(props){
        super(props);
        this.state ={
            // message structure {id: "2020-05-16T09:21:29.250Z", message:"Test" ,userId: "1", isBot: false, date_time: "Sat, 16 May 2020 14:51:29 GMT"}
          messages : [],
          currentMessage : "",
          userId : "",
          testMessages: [],
          context: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.saveMessages = this.saveMessages.bind(this);
    }

    componentDidMount(){
        const token = localStorage.access_token;
        const decoded = jwt_decode(token);
        axios.get(`${SERVER_URL}/telecom/messages/${decoded.user_id}`)
        .then(res=> this.setState(
            { messages : res.data.messages}
        ))
        this.setState({
            userId: decoded.user_id
        }) 
    }

    handleClick(e){
        this.addMessage()
    }

    handleKeyPress(e){
        let enter_pressed = false;
        if(e.key ==="Enter" && this.state.currentMessage){
            enter_pressed = true;
            this.addMessage(enter_pressed);
        }  
    }
    
    handleInputChange(e){
        this.setState({currentMessage : e.target.value});
    }

    addMessage(enter_pressed = true){
        const currentMessage = this.state.currentMessage;
        if(enter_pressed && currentMessage){
            const currentDate = new Date();
            this.setState({messages: [...this.state.messages, {id : currentDate, userId: this.state.userId, message :currentMessage, isBot: false}]});
            this.setState({currentMessage : ""});
            console.log(this.state.messages);
            axios.post(`${SERVER_URL}/telecom`, 
                {
                id : currentDate, userId: this.state.userId, message :currentMessage, isBot: false, context: this.state.context
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res=>this.saveMessages(res.data));
        }
        console.log('AddMessage');
    }

    saveMessages(data){
        console.log(data);
        this.setState({messages: [...this.state.messages, data ], context: data.context})
    }
    render() {
        return (
            <div>
            <div className = "containerNew" >
                <Messages className="messagesBox" messages = {this.state.messages}/>
                <div>
                <MessageTextBox message={this.state.currentMessage} handleTextInput = {this.handleInputChange} handleKeyPress = {this.handleKeyPress}/> {' '}
                <SendMessage handleClick = {this.handleClick} />
                </div>
            </div>
            </div>
        )
    }

    
}



export default TelecomChatbot
