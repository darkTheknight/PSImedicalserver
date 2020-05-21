import React, { Component } from 'react'

import ChatbotContainer from '../ChatbotContainer';
import { TelecomChatbot } from './TelecomChatbot';

export class TelecomHome extends Component {
    render() {
        return (
            <div>
                <ChatbotContainer setAuthenticated = {this.props.setAuthenticated} chatbot = {<TelecomChatbot />} title ="Telecommunication Service Inquiry Chatbot"/>
            </div>
        )
    }
}

export default TelecomHome
