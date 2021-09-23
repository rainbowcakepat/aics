import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Text,
  ScrollView,
  Modal,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Button,
  ImageBackground
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

import UnansweredQuestionComponent from './unansweredQuestionComponents';
import {unansweredQuestionsStyles} from '../../styles/unansweredQuestionsStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const UnansweredQuestions = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [newText, setNewQuestion] = useState('');
  const [newcreatedAt, setNewTime] = useState('');
  const [newAnswer, setnewAnswer] = useState('');

  const [validate, setValidate] = useState(false);

  const [newID, setNewID] = useState('');

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    const fetchUnansweredQuestions = firestore()
      .collection('allUnansweredQuestions')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const posts = [];

        querySnapshot.forEach(documentSnapshot => {
          posts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setPosts(posts);
        setLoading(true);
      });
    // Unsubscribe from events when no longer in use
    return () => fetchUnansweredQuestions();
  }, []);

 
  const getQuestions = (item) => {
    setisModalVisible(true);
    setNewQuestion(item.text);

    setNewID(item.key);
    console.log(item.text, item.key);
  };

  const onPressSave = (newID) => {
    console.log('Gumagana ba to', newID);
    setisModalVisible(false);
    
    firestore()
    .collection('allAnsweredQuestions')
    .doc()
    .set({
      question: newText,
      createdAt: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
      answer: newAnswer,
    })
    .then(() => {
        setNewQuestion('');
        setnewAnswer('');
      console.log('Answer added!', id);
      deleteQuestion(newID);
    });
  };

 
  let orig;

  const deleteQuestion = id => {
    firestore()
      .collection('allUnansweredQuestions')
      .doc(id)
      .delete()
      .then(() => {
        console.log('ID: User deleted!', id);
      });
  };


  let searchtitles = null;

  if (loader) {
    searchtitles = posts
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.text
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
        ) {
          return item;
        }
      })
      .map((item, key) => {
        return (
          <View key={key} >

            <View style={unansweredQuestionsStyles.vCardContainer}>
              
              <UnansweredQuestionComponent 
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propsqsn={item.text}
                propstime={item.createdAt}
              />

              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

              <TouchableOpacity
                  style={unansweredQuestionsStyles.toUpdate}
                  onPress={() => getQuestions(item)}>
                  <Icon name="edit" color="white" size={16} style={{ marginBottom: 5 }}/>
                  <Text style={unansweredQuestionsStyles.txtUpdateArchive}> Answer question </Text>
                </TouchableOpacity>
            
              </View>

            </View>

            <Modal
              animationType="fade"
              visible={isModalVisible}
              onRequestClose={() => setisModalVisible(false)}>

              <View style={unansweredQuestionsStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={unansweredQuestionsStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={unansweredQuestionsStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={unansweredQuestionsStyles.txtEdit}> Answer Question</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}>Question: </Text>
                        
                    <TextInput
                    style={unansweredQuestionsStyles.txtTitle}
                    onChangeText={text => setNewQuestion(text)}
                    placeholder={'Title'}
                    placeholderTextColor={'#B2B2B2'}
                    value={newText}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={50}>
                </TextInput>
                 
                </ImageBackground>
                
                <View style={unansweredQuestionsStyles.vtxtContent}>
                  
                  <ScrollView>
            
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Answer Content:</Text>
                      
                    <TextInput
                      style={unansweredQuestionsStyles.txtContent}
                      onChangeText={text => {setnewAnswer(text); setValidate(text)}}
                      placeholder={'Content'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newAnswer}
                      multiline={true}
                      numberOfLines={5}
                      maxLength={550}></TextInput>
                  </ScrollView>

                </View>

                  <ScrollView style={unansweredQuestionsStyles.imageContainer}>

               </ScrollView>
               

                <View style={unansweredQuestionsStyles.vSaveCancel}>

                  {
                      validate ? 
                      <TouchableOpacity style={unansweredQuestionsStyles.btnSave}
                      onPress={() => onPressSave(newID)}>
                        <Text style={unansweredQuestionsStyles.txtSave}>Save</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={unansweredQuestionsStyles.btnNotSave}>
                        <Text style={unansweredQuestionsStyles.txtSave}>Save</Text>
                      </TouchableOpacity>

                  }  

                  <TouchableOpacity style={unansweredQuestionsStyles.btnCancel}
                  onPress={() => setisModalVisible(false)}>
                    <Text style={unansweredQuestionsStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            

            </Modal>
          </View>
        );
      });
  } else {
    searchtitles = (
      <View style={{flexDirection: 'column', 
      justifyContent: 'center',
      }}>
        <ImageBackground  source={require('../../assets/aicslogo.png')} 
        style={{width: 250, height: 150, alignSelf:'center', margin: 32, resizeMode:'contain'}}
        ></ImageBackground>
        <ActivityIndicator size="large" color='purple'></ActivityIndicator>
      </View>
    );
  }

  if (searchtitles.length < 1) {
    searchtitles = 
    <ImageBackground  source={require('../../assets/./icons/aicsnoabout.png')} 
    style={{width: 350, height: 220, alignSelf:'auto', margin: 32, resizeMode:'contain'}}>
    </ImageBackground>
  }

  return (
    <View style={unansweredQuestionsStyles.lgOverallContainer}>

      <View style={unansweredQuestionsStyles.lgTopHeader}>
        
        <Icon style= {unansweredQuestionsStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={unansweredQuestionsStyles.aicsLogoContainer} onPress={() => navigation.toggleDrawer()}>
        </TouchableOpacity>
        <Image source={require('../../assets/aics.png')} style={unansweredQuestionsStyles.aicsLogo}/>
        
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text adjustsFontSizeToFit={true} style={unansweredQuestionsStyles.titleText}>Unanswered Questions</Text>
            <Text adjustsFontSizeToFit={true} style={unansweredQuestionsStyles.subtitleText}>Answer inquiries and concerns from the CICS Community. </Text>
          </View>
          
        </View>

      </View>

      <View style={unansweredQuestionsStyles.vSearchBar}>
          
          <Icon name="search" color="#B2B2B2" style={unansweredQuestionsStyles.searchBaricon} size={19}/>
          <TextInput adjustsFontSizeToFit={true}
          style={unansweredQuestionsStyles.tiSearch}
            numberOfLines={1}
            maxLength={50}
            placeholder={'Search'}
            placeholderTextColor={'#B2B2B2'}
            onChangeText={text => {
              setSearchTerm(text);
              console.log(`search: ${searchTerm}`);
            }}>
            </TextInput>

      </View>

      <View style={unansweredQuestionsStyles.vAnnouncements}>
        
        <ScrollView adjustsFontSizeToFit
          >
          {searchtitles}
        </ScrollView>
      </View>

   
    </View>
  );
};
export default UnansweredQuestions;