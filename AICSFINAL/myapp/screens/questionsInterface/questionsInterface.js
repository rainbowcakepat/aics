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
  ImageBackground,
  Linking
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';

import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

import {announcementStyles} from '../../styles/announcementStyles';
import {questionStyles} from '../../styles/questionStyles';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ChatbotComponent from '../chatbotscreens/chatbotComponent'; 

const chatbotData = [
    {
      id: 0,
      imgpath: require('../../assets/./chatbots/akisha.png'),
      name: 'Akisha Chatbot',
      subtitle: 'Billings, Enrollment, Application, Tuition Fee',
      keywords: 'Billings, Enrollment, Application',
    },
    { 
      id: 1,
      imgpath: require('../../assets/./chatbots/ingrid.png'),
      name: 'Ingrid Chatbot',
      subtitle: 'Shifting and Special cases',
      keywords: 'Shifting and Special cases',
    },
    {
      id: 2,
      imgpath: require('../../assets/./chatbots/christine.png'),
      name: 'Christine Chatbot',
      subtitle: 'Year level inquiries',
      keywords: 'Year level inquiries',
    },
    {
      id: 3,
      imgpath: require('../../assets/./chatbots/sylvia.png'),
      name: 'Sylvia Chatbot',
      subtitle: 'Directly chat and ask your inquiries and concerns',
      keywords: 'Others',
    },
  
  ];
  

const ChatbotMenu = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [isImageModalVisible, setImageModal] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [newTitles, setNewTitles] = useState('');
  const [newContents, setNewContents] = useState('');
  const [newLinks, setNewLinks] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);
  const [newID, setNewId] = useState('');

  const [newUrl, setNewURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [archivedtitles, setArchivedTitle] = useState('');
  const [archivedlinks, setArchivedLink] = useState('');
  const [archivedcontents, setArchivedContent] = useState('');
  const [archivedphoto, setArchivedPhoto] = useState(null);

  useEffect(() => {
    
        setLoading(true);
      });
  
  const getAnnouncements = (item) => {
    if(item.name == 'Akisha Chatbot') {
        Linking.openURL("https://dialogflow.cloud.google.com/#/agent/akisha-chatbot-camr/intents");
    } 
    if (item.name == 'Ingrid Chatbot') {
        Linking.openURL("https://dialogflow.cloud.google.com/#/agent/ingrid-chatbot-lrmj/intents");
    }

    if (item.name == 'Christine Chatbot') {
        Linking.openURL("https://dialogflow.cloud.google.com/#/agent/christine-chatbot-dqcq/intents");
    }
   
  };


  let searchtitles = null;

  if (loader) {
    searchtitles = chatbotData
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.keywords
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

            <View style={questionStyles.vCardContainer}>
              
              <ChatbotComponent 
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propsimgpath={item.imgpath}
                propsname={item.name}
                propssubtitle={item.subtitle}
                // propsimage={item.url}
              />

              <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>

                <TouchableOpacity
                  style={questionStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon name="message-square" color="white" size={18} style={{ marginBottom: 2}}/>
                  <Text style={questionStyles.txtUpdateArchive}> Modify </Text>
                </TouchableOpacity>
         
              </View>

            </View>

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
    <ImageBackground  source={require('../../assets/./icons/aicsnoannouncements.png')} 
    style={{width: 350, height: 220, alignSelf:'auto', margin: 32, resizeMode:'contain'}}>
    </ImageBackground>
  }

  return (
    <View style={questionStyles.lgOverallContainer}>

      <View style={questionStyles.lgTopHeader}>
        
        <Icon style= {questionStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={questionStyles.aicsLogoContainer} >
        </TouchableOpacity>
        <Image source={require('../../assets/aicsfin.png')} style={announcementStyles.aicsLogo}/>
        
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text adjustsFontSizeToFit={true} style={questionStyles.titleText}>Questions Interface</Text>
            <Text adjustsFontSizeToFit={true} style={questionStyles.subtitleText}>Add, Edit, and View Questions and Answers to CICS Chatbots! </Text>
          </View>
          
        </View>

      </View>

      <View style={questionStyles.vSearchBar}>
          
          <Icon name="search" color="#B2B2B2" style={questionStyles.searchBaricon} size={19}/>
          <TextInput adjustsFontSizeToFit={true}
          style={questionStyles.tiSearch}
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

      <View style={questionStyles.vAnnouncements}>
         
        <ScrollView adjustsFontSizeToFit contentContainerStyle={{paddingBottom: 35}}
          >
          {searchtitles}
        </ScrollView>
      </View>

    
      
    </View>
  );
};
export default ChatbotMenu;