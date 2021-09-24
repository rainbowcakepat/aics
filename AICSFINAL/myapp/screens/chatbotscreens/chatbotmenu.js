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
import {chatbotMenuStyles} from '../../styles/chatbotMenuStyles';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ChatbotComponent from './chatbotComponent';

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
        navigation.navigate("AkishaChatbot");
    } 
    if (item.name == 'Ingrid Chatbot') {
        navigation.navigate("IngridChatbot");
    }

    if (item.name == 'Christine Chatbot') {
        navigation.navigate("ChristineChatbot");
    }

    if (item.name == 'Sylvia Chatbot') {
        navigation.navigate("SylviaChatbot");
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

            <View style={chatbotMenuStyles.vCardContainer}>
              
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
                  style={chatbotMenuStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon name="message-square" color="white" size={18} style={{ marginBottom: 2}}/>
                  <Text style={chatbotMenuStyles.txtUpdateArchive}> Ask-ICS </Text>
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
    <View style={chatbotMenuStyles.lgOverallContainer}>

      <View style={chatbotMenuStyles.lgTopHeader}>
        
        <Icon style= {chatbotMenuStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={chatbotMenuStyles.aicsLogoContainer} onPress={() => navigation.toggleDrawer()}>
        </TouchableOpacity>
        <Image source={require('../../assets/aics.png')} style={announcementStyles.aicsLogo}/>
        
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text adjustsFontSizeToFit={true} style={chatbotMenuStyles.titleText}>CICS Chatbots</Text>
            <Text adjustsFontSizeToFit={true} style={chatbotMenuStyles.subtitleText}>Ask the official CICS Chatbots! Select from chatbot categories or type in your concerns and inquiries.</Text>
          </View>
          
        </View>

      </View>

      <View style={chatbotMenuStyles.vSearchBar}>
          
          <Icon name="search" color="#B2B2B2" style={chatbotMenuStyles.searchBaricon} size={19}/>
          <TextInput adjustsFontSizeToFit={true}
          style={chatbotMenuStyles.tiSearch}
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

      <View style={chatbotMenuStyles.vAnnouncements}>
         
        <ScrollView adjustsFontSizeToFit
          >
          {searchtitles}
        </ScrollView>
      </View>

    
      
    </View>
  );
};
export default ChatbotMenu;
