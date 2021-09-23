import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import Filter from 'bad-words';
import badwords from './badwords.js';
import tagbadwords from './badwords2.js';

const sylvia = {
  _id: 2,
  name: 'ingrid',
  avatar:  require('../../assets/./chatbots/sylvia.png'),
};




class SylviaChatbot extends React.Component {

    state = {
      messages: [],
      reply: [],
    };
  
    componentDidMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: "Hi! It's your girl, Sylvia from UST CICS. How may I help you?",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },
        ],
      });
  
    
    
    }
  

 
    onSend(messages = []) {
      const filter = new Filter();
      const wordExists = require('word-exists');

      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));

      
      //  firestore().collection('allQuestions').add({ _id, createdAt,  text, user })
      // message = message.split(/[ ,]+/);

      let message = messages[0].text; 
      console.log(message);

      const { _id, createdAt, text, user,} = messages[0]

      var isProfane = false;
      var isBadEnglish = false;
      var isBadTagalog = false;
      var isNotAWord = false;
      var isNotAQuestion = false;

      var wordsEnglish = {};
      var wordsTagalog = {};
      var words = {};

      const newBadEnglish = badwords.split(/[ ,]+/);
      const newBadTagalog = tagbadwords.split(/[ ,]+/);
      const newMessage = message.replace(/[&\/\\#,+()$~%!.„":*‚^_¤?<>|@ª{«»§}©®™' ]/g, " ").trim().split(/[ ,]+/); 
      console.log(newMessage);
     
    
      //Spam
      // for (words of newMessage) {
      //   console.log(words)
          
      //     if (wordExists(words) == false) {
      //       isNotAWord = true;
      //       break;
      //     } 
      //     else {
      //       isNotAWord = false;
      //     }
      // }

      //Profane
      for (words of newMessage) {
        if(filter.isProfane(words)) {
          isProfane = true;
        } else {
          isProfane = false;
        }
      }


      //Bad English Custom Words
      for (wordsEnglish of newBadEnglish) {
        if (message.includes(wordsEnglish)) {
          isBadEnglish = true;
          break;
        } else {
          isBadEnglish = false;
        }
      }

      //Bad Tagalog Custom Words
      for (wordsTagalog of newBadTagalog) {
        if (message.includes(wordsTagalog)) {
          isBadTagalog = true;
          break;
        } else {
          isBadTagalog = false;
        }
      }


      
      if (isBadEnglish) {
        console.log("bad english word");
        let reply = "Whoops! I can't understand your language 👀, please try again.";
        this.sendBotResponse(reply);
      } 
      else if (isProfane) {
        console.log("profane word");
        let reply = "Welp! Looks like I need to expand my vocabulary 🧐, can you rephrase your sentence?";
        this.sendBotResponse(reply);
      }
      else if (isBadTagalog) {
        console.log("bad tagalog word");
        let reply = "Oh no! 🤯 Lets try again with simple keywords";
        this.sendBotResponse(reply);
      }
      else if(isNotAWord) {
        console.log("not word");
        let reply = "Oh no! I didn't get that, can you say that one more time? 🤔";
        this.sendBotResponse(reply);
      }
      else {
        console.log("OK");
        let reply = "Thank you for your response. 🥰 Kindly revisit Akisha, Ingrid and Christine Chatbots after 2 days to answer your inquiry. Have a great day ahead! ✨";
        this.sendBotResponse(reply);
        firestore().collection('allUnansweredQuestions').add({_id, createdAt,  text, user }) 
        
      }
  
    };




   
      
    sendBotResponse(text) {
      let msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: sylvia
      };
  
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [msg])
      }));
    }
  
  
    render() {
      return (
        <GiftedChat
        placeholder="Type in your concerns and inquiries."
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          renderMessage={this.renderMessage}
        />
      );
    }
  
  }
  export default SylviaChatbot;


// export default function Example() {
//   const [messages, setMessages] = useState([]);
//   const [reply, setReplies] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//           _id: '1',
//           text: "Hi! It's your girl, Sylvia from UST CICS. How may I help you? Type in your concerns and inquiries.",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: require('../../assets/./chatbots/sylvia.png')
//           },
//       },
//       ])

//   }, [])

//    const renderMessage = () => {
   
//     return <Text>Hayop</Text>
//   }
  


//   const onSend = useCallback((messages = []) => {

//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//     const { _id, createdAt, text, user,} = messages[0]
//     console.log(_id, createdAt, text, user);

//     if(text != null) {
//         console.log(text, 'ok nice gumagana ata');
//         // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//     }

//     // const { _id, createdAt, text, user,} = messages[0]
//     // firestore().collection('allQuestions').add({ _id, createdAt,  text, user })
//     }, [] 
    
//   );



//   // const onSensendBotResponse = useCallback((messages = []) => {

//   //   setReplies(previousMessages => GiftedChat.append(previousMessages, messages))
//   //   const { _id, createdAt, text, user,} = messages[0]
//   //   console.log(_id, createdAt, text, user);

//   //   if(text != null) {
//   //       console.log('ok nice gumagana ata');
//   //       sendBotResponse();
//   //   }
//   //   // const { _id, createdAt, text, user,} = messages[0]
//   //   // firestore().collection('allQuestions').add({ _id, createdAt,  text, user })
//   //   }, [] 
    
//   // );


//   return (
      
//     <GiftedChat
//       placeholder = 'Type your concerns and inquiries..'
//       messages={messages}
//       onSend={messages => onSend(messages)} 
//       // renderMessage={renderMessage}
//       user={{
//         _id: 1,
//       }}
//     />
//   )
// }