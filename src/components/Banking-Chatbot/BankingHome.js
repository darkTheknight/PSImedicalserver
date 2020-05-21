import React, { Component } from 'react'

import ChatbotContainer from '../ChatbotContainer';
import { BankingChatbot } from './BankingChatbot';

export class BankingHome extends Component {
    render() {
        return (
            <div>
                <ChatbotContainer setAuthenticated = {this.props.setAuthenticated} chatbot = {<BankingChatbot />} title ="Banking Service Inquiry Chatbot"/>
            </div>
        )
    }
}

export default BankingHome
