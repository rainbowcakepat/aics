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

import HowToUseStudentComponent from './howToUseStudentComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {announcementComponentStyles} from '../../styles/announcementComponentStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {aboutUsStudentStyles} from '../../styles/aboutUsStudentStyles';

const howToUseStudent = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [newTitle, setNewTitle] = useState('');


  const [newID, setNewId] = useState('');

  const [uploading, setUploading] = useState(false);

  // FOR HOW TO SELECT A CHATBOT
  const [isModalVisibleSelectChatbot, setisModalVisibleSelectChatbot] = useState(false);
  const [newSelectAkisha, setNewSelectAkisha] = useState('');
  const [newSelectIngrid, setNewSelectIngrid] = useState('');
  const [newSelectChristine, setNewSelectChristine] = useState('');
  const [newSelectSylvia, setNewSelectSylvia] = useState('');

  // FOR HOW TO SEND QUERIES TO A CHATBOT
  const [isModalVisibleSendQueries, setisModalVisibleSendQueries] = useState(false);
  const [newAskAkisha, setNewAskAkisha] = useState('');
  const [newAskIngrid, setNewAskIngrid] = useState('');
  const [newAskChristine, setNewAskChristine] = useState('');
  const [newAskSylvia, setNewAskSylvia] = useState('');

  // FOR HOW TO LOGIN AS STUDENT
  const [isModalVisibleStudentLogin, setisModalVisibleStudentLogin] = useState(false);
  const [newStudentLogin, setNewStudentLogin] = useState('');

  // FOR HOW TO VIEW ABOUT US
  const [isModalVisibleViewAboutUs, setisModalVisibleViewAboutUs] = useState(false);
  const [newViewAboutUs, setNewViewAboutUs] = useState('');

  // FOR HOW TO VIEW ANNOUNCEMENTS
  const [isModalVisibleViewAnnouncements, setisModalVisibleViewAnnouncements] = useState(false);
  const [newViewAnnouncements, setNewViewAnnouncements] = useState('');


  useEffect(() => {
    const fetchHowToUse = firestore()
      .collection('howToUseStudent')
      .orderBy('title', 'asc')
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
    return () => fetchHowToUse();
  }, []);

  const getAnnouncements = (item) => {

    setNewId(item.key);

    if (item.title == 'How to Select a Chatbot') {
      setisModalVisibleSelectChatbot(true);
       setNewId(item.key); {/*kinukuha yung ID*/}
       setNewTitle(item.title);
       setNewSelectAkisha(item.selectakisha);
       setNewSelectIngrid(item.selectingrid);
       setNewSelectChristine(item.selectchristine);
       setNewSelectSylvia(item.selectsylvia);
     }

     if (item.title == 'How to send queries to a chatbot') {
      setisModalVisibleSendQueries(true);
       setNewId(item.key); {/*kinukuha yung ID*/}
       setNewTitle(item.title);
       setNewAskAkisha(item.askakisha);
       setNewAskIngrid(item.askingrid);
       setNewAskChristine(item.askchristine);
       setNewAskSylvia(item.asksylvia);
     }

     if (item.title == 'How to Login') {
      setisModalVisibleStudentLogin(true);
       setNewId(item.key); {/*kinukuha yung ID*/}
       setNewTitle(item.title);
       setNewStudentLogin(item.maincontent);
     }

     if (item.title == 'How to view About Us') {
      setisModalVisibleViewAboutUs(true);
       setNewId(item.key); {/*kinukuha yung ID*/}
       setNewTitle(item.title);
       setNewViewAboutUs(item.maincontent);
     }

     if (item.title == 'How to view Announcements') {
      setisModalVisibleViewAnnouncements(true);
       setNewId(item.key); {/*kinukuha yung ID*/}
       setNewTitle(item.title);
       setNewViewAnnouncements(item.maincontent);
     }


};

  let searchtitle = null;

  if (loader) {
    searchtitle = posts
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.title
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

            <View style={announcementComponentStyles.vCardContainer}>
              
              <HowToUseStudentComponent
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.title}
                propskeywords={item.keywords}
              />

              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

                <TouchableOpacity
                  style={announcementComponentStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon name="eye" color="white" size={16} style={{ marginBottom: 5 }}/>
                  <Text style={announcementComponentStyles.txtUpdateArchive}> View </Text>
                </TouchableOpacity>

              </View>

            </View>

            {/*MODAL: HOW TO SELECT A CHATBOT*/}
            <Modal 
              animationType="fade"
              visible={isModalVisibleSelectChatbot}
              onRequestClose={() => setisModalVisibleSelectChatbot(false)}
              
            >
              <View style={announcementComponentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}> How To Use Student </Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}> College of Information and Computing Sciences </Text>
                        
                    <Text style = {announcementComponentStyles.txtTitle}>
                        {newTitle}
                </Text>
                 
                </ImageBackground>
                
                <View style={announcementComponentStyles.vtxtContent}>
                  
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="user" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Select Akisha: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newSelectAkisha}</Text>

                    <View style={{flexDirection:'row'}}>
                      <Icon name="user" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Select Ingrid: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newSelectIngrid}</Text>

                    <View style={{flexDirection:'row'}}>
                      <Icon name="user" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Select Christine: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newSelectChristine}</Text>

                    <View style={{flexDirection:'row'}}>
                      <Icon name="user" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Select Sylvia: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newSelectSylvia}</Text>

                    <Text></Text>
                  </ScrollView>

                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsStudentStyles.btnBack}  onPress={() => setisModalVisibleSelectChatbot(false)}>
                    <Icon name="arrow-left" color="white" type= 'ionicons' size={18} style={{marginBottom: 2, paddingLeft: -20}}/>
                    <Text style={aboutUsStudentStyles.txtBack}>  Back</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            </Modal>

            {/*MODAL: HOW TO SEND QUERIES TO A CHATBOT*/}
            <Modal 
              animationType="fade"
              visible={isModalVisibleSendQueries}
              onRequestClose={() => setisModalVisibleSendQueries(false)}
              
            >
              <View style={announcementComponentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}> How To Use Student </Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}> College of Information and Computing Sciences </Text>
                        
                    <Text style = {announcementComponentStyles.txtTitle}>
                        {newTitle}
                </Text>
                 
                </ImageBackground>
                
                <View style={announcementComponentStyles.vtxtContent}>
                  
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="message-circle" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Ask Akisha: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newAskAkisha}</Text>

                    <View style={{flexDirection:'row'}}>
                      <Icon name="message-circle" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Ask Ingrid: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newAskIngrid}</Text>

                    <View style={{flexDirection:'row'}}>
                      <Icon name="message-circle" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Ask Christine: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newAskChristine}</Text>

                    <View style={{flexDirection:'row'}}>
                      <Icon name="message-circle" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Ask Sylvia: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newAskSylvia}</Text>

                    <Text></Text>
                  </ScrollView>

                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsStudentStyles.btnBack}  onPress={() => setisModalVisibleSendQueries(false)}>
                    <Icon name="arrow-left" color="white" type= 'ionicons' size={18} style={{marginBottom: 2, paddingLeft: -20}}/>
                    <Text style={aboutUsStudentStyles.txtBack}>  Back</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            </Modal>

            {/*MODAL: HOW TO LOGIN AS STUDENT*/}
            <Modal 
              animationType="fade"
              visible={isModalVisibleStudentLogin}
              onRequestClose={() => setisModalVisibleStudentLogin(false)}
              
            >
              <View style={announcementComponentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}> How To Use Student </Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}> College of Information and Computing Sciences </Text>
                        
                    <Text style = {announcementComponentStyles.txtTitle}>
                        {newTitle}
                </Text>
                 
                </ImageBackground>
                
                <View style={announcementComponentStyles.vtxtContent}>
                  
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="key" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> Student Login: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newStudentLogin}</Text>
                    <Text></Text>
                  </ScrollView>

                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsStudentStyles.btnBack}  onPress={() => setisModalVisibleStudentLogin(false)}>
                    <Icon name="arrow-left" color="white" type= 'ionicons' size={18} style={{marginBottom: 2, paddingLeft: -20}}/>
                    <Text style={aboutUsStudentStyles.txtBack}>  Back</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            </Modal>

            {/*MODAL: HOW TO VIEW ABOUT US*/}
             <Modal 
              animationType="fade"
              visible={isModalVisibleViewAboutUs}
              onRequestClose={() => setisModalVisibleViewAboutUs(false)}
              
            >
              <View style={announcementComponentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}> How To Use Student </Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}> College of Information and Computing Sciences </Text>
                        
                    <Text style = {announcementComponentStyles.txtTitle}>
                        {newTitle}
                </Text>
                 
                </ImageBackground>
                
                <View style={announcementComponentStyles.vtxtContent}>
                  
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="eye" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> View About Us: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newViewAboutUs}</Text>
                    <Text></Text>
                  </ScrollView>

                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsStudentStyles.btnBack}  onPress={() => setisModalVisibleViewAboutUs(false)}>
                    <Icon name="arrow-left" color="white" type= 'ionicons' size={18} style={{marginBottom: 2, paddingLeft: -20}}/>
                    <Text style={aboutUsStudentStyles.txtBack}>  Back</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            </Modal>

            {/*MODAL: HOW TO VIEW ANNOUNCEMENTS*/}
            <Modal 
              animationType="fade"
              visible={isModalVisibleViewAnnouncements}
              onRequestClose={() => setisModalVisibleViewAnnouncements(false)}
              
            >
              <View style={announcementComponentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}> How To Use Student </Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}> College of Information and Computing Sciences </Text>
                        
                    <Text style = {announcementComponentStyles.txtTitle}>
                        {newTitle}
                </Text>
                 
                </ImageBackground>
                
                <View style={announcementComponentStyles.vtxtContent}>
                  
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="eye" color="black" type= 'ionicons' size={18}/>
                      <Text style={aboutUsStudentStyles.txtLabelDescription}> View Announcements: </Text>
                    </View>
                      
                    <Text
                      style={aboutUsStudentStyles.txtContent}
                      >{newViewAnnouncements}</Text>
                    <Text></Text>
                  </ScrollView>

                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsStudentStyles.btnBack}  onPress={() => setisModalVisibleViewAnnouncements(false)}>
                    <Icon name="arrow-left" color="white" type= 'ionicons' size={18} style={{marginBottom: 2, paddingLeft: -20}}/>
                    <Text style={aboutUsStudentStyles.txtBack}>  Back</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            </Modal>
        
          </View>
        );
      });
  } else {
    searchtitle = (
      <Image
        source={require('../../assets/./gif/spinner.gif')}
        style={{
          width: '50%',
          height: '60%',
          resizeMode: 'contain',
        }}></Image>
    );
    // <Text>Dito ko lalagay yung nagloload</Text>
  }

  if (searchtitle.length < 1) {
    
    searchtitle = 
    <ImageBackground  source={require('../../assets/./icons/aicsnoabout.png')} 
    style={{width: 350, height: 220, alignSelf:'auto', margin: 32, resizeMode:'contain'}}>
    </ImageBackground>
    
  }

  return (
    <View style={announcementComponentStyles.lgOverallContainer}>

      <View style={announcementComponentStyles.lgTopHeader}>
        
        <Icon style= {announcementComponentStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={announcementComponentStyles.aicsLogoContainer}>
        </TouchableOpacity>
        <Image source={require('../../assets/aics.png')} style={announcementStyles.aicsLogo}/>
        
        {/* display to */}
        <View style={{flexDirection: 'row'}}> 
          <View>
            <Text adjustsFontSizeToFit={true} style={announcementComponentStyles.titleText}>How To Use Student</Text>
            <Text adjustsFontSizeToFit={true} style={announcementComponentStyles.subtitleText}>Learn how to use blahblah </Text>
          </View>
          
        </View>

      </View>

      <View style={announcementComponentStyles.vSearchBar}>
          
          {/* Text input = yung issearch ni user */}
          <Icon name="search" color="#B2B2B2" style={announcementComponentStyles.searchBaricon} size={19}/>
          <TextInput adjustsFontSizeToFit={true}
          style={announcementComponentStyles.tiSearch}
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

      <View style={announcementComponentStyles.vAnnouncements}>
        
        {/* TouchableOpacity = button */}
        
        <ScrollView adjustsFontSizeToFit
          pagingEnabled={true}  contentContainerStyle={{ paddingBottom: 45}}>
          {searchtitle}
        </ScrollView>
      </View>

      {uploading ? 
           (
            <Modal >
              <View style={{flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              }}>
                <ImageBackground  source={require('../../assets/aicslogo.png')} 
                style={{width: 250, height: 150, resizeMode:'contain'}}
                ></ImageBackground>
  
                <ActivityIndicator size="large" color='purple'></ActivityIndicator>
                <Text>{transferred} % Completed </Text>
              </View>
            </Modal>
            )  : null
      }

      {/* {uploading ? (
          <Modal style={{flex:1, flexDirection: 'row'}}>
            <ActivityIndicator size="large" color='purple'></ActivityIndicator>
            <Text>{transferred} % Completed </Text>
          </Modal>
          ) :  null
        }
       */}
    </View>
  );
};
export default howToUseStudent;