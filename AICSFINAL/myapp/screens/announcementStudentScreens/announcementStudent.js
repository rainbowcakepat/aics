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

import AnnouncementComponent from '../announcementAdminScreens/announcementComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {announcementComponentStudentStyles} from '../../styles/announcementStudentStyles';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AnnouncementStudent = ({navigation}) => {
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
    const fetchAnnouncements = firestore()
      .collection('allAnnouncements')
      .orderBy('posttime', 'desc')
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
    return () => fetchAnnouncements();
  }, []);

  
  const getAnnouncements = (item) => {
    setisModalVisible(true);
    setNewTitles(item.titles);
    setNewContents(item.contents);
    setNewPhoto(item.photo);
    setNewId(item.key);
    setNewURL(item.url);
    setImageModal(true)
    console.log(item.titles, item.key, item.url);
  };

  const onPressSave = (newID) => {
    console.log('Gumagana ba to', newID);
    setisModalVisible(false);

    if (newUrl == null) {
      handleEditAnnouncement(newID); //id
      Alert.alert('Successfully Posted!');
    } else {
      handleEditAnnouncement(newID); //id
      uploadPhoto(newID);
    }
  };

  const handleEditAnnouncement = id => {
    firestore()
      .collection('allAnnouncements')
      .doc(id)
      .update({
        titles: newTitles,
        // links: newLinks,
        contents: newContents,
        photo: newPhoto,
        url: newUrl,
      })
      .then(() => {
        setNewTitles('');
        setNewContents('');
        setNewLinks('');
        setNewPhoto('');
        setNewURL('');
        console.log('Announcement updated!', id);
      });
  };

 
 

  let searchtitles = null;

  if (loader) {
    searchtitles = posts
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.titles
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
        ) {
          return item;
        }
        else if (
          item.posttime
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

            <View style={announcementComponentStudentStyles.vCardContainer}>
              
              <AnnouncementComponent 
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.titles}
                propsposttime={item.posttime}
                propscontent={item.contents}
                // propsimage={item.url}
              />

              <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>

                <TouchableOpacity
                  style={announcementComponentStudentStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon name="eye" color="white" size={18} style={{ marginBottom: 2}}/>
                  <Text style={announcementComponentStudentStyles.txtUpdateArchive}> View post </Text>
                </TouchableOpacity>
         
              </View>

            </View>

            <Modal
              animationType="fade"
              visible={isModalVisible}
              onRequestClose={() => setisModalVisible(false)}
              
            >

              <View style={announcementComponentStudentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStudentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStudentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStudentStyles.txtEdit}> View Announcement</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}>Announcement Title</Text>
                        
                  <Text
                    style={announcementComponentStudentStyles.txtTitle}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={50}>
                  {newTitles}</Text>
                 
                </ImageBackground>
                
                <View style={announcementComponentStudentStyles.vtxtContent}>
                <ScrollView >
                  
                  <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                  color:'gray', }}>Announcement Content:</Text>
                    
                  <Text
                    style={announcementComponentStudentStyles.txtContent}
                    multiline={true}
                    maxLength={550}>
                    {newContents}</Text>

                </ScrollView>
                </View>


                {/* {newUrl == null && newPhoto == null ? */}
                  <View style={announcementComponentStudentStyles.imageContainer}>

                  {/* <Image
                   source={{uri: newUrl ? newUrl : newPhoto ? newPhoto : null}}
                   style={{
                     width: 500,
                     height: 500,
                     resizeMode: 'contain',
                   }}>
                   </Image> */}
{/* 
                  {
                    newUrl && newPhoto ? 
                    <ImageModal
                    source={{uri: newUrl ? newUrl : newPhoto ? newPhoto : null}}
                    style={{
                      width: 500,
                      height: 500,
                      resizeMode: 'contain',}}
                  />
                 :
                    <Text>Meron</Text>
                  } */}
                 <ImageModal
                    source={{uri: newUrl ? newUrl : newPhoto ? newPhoto : 'https://firebasestorage.googleapis.com/v0/b/samplelogin-37250.appspot.com/o/aicsnoimage.png?alt=media&token=c32b87b2-ea3e-48f7-9ddb-decb500a12e0'}}
                    style={{
                      width: win.width,
                      height: 500,
                      resizeMode: 'contain',
                    }}
                 />
      
               </View>
                  {/* : 
                  null
                } */}


                <View style={announcementComponentStudentStyles.vSaveCancel}>
                  <TouchableOpacity style={announcementComponentStudentStyles.btnBack}  onPress={() => setisModalVisible(false)}>
                    <Icon name="arrow-left" color="white" type= 'ionicons' size={18} style={{marginBottom: 2, paddingLeft: -20}}/>
                    <Text style={announcementComponentStudentStyles.txtBack}>  Back</Text>
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
    <ImageBackground  source={require('../../assets/./icons/aicsnoannouncements.png')} 
    style={{width: 350, height: 220, alignSelf:'auto', margin: 32, resizeMode:'contain'}}>
    </ImageBackground>
  }

  return (
    <View style={announcementComponentStudentStyles.lgOverallContainer}>

      <View style={announcementComponentStudentStyles.lgTopHeader}>
        
        <Icon style= {announcementComponentStudentStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={announcementComponentStudentStyles.aicsLogoContainer} onPress={() => navigation.toggleDrawer()}>
        </TouchableOpacity>
        <Image source={require('../../assets/aics.png')} style={announcementStyles.aicsLogo}/>
        
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text adjustsFontSizeToFit={true} style={announcementComponentStudentStyles.titleText}>Announcements</Text>
            <Text adjustsFontSizeToFit={true} style={announcementComponentStudentStyles.subtitleText}>Be informed! View the latest happenings and updates from CICS. </Text>
          </View>
          
        </View>

      </View>

      <View style={announcementComponentStudentStyles.vSearchBar}>
          
          <Icon name="search" color="#B2B2B2" style={announcementComponentStudentStyles.searchBaricon} size={19}/>
          <TextInput adjustsFontSizeToFit={true}
          style={announcementComponentStudentStyles.tiSearch}
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

      <View style={announcementComponentStudentStyles.vAnnouncements}>
         
        <ScrollView adjustsFontSizeToFit
           contentContainerStyle={{ paddingBottom: 45}}>
          {searchtitles}
        </ScrollView>
      </View>

    
      
    </View>
  );
};
export default AnnouncementStudent;
