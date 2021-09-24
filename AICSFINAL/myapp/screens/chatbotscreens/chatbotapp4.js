//Sylvia
import React, { Component,} from 'react';
import { Platform, Dimensions, Image, StyleSheet, View } from 'react-native';
import SylviaChatbot from '../../screens/chatbotscreens/sylviachatbot';

const win = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class ChatbotApp4 extends Component {
  state = {
    text: "Hi! It's your girl, Sylvia from UST-CICS.\n\nHow may I help you today?"
  }
  // constructor(props){
  //   //super(props);
  //   super();
  //   this.textHandler = this.textHandler.bind(this);
  // }
  
  // textHandler (newtext) {
  //   // console.log("test")
  //   //console.log("TEST"+newtext)
  //   this.setState({text: newtext});
  // }

  render() {
    //console.log("in app ");
    //console.log("APP:" + this.state.text)
    return (
	     // <UserInactivity
    //   isActive={active}
    //   timeForInactivity={timer}
    //   onAction={isActive => { setActive(isActive); }}
    //   style={{ flex: 1 }}>
      // <SpeechToText />
   
    <View style={styles.container}>
      
    <View style={styles.header}>
        <Image style={styles.akisha} source={require('../../assets/sylviabot.png')} />
    </View>

      <SylviaChatbot /> 

    </View>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    height: 100,
    backgroundColor: '#ae0000',
  },

  akisha: {
    height: 100, //110
    width: win.width,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 100,
  },

});
