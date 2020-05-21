import React, { Component } from 'react'

import ChatbotContainer from '../ChatbotContainer';
import { MedicalChatbot } from './MedicalChatbot';

export class MedicalHome extends Component {
    render() {
        return (
            <div>
                <ChatbotContainer setAuthenticated = {this.props.setAuthenticated} chatbot = {<MedicalChatbot />} title ="Medical Service Inquiry Chatbot"/>
            </div>
        )
    }
}

export default MedicalHome
