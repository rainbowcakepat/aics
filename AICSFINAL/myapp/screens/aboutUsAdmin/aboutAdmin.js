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

import AboutUsComponents from '../aboutUsAdmin/aboutUsComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {announcementComponentStyles} from '../../styles/announcementComponentStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AboutUsAdmin = ({navigation}) => {
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
        firestore()
        .collection('allAboutUs')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());
          });
        });

      })
      //   const subscriber = 
      //    firestore()
      //     .collection('aboutUs')
      //     .doc('mK9n3ITB58L2egS00RBC')
      //     .onSnapshot(documentSnapshot => {
      //       console.log('User data: ', documentSnapshot.data());
      //     });
      //   // Stop listening for updates when no longer required
      //   return () => subscriber();
      // }, );
    
  


  // const getAnnouncements = (item) => {
  //   setisModalVisible(true);
  //   setNewTitles(item.mission);
  //   setNewContents(item.vision);
    
  //   setImageModal(true)
  //   // console.log(item.titles, item.key, item.url);
  // };

  // const onPressSave = (newID) => {
  //   console.log('Gumagana ba to', newID);
  //   setisModalVisible(false);

  //   if (newUrl == null) {
  //     handleEditAnnouncement(newID); //id
  //     Alert.alert('Successfully Posted!');
  //   } else {
  //     handleEditAnnouncement(newID); //id
  //     uploadPhoto(newID);
  //   }
  // };

  // const handleEditAnnouncement = id => {
  //   firestore()
  //     .collection('allAnnouncements')
  //     .doc(id)
  //     .update({
  //       titles: newTitles,
  //       // links: newLinks,
  //       contents: newContents,
  //       photo: newPhoto,
  //       url: newUrl,
  //     })
  //     .then(() => {
  //       setNewTitles('');
  //       setNewContents('');
  //       setNewLinks('');
  //       setNewPhoto('');
  //       setNewURL('');
  //       console.log('Announcement updated!', id);
  //     });
  // };

 
  // let orig;

  // const addArchivedAnnouncement = async (id) => {
  //   const origannouncements = await firestore()
  //     .collection('allAnnouncements')
  //     .doc(id)
  //     .get()
  //     .then(doc => {
  //       orig = doc.data();
  //     });
  //   console.log('Original value: ', orig);

  //   const archiveannouncements = await firestore()
  //     .collection('allArchivedAnnouncements')
  //     .doc();

  //   archiveannouncements
  //     .set({
  //       archivedtitles: orig.titles,
  //       archivedcontents: orig.contents,
  //       archivedposttime: new Date(
  //         firestore.Timestamp.now().seconds * 1000,
  //       ).toLocaleString(),
  //       archivedphoto: orig.photo,
  //     })
  //     .then(() => {
  //       setArchivedTitle(null);
  //       setArchivedLink(null);
  //       setArchivedContent(null);
  //       setArchivedPhoto(null);

  //       if (orig.photo == null) {
  //         deleteAnnouncement(id);
  //       } else {
  //         deleteAnnouncement(id);
  //         deleteAnnouncementImage(id);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Something went wrong', error);
  //     });
  // };

  // const deleteAnnouncement = id => {
  //   firestore()
  //     .collection('allAnnouncements')
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       console.log('ID: User deleted!', id);
  //     });
  // };

  // const deleteAnnouncementImage = async (id) => {
  //   const url = await storage()
  //     .ref('allAnnouncementImages/' + id)
  //     .getDownloadURL();
  //   const deletethis = await storage().refFromURL(url);
  //   console.log(url);
  //   deletethis.delete();
  // };

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
      })
      .map((item, key) => {
        return (
          <View key={key} >

            <View style={announcementComponentStyles.vCardContainer}>
              
              <AboutUsComponents 
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.mission}
                propsposttime={item.vision}
                // propscontent={item.contents}
                // propsimage={item.url}
              />

              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

                <TouchableOpacity
                  style={announcementComponentStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon name="edit-2" color="white" size={16} style={{ marginBottom: 5 }}/>
                  <Text style={announcementComponentStyles.txtUpdateArchive}> Edit post  </Text>
                </TouchableOpacity>
          
                <TouchableOpacity
                  style={announcementComponentStyles.toArchive}       
                  onPress={() => addArchivedAnnouncement(item.key)}>
                  <Icon name="archive" color="white" size={16} style={{ marginBottom: 5 }}/>
                  <Text style={announcementComponentStyles.txtUpdateArchive}> Archive </Text>
                </TouchableOpacity>

              </View>

            </View>

            <Modal
              animationType="fade"
              visible={isModalVisible}
              onRequestClose={() => setisModalVisible(false)}
              
            >

              <View style={announcementComponentStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/annoucementsbg.png')} style={announcementComponentStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}> Edit Announcement</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'#F5F5F5', }}>Announcement Title</Text>
                        
                    <TextInput
                    style={announcementComponentStyles.txtTitle}
                    onChangeText={text => setNewTitles(text)}
                    placeholder={'Title'}
                    placeholderTextColor={'#B2B2B2'}
                    value={newTitles}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={50}>
                </TextInput>
                 
                </ImageBackground>
                
                <View style={announcementComponentStyles.vtxtContent}>
                  
                  <ScrollView>
            
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Announcement Content:</Text>
                      
                    <TextInput
                      style={announcementComponentStyles.txtContent}
                      onChangeText={text => setNewContents(text)}
                      placeholder={'Content'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContents}
                      multiline={true}
                      numberOfLines={10}
                      maxLength={550}></TextInput>
                  </ScrollView>

                </View>

                <View style={{backgroundColor: '#F5F5F5', flex:1,}}> 
                  <TouchableOpacity style={announcementComponentStyles.toPhoto} onPress={choosePhotoFromImageLibrary} >
                    {/* <Icon name="plus" color="white" size={21}/>
                    <Icon name="image" color="white" size={21}/> */}
                     <Image source={require('../../assets/./icons/addimage.png')} style={{height: 40, width: 45}}></Image>
                    {/* <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: hp(2)}}> Attach an image</Text> */}
                  </TouchableOpacity>
                </View>

                {/* {newUrl == null && newPhoto == null ? */}
                  <ScrollView style={announcementComponentStyles.imageContainer}>

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
                    source={{uri: newUrl ? newUrl : newPhoto ? newPhoto : null}}
                    style={{
                      width: win.width,
                      height: 500,
                      resizeMode: 'contain',
                      
                    }}
                 />
      
               </ScrollView>
                  {/* : 
                  null
                } */}


                <View style={announcementComponentStyles.vSaveCancel}>
                  <TouchableOpacity style={announcementComponentStyles.btnSave}
                  onPress={() => onPressSave(newID)}>
                    <Text style={announcementComponentStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={announcementComponentStyles.btnCancel}
                  onPress={() => setisModalVisible(false)}>
                    <Text style={announcementComponentStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

            

            </Modal>
          </View>
        );
      });
  } else {
    searchtitles = (
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

  if (searchtitles.length < 1) {
    searchtitles = <Text>No Announcements found</Text>;
  }

  return (
    <View style={announcementComponentStyles.lgOverallContainer}>

      <View style={announcementComponentStyles.lgTopHeader}>
        
        <Icon style= {announcementComponentStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={announcementComponentStyles.aicsLogoContainer} onPress={() => navigation.toggleDrawer()}>
        </TouchableOpacity>
        <Image source={require('../../assets/aics.png')} style={announcementStyles.aicsLogo}/>
        
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text adjustsFontSizeToFit={true} style={announcementComponentStyles.titleText}>About Us</Text>
            <Text adjustsFontSizeToFit={true} style={announcementComponentStyles.subtitleText}>Welcome to the College of Information and Computing Sciences, know about us! </Text>
          </View>
          
        </View>

      </View>

      <View style={announcementComponentStyles.vSearchBar}>
          
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

        <ScrollView adjustsFontSizeToFit
          pagingEnabled={true}>
          {searchtitles}
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

export default AboutUsAdmin;
