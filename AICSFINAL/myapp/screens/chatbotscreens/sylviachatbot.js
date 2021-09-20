import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import Filter from 'bad-words';

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

      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));

       const { _id, createdAt, text, user,} = messages[0]
       firestore().collection('allQuestions').add({ _id, createdAt,  text, user })

      let message = messages[0].text;
      console.log(message)

      if(filter.isProfane(message) == true) {
        let reply = 'Bastos ka';
        console.log(message,  filter.isProfane(message));
        this.sendBotResponse(reply);
      }

      if(message == 'ok') {
        let reply = 'Thank you for your response. Kindly visit Akisha, Ingrid and Christine Chatbots to reflect your answer.';
        this.sendBotResponse(reply);
      }
      
    }
    
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