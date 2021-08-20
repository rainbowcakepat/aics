import React, { Component,useState} from 'react';
import { Platform, Dimensions, SafeAreaView, Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import AkishaChatbot from '../screens/akishachatbot';

const win = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class ChatbotApp extends Component {
  state = {
    text: 'Hi! I am your virtual assistant from Dell Technologies.\n\nHow may I help you today?'
  }
  constructor(props){
    //super(props);
    super();
    this.textHandler = this.textHandler.bind(this);
  }
  
  textHandler (newtext) {
    // console.log("test")
    
    console.log("TEST"+newtext)
    this.setState({text: newtext});
  }

  render() {
    console.log("in app ");
    console.log("APP:" + this.state.text)
    return (
	     // <UserInactivity
    //   isActive={active}
    //   timeForInactivity={timer}
    //   onAction={isActive => { setActive(isActive); }}
    //   style={{ flex: 1 }}>
      // <SpeechToText />
   
    <View style={styles.container}>
      
    <View style={styles.header}>
        <Image style={styles.akisha} source={require('../assets/akishabot.png')} />
    </View>

      <AkishaChatbot style={styles.containers}
      text = 'Hi! I am your virtual assistant from Dell Technologies.\n\nHow may I help you today?'
      fortextHandle={this.textHandler} /> 

    </View>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  akisha: {
    height: 110,
    width: win.width,
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 100,
  },

});
