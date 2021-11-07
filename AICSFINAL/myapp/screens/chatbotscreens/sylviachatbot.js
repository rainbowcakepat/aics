import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import Filter from 'bad-words';
import badwords from './badwords.js';
import tagbadwords from './badwords2.js';
import customWords from './customWords.js';

import urlExist from 'url-exist';

const sylvia = {
  _id: 2,
  name: 'sylvia',
  avatar: require('../../assets/./chatbots/sylvia.png'),
};

// const [notWord, setNotWord] = useState(false);

class SylviaChatbot extends React.Component {
  state = {
    messages: [],
    reply: [],
    apiStatus: 0,
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hi! It's your girl, Sylvia from UST CICS 🥰. Type in your unanswered question to update the knowledge of Akisha, Ingrid and Christine. Accepted responses will be forwarded to the CICS Admin.",
          createdAt: new Date(),
          user: sylvia,
          // user: {
          //   _id: 2,
          //   name: 'React Native',
          //   avatar: 'https://facebook.github.io/react/img/logo_og.png',
          // },
        },
      ],
    });
  }

  async onSend(messages = []) {
    const filter = new Filter();
    const wordExists = require('word-exists');

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    //  firestore().collection('allQuestions').add({ _id, createdAt,  text, user })
    // message = message.split(/[ ,]+/);

    let message = messages[0].text;
    console.log(message);

    const {_id, createdAt, text, user} = messages[0];

    var isProfane = false;
    var isBadEnglish = false;
    var isBadTagalog = false;
    var isNotAWord = false;
    var isNotAQuestion = false;

    var wordsCustom = {};
    var wordsEnglish = {};
    var wordsTagalog = {};
    var words = {};

    const newBadEnglish = badwords.split(/[ ,]+/);
    const newBadTagalog = tagbadwords.split(/[ ,]+/);
    const newCustomWords = customWords.split(/[ ,]+/);

    const newMessage = message
      .replace(/[&\/\\#,+()$~%!.„":*‚^_¤?<>|@ª{«»§}©®™ ]/g, ' ')
      .trim()
      .split(/[ ,]+/);
    console.log(newMessage);

    // Spam
    for (words of newMessage) {
      console.log(words);

      await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${words}`)
        .then(val => {
          this.setState({
            apiStatus: val.status,
          });
        })
        .catch(val => {
          this.setState({
            apiStatus: val.status,
          });
        });

      if (this.state.apiStatus == 200) {
        if (newMessage.length >= 3) {
          isNotAWord = false;
        } else if (newMessage.length <= 2) {
          isNotAWord = true;
          break;
        }
      } else if (words == "ust" || words == "ust-cics" || words == "ust-iics" || words == "cics" || words == "cnag" || words == "tgs" || words == "pax"){
        isNotAWord = false;
      }else {
        isNotAWord = true;
        break;
      }

      // console.log('word is', !isNotAWord);
    }

    //Profane
    for (words of newMessage) {
      if (filter.isProfane(words)) {
        isProfane = true;
        break;
      } else {
        isProfane = false;
      }
    }

    //Bad english
    let bdenglish = ["ka", "na", "ng", "sa", "ng", "ha", "ba", "nang", "mga", "pa", "KA", "NA", "NG", "SA", "HA", "BA", "NANG", "MGA"];

    for (words of newMessage) {
      for (let i = 0; i < bdenglish.length; i++) {
        if(words == bdenglish[i]) {
          isBadEnglish = true;
          //console.log('w', words);
          //console.log('beng', bdenglish[i]);
          break;
         }
      }
  }


    //Bad English Custom Words
    /*for (wordsEnglish of newBadEnglish) {
      if (message.includes(wordsEnglish)) {
        isBadEnglish = true;
        break;
      } else {
        isBadEnglish = false;
      }
    }
*/


    if (isBadEnglish) {
      console.log('bad english word');
      let reply =
        "Whoops! I can't understand your language 👀, please try again.";
      this.sendBotResponse(reply);
    } else if (isProfane) {
      console.log('profane word');
      let reply =
        'Welp! Looks like I need to expand my vocabulary 🧐, can you rephrase your sentence?';
      this.sendBotResponse(reply);
    }

  
    else if (isNotAWord) {
      console.log('not word');
      let reply =
        'Whoops! I only understand English, please try asking me questions with at least 3 words 👉👈';
      this.sendBotResponse(reply);
    } else {
      console.log('OK');
      let reply =
        'Thank you for your response. 🥰 Kindly revisit Akisha, Ingrid and Christine Chatbots after 2 working days to answer your inquiry. Have a great day ahead! ✨';
      // let reply = "Type this code to confirm: 100 ✨";
      this.sendBotResponse(reply);
      firestore()
        .collection('allUnansweredQuestions')
        .add({_id, createdAt, text, user});
    }
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: sylvia,
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <GiftedChat
        placeholder="Type in your concerns and inquiries."
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        textInputStyle={{color: 'black'}}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
export default SylviaChatbot;