import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import Filter from 'bad-words';
import wordExists from 'word-exists';
import badwords from './badwords.js';

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

       const { _id, createdAt, text, user,} = messages[0]
       firestore().collection('allQuestions').add({ _id, createdAt,  text, user })

      let message = messages[0].text;
      console.log(message)

      // if(filter.isProfane(message) == true) {
      //   let reply = 'Bastos ka';
      //   console.log(message,  filter.isProfane(message));
      //   this.sendBotResponse(reply);
      // }

      // if(message == 'ok') {
      //   let reply = 'Thank you for your response. Kindly visit Akisha, Ingrid and Christine Chatbots to reflect your answer.';
      //   this.sendBotResponse(reply);
      // }

      var special = (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);
      

      
       message = message.split(/[ ,]+/);
      //  message = message.replace(/[^a-zA-Z ]/g, "");;
      //  console.log(message);
       
      if(message != null) {
        
        console.log(message);

        for(var i = 0; i < message.length; i++) {
          // console.log('inside for loop');
          console.log(i , message[i]);

          if(filter.isProfane(message[i]) == true) {
            console.log(message[i]); 
            let reply = "Whoops! I can't understand you, please try again.";
            this.sendBotResponse(reply);
            break;
          }
          
          else if(badwords.includes(message[i])) {
            console.log('badword const')
            let reply = 'Oh no! It seems that kemberlu';
            this.sendBotResponse(reply);
            break;
          }


          else if(wordExists(message[i]) == false) {
            console.log('spam')
            let reply = "Looks like you're a spammer.";
            this.sendBotResponse(reply);
            break;
          }

          else {
            console.log('thank you')
            let reply = 'Thank you for your response. Kindly visit Akisha, Ingrid and Christine Chatbots to reflect your answer.';
            this.sendBotResponse(reply);
            break;
          }

        }
        
      }
    };

      // for(var i = 0; i < message.length; ++i) {
      //   console.log(message.length);
        
      //   if(message[i] == 'ok') {
      //     console.log(message[i]);
      //     console.log('may ok');
          
      //   }
      //   else{
      //     console.log(message[i]);
      //     console.log('walang ok');
         
      //   }
       

      // }
   
      

      // console.log(wordExists(message));

      // if(message != null) {
      //   let reply = 'Keme';
      //   this.sendBotResponse(reply);
      // }
      
    
    
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