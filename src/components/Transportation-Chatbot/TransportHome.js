import React, { Component } from 'react'

import ChatbotContainer from '../ChatbotContainer';
import TransportChatbot from './TransportChatbot';

export class TransportHome extends Component {
    render() {
        return (
            <div>
                <ChatbotContainer setAuthenticated = {this.props.setAuthenticated} chatbot = {<TransportChatbot />} title ="Transportation Service Inquiry Chatbot"/>
            </div>
        )
    }
}

export default TransportHome
