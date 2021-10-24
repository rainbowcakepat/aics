import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import {Dialogflow_V2} from 'react-native-dialogflow';
import {dialogflowConfig} from '../chatbotscreens/env';

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
          text: "Hi! It's your girl, Akisha from UST-CICS.\n\nHow may I help you today?",
          createdAt: new Date(),
          user: akisha,
        },
      ],
    };
    
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
      error => Alert.alert(
        'Network Failed ', 
        [
          {text: 'Kindly check your internet connectivity', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      ),
    );
  }

  //predefined menus
  onQuickReply(quickReply) {
    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      //error => console.log(error),
      error => Alert.alert(
        'Network Failed ', 
        [
          {text: 'Kindly check your internet connectivity', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      ),
    );
    let msg = {
      _id: this.state.messages.length + 1,
      text: message,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  //color of user bubble
  renderBubble = props => {
    return (
      <Bubble {...props} wrapperStyle={{right: {backgroundColor: '#830505', color:'black'}}} />
    );
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
    this.setState({
      messages: [
        {
          _id: 2,
          text: `What do you want to ask? Type your question or choose from these predefined questions.`,
          createdAt: new Date(),
          user: akisha,
          quickReplies: {
            type: 'radio',
            keepIt: true,
            values: [
              {
                title: 'Tuition Fee',
                value: 'Tuition Fee',
                bColor: '#830505',
                bgColor: '#9C3939',
              },
              {
                title: 'Enrollment Schedule',
                value: 'Enrollment Schedule',
                bColor: '#830505',
                bgColor: '#9C3939',
              },
              {
                title: 'Faculty Application',
                value: 'Faculty Application',
                bColor: '#830505',
                bgColor: '#9C3939',
              },
            ],
          },
        },
        {
          _id: 1,
          text: `Hi! It's your girl, Akisha from UST-CICS.\n\nHow may I help you today?`,
          createdAt: new Date(),
          user: akisha,
        },
      ],
    });
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    console.log(text);
    this.sendBotResponse(text);
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: akisha,
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
    this.props.fortextHandle(text);
  }

  // reverseArray (messages) {
  //   revMessages= this.state.messages.reverse();
  // }

  render() {
    console.log('n chatbot');
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        onQuickReply={quickReply => this.onQuickReply(quickReply)}
        renderBubble={this.renderBubble}
        textInputStyle={{color:'black'}}


        //PLUS SIGN ETO: onPressActionButton = {()=>this.props.fortextHandle(this.state.messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

styles = StyleSheet.create({
  giftedchat: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'black',
  },
});

export default AkishaChatbot;
