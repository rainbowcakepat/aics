
 import React, {Component} from 'react';
 import { StyleSheet,} from 'react-native';
 import {GiftedChat} from 'react-native-gifted-chat';
 
 import {Dialogflow_V2} from 'react-native-dialogflow';
 import { dialogflowConfig } from '../chatbotscreens/env';
 
 const akisha = {
   _id: 2,
   name: 'Virtual Assistant',
   avatar: require('../../assets/akisha.png'),
 };
 
 class AkishaChatbot extends Component {
   constructor(props) {
     //super(props);
     super();
     this.state = {
       messages: [
         {
           _id: 1,
           text: `Hi! It's your girl, Akisha from UST-CICS.\n\nHow may I help you today?`,
           createdAt: new Date(),
           user: akisha,
         }
       ]
     };
   };
   
   onSend(messages = []) {
     this.setState(previousState => ({
       messages: GiftedChat.append(previousState.messages, messages)
     }));
 
     let message = messages[0].text;
     Dialogflow_V2.requestQuery(
       message,
       result => this.handleGoogleResponse(result),
       error => console.log (error)
     )
   }
 
   componentDidMount() {
     Dialogflow_V2.setConfiguration(
       dialogflowConfig.client_email,
       dialogflowConfig.private_key,
       Dialogflow_V2.LANG_ENGLISH_US,
       dialogflowConfig.project_id
     );
     this.setState({
       messages: [
         {
           _id: 1,
           text: `Hi! It's your girl, Akisha from UST-CICS.\n\nHow may I help you today?`,
           createdAt: new Date(),
           user: akisha,
         }
       ]
     })
   }
 
   handleGoogleResponse (result) {
     let text = result.queryResult.fulfillmentMessages[0].text.text[0];
     console.log(text);
     this.sendBotResponse (text);
   }
 
   sendBotResponse(text) {
     let msg = {
       _id: this.state.messages.length + 1,
       text,
       createdAt: new Date(),
       user: akisha
     };
 
     this.setState(previousState => ({
       messages: GiftedChat.append(previousState.messages, [msg])
     }));
     this.props.fortextHandle(text)
   }
 
   // reverseArray (messages) {
   //   revMessages= this.state.messages.reverse();
   // }
 
   render() {
     console.log("n chatbot");
     return (

         <GiftedChat
           messages={this.state.messages}
           onSend={messages => this.onSend(messages)}
           //PLUS SIGN ETO: onPressActionButton = {()=>this.props.fortextHandle(this.state.messages)}
           user={{
             _id: 1
           }}
          />   
     );
   }
 
 }
 
 styles = StyleSheet.create ({
   giftedchat: {
     flex: 1, 
     backgroundColor: '#fff',
   }
 });
 
 export default AkishaChatbot;