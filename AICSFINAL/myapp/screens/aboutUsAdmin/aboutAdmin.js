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
import {aboutUsAdminStyles} from '../../styles/aboutUsAdminStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AboutUsAdmin = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [isModalVisibleVision, setisModalVisibleVision] = useState(false);
  const [isModalVisibleMission, setisModalVisibleMission] = useState(false);
  const [isModalVisibleTheCollege, setisModalVisibleTheCollege] = useState(false);
  const [isModalVisibleContactInformation, setisModalVisibleContactInformation] = useState(false);
  const [isModalCollegeOfferings, setisModalCollegeOfferings] = useState(false);

  const [newAbout, setnewAbout] = useState('');
  const [newMission, setnewMission] = useState('');
  const [newVision, setnewVision] = useState('');

  const [newContactInfoLocation, setnewContactInfoLocation] = useState('');
  const [newContactInfoNumber, setnewContactInfoNumber] = useState('');
  const [newContactInfoSchedule, setnewContactInfoSchedule] = useState('');
  const [newContactInfoEmail, setnewContactInfoEmail] = useState('');
  const [newContactInfoFacebook, setnewContactInfoFacebook] = useState('');
  const [newContactInfoWebsite, setnewContactInfoWebsite] = useState('');

  const [newDegreePrograms, setnewDegreePrograms] = useState('');
  const [newDepartments, setnewDepartments] = useState('');
  const [newOtherInformation, setnewOtherInformation] = useState('');

  const [newID, setNewId] = useState('');

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

      useEffect(() => {
      const fecthAboutUs = firestore()
        .collection('allAboutUs')
        .orderBy('titles', 'asc')
        .onSnapshot(querySnapshot => {
          const posts = [];
          console.log('Total users: ', querySnapshot.size);
      
          querySnapshot.forEach(documentSnapshot => {
            posts.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setPosts(posts);
          setLoading(true);
          console.log('Reading firebase');
        });
        
        return () => fecthAboutUs();
      }, []);

  const getAnnouncements = (item) => {

    setNewId(item.key);

    if (item.titles == 'About the College') {
      setNewId(item.key);
      setnewAbout(item.about);
      setisModalVisibleTheCollege(true);
    }

    if (item.titles == 'College Offerings') {
      setNewId(item.key);
      setnewDegreePrograms(item.degreePrograms);
      setnewDepartments(item.departments);
      setnewOtherInformation(item.otherinformation);
       setisModalCollegeOfferings(true);
     }

    if (item.titles == 'The Mission') {
      setNewId(item.key);
      setnewMission(item.mission);
      setisModalVisibleMission(true);
    }

    if (item.titles == 'The Vision') {
      setNewId(item.key);
      setnewVision(item.vision);
      setisModalVisibleVision(true);
    }

    if (item.titles == 'UST CICS Contact Information') {
      setNewId(item.key);
     setnewContactInfoEmail(item.email);
     setnewContactInfoFacebook(item.facebook);
     setnewContactInfoLocation(item.location);
     setnewContactInfoNumber(item.number);
     setnewContactInfoSchedule(item.schedule);
    //  setnewContactInfoWebsite(item.email);
      setisModalVisibleContactInformation(true);
    }
  };

  const onPressSave = (newID) => {
    console.log('Gumagana ba to', newID);

      if(newID == '0generalAbout') {
        handleEditAbout(newID);
        setisModalVisibleTheCollege(false);
        console.log('id: ', newID);
      }

      else if(newID == '1mission') {
        handleEditMission(newID);
        setisModalVisibleMission(false);
        console.log('id: ', newID);
      }

      else if(newID == '2vision') {
        handleEditVision(newID);
        setisModalVisibleVision(false);
        console.log('id: ', newID);
      }

      else if(newID == '3contactInformation') {
        handleEditContactInformation(newID);
        setisModalVisibleContactInformation(false);
        console.log('id: ', newID);
      }

      else if(newID == '4offerings') {
        handleEditCollegeOfferings(newID);
        setisModalCollegeOfferings(false);
        console.log('id: ', newID);
      }
  };

  const handleEditAbout = (newID) => {
    firestore()
    .collection('allAboutUs')
    .doc(newID)
    .update({  
      about: newAbout,
    })
    .then(() => {
      setnewAbout('');
      Alert.alert('Information Updated!');
      console.log('all set!');
    });
  };

  const handleEditMission = (newID) => {
    firestore()
    .collection('allAboutUs')
    .doc(newID)
    .update({  
      mission: newMission,
    })
    .then(() => {
      setnewMission('');
      Alert.alert('Information Updated!');
      console.log('all set!');
    });
  };

  const handleEditVision = (newID) => {
    firestore()
    .collection('allAboutUs')
    .doc(newID)
    .update({  
      vision: newVision,
    })
    .then(() => {
      setnewVision('');
      Alert.alert('Information Updated!');
      console.log('all set!');
    });
  };

  const handleEditContactInformation = (newID) => {
    firestore()
    .collection('allAboutUs')
    .doc(newID)
    .update({  
      email: newContactInfoEmail,
      facebook: newContactInfoFacebook,
      location: newContactInfoLocation,
      number: newContactInfoNumber,
      schedule: newContactInfoSchedule,
    })
    .then(() => {
      setnewContactInfoEmail('');
      setnewContactInfoFacebook('');
      setnewContactInfoLocation('');
      setnewContactInfoNumber('');
      setnewContactInfoSchedule('');
      Alert.alert('Information Updated!');
      console.log('all set!');
    });
  };

  const handleEditCollegeOfferings = (newID) => {
    firestore()
    .collection('allAboutUs')
    .doc(newID)
    .update({  
      degreePrograms: newDegreePrograms,
      departments: newDepartments,
      otherinformation: newOtherInformation,
    })
    .then(() => {
      setnewDegreePrograms('');
      setnewDepartments('');
      setnewOtherInformation('');
      Alert.alert('Information Updated!');
      console.log('all set!');
    });
  };

  let searchtitles = null;

  if (loader) {
    searchtitles = posts
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.maincontent
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

            <View style={aboutUsAdminStyles.vCardContainer}>
              
              <AboutUsComponents 
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.titles}
                propskeywords={item.keywords}
              />

              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

                <TouchableOpacity
                  style={aboutUsAdminStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon name="edit-2" color="white" size={16} style={{ marginBottom: 5 }}/>
                  <Text style={aboutUsAdminStyles.txtUpdateArchive}> Edit information </Text>
                </TouchableOpacity>

              </View>

            </View>

            {/* MODAL: ABOUT THE COLLEGE */}
          <Modal
           animationType="slide"
           visible={isModalVisibleTheCollege}
           onRequestClose={() => setisModalVisibleTheCollege(false)}
          >
            <View style={aboutUsAdminStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/ustbg.png')} style={aboutUsAdminStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={aboutUsAdminStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={aboutUsAdminStyles.txtEdit}> Edit About Us Information</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(1.8), 
                    color:'#F5F5F5', }}>College of Information and Computing Sciences</Text>
                        
                    <Text style={aboutUsAdminStyles.txtTitle}>About the College</Text>
                 
                </ImageBackground>
                
                <View style={aboutUsAdminStyles.vtxtContent}>
                  
                  <ScrollView>
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Description:</Text>
                      
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewAbout(text)}
                      placeholder={'Content'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newAbout}
                      multiline={true}
                      numberOfLines={10}
                      maxLength={800}></TextInput>
                  </ScrollView>

                </View>

                <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsAdminStyles.btnSave}
                  onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={aboutUsAdminStyles.btnCancel}
                  onPress={() => setisModalVisibleTheCollege(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

          </Modal>

          <Modal
           animationType="slide"
           visible={isModalCollegeOfferings}
           onRequestClose={() => setisModalCollegeOfferings(false)}
          >
            <View style={aboutUsAdminStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/ustbg.png')} style={aboutUsAdminStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={aboutUsAdminStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={aboutUsAdminStyles.txtEdit}> Edit About Us Information</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(1.8), 
                    color:'#F5F5F5', }}>College of Information and Computing Sciences</Text>
                        
                    <Text style={aboutUsAdminStyles.txtTitle}>College Offerings</Text>
                 
                </ImageBackground>
                
                <View style={aboutUsAdminStyles.vtxtContent}>
                  
                  <ScrollView>
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Degree Programs:</Text>
                      
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewDegreePrograms(text)}
                      placeholder={'Degree Programs'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newDegreePrograms}
                      multiline={true}
                      numberOfLines={5}
                      maxLength={400}></TextInput>

                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Degree Departments:</Text>
                      
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewDepartments(text)}
                      placeholder={'Departments'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newDepartments}
                      multiline={true}
                      numberOfLines={2}
                      maxLength={400}></TextInput>

                  <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Other information:</Text>
                      
                      <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewOtherInformation(text)}
                      placeholder={'Other Information'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newOtherInformation}
                      multiline={true}
                      numberOfLines={2}
                      maxLength={400}></TextInput>
                 
                  </ScrollView>

                </View>

                <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsAdminStyles.btnSave}
                  onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={aboutUsAdminStyles.btnCancel}
                  onPress={() => setisModalCollegeOfferings(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

          </Modal>
         
          <Modal
           animationType="slide"
           visible={isModalVisibleMission}
           onRequestClose={() => setisModalVisibleMission(false)}
          >
            <View style={aboutUsAdminStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/ustbg.png')} style={aboutUsAdminStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={aboutUsAdminStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={aboutUsAdminStyles.txtEdit}> Edit About Us Information</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(1.8), 
                    color:'#F5F5F5', }}>College of Information and Computing Sciences</Text>
                        
                    <Text style={aboutUsAdminStyles.txtTitle}>Mission</Text>
                 
                </ImageBackground>
                
                <View style={aboutUsAdminStyles.vtxtContent}>
                  
                  <ScrollView>
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Description:</Text>
                      
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewMission(text)}
                      placeholder={'Mission Content'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newMission}
                      multiline={true}
                      numberOfLines={5}
                      maxLength={600}></TextInput>
                                 
                  </ScrollView>

                </View>

                <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsAdminStyles.btnSave}
                  onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={aboutUsAdminStyles.btnCancel}
                  onPress={() => setisModalVisibleMission(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

          </Modal>

          <Modal
           animationType="slide"
           visible={isModalVisibleVision}
           onRequestClose={() => setisModalVisibleVision(false)}
          >
            <View style={aboutUsAdminStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/ustbg.png')} style={aboutUsAdminStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={aboutUsAdminStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={aboutUsAdminStyles.txtEdit}> Edit About Us Information</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(1.8), 
                    color:'#F5F5F5', }}>College of Information and Computing Sciences</Text>
                        
                    <Text style={aboutUsAdminStyles.txtTitle}>Vision</Text>
                 
                </ImageBackground>
                
                <View style={aboutUsAdminStyles.vtxtContent}>
                  
                  <ScrollView>
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                    color:'gray', }}>Description:</Text>
                      
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewVision(text)}
                      placeholder={'Vision Content'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newVision}
                      multiline={true}
                      numberOfLines={5}
                      maxLength={400}></TextInput>
                                 
                  </ScrollView>

                </View>

                <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsAdminStyles.btnSave}
                  onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={aboutUsAdminStyles.btnCancel}
                  onPress={() => setisModalVisibleVision(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                
              </View>

          </Modal>

          <Modal
           animationType="slide"
           visible={isModalVisibleContactInformation}
           onRequestClose={() => setisModalVisibleContactInformation(false)}
          >
            <View style={aboutUsAdminStyles.vModalContainer}>
                
                <View style={{flex:1, backgroundColor:'white',}}></View>
                <ImageBackground  source={require('../../assets/./bg/ustbg.png')} style={aboutUsAdminStyles.vtxtTitle} >
                    
                    <TouchableWithoutFeedback
                      style={aboutUsAdminStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={aboutUsAdminStyles.txtEdit}> Edit About Us Information</Text>
                    </TouchableWithoutFeedback>
  
                    <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(1.8), 
                    color:'#F5F5F5', }}>College of Information and Computing Sciences</Text>
                        
                    <Text style={aboutUsAdminStyles.txtTitle}>Contact Details</Text>
                 
                </ImageBackground>
                
                <View style={aboutUsAdminStyles.vtxtContent}>
                  
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="map-pin" color="black" type= 'ionicons' size={18}/>
                      <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                      color:'gray', }}> Location:</Text>
                    </View>
                   
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewContactInfoLocation(text)}
                      placeholder={'College Location'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContactInfoLocation}
                      multiline={true}
                      numberOfLines={4}
                      maxLength={400}></TextInput>

                    <Text></Text>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="clock" color="black" type= 'ionicons' size={18}/>
                      <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                      color:'gray', }}> Office hours:</Text>
                    </View>
                   
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewContactInfoSchedule(text)}
                      placeholder={'College Office Schedule'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContactInfoSchedule}
                      multiline={true}
                      numberOfLines={2}
                      maxLength={300}></TextInput>
                    
                    <Text></Text>    

                    <View style={{flexDirection:'row'}}>
                      <Icon name="phone" color="black" type= 'ionicons' size={18}/>
                      <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                      color:'gray', }}> Office Contact Number:</Text>
                    </View>
                   
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewContactInfoNumber(text)}
                      placeholder={'College Contact Number'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContactInfoNumber}
                      multiline={true}
                      numberOfLines={1}
                      maxLength={100}></TextInput>
                      <Text></Text> 

                    <View style={{flexDirection:'row'}}>
                      <Icon name="facebook" color="black" type= 'ionicons' size={18}/>
                      <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                      color:'gray', }}> Facebook Page:</Text>
                    </View>
                   
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewContactInfoFacebook(text)}
                      placeholder={'College Official Facebook Page'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContactInfoFacebook}
                      multiline={true}
                      numberOfLines={1}
                      maxLength={100}></TextInput>
                      <Text></Text> 

                    <View style={{flexDirection:'row'}}>
                      <Icon name="mail" color="black" type= 'ionicons' size={18}/>
                      <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'left', fontSize: hp(2), 
                      color:'gray', }}> UST CICS Email :</Text>
                    </View>
                   
                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewContactInfoEmail(text)}
                      placeholder={'College Official Email'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContactInfoEmail}
                      multiline={true}
                      numberOfLines={1}
                      maxLength={50}></TextInput>
                      <Text></Text> 


                  </ScrollView>

                </View>

                <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity style={aboutUsAdminStyles.btnSave}
                  onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={aboutUsAdminStyles.btnCancel}
                  onPress={() => setisModalVisibleContactInformation(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
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
    <View style={aboutUsAdminStyles.lgOverallContainer}>

      <View style={aboutUsAdminStyles.lgTopHeader}>
        
        <Icon style= {aboutUsAdminStyles.menuBarIcon} name="menu" color="white" type= 'ionicons' size={23} onPress={() => navigation.toggleDrawer()}/>
        <TouchableOpacity style={aboutUsAdminStyles.aicsLogoContainer} onPress={() => navigation.toggleDrawer()}>
        </TouchableOpacity>
        <Image source={require('../../assets/aics.png')} style={announcementStyles.aicsLogo}/>
        
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text adjustsFontSizeToFit={true} style={aboutUsAdminStyles.titleText}>About Us</Text>
            <Text adjustsFontSizeToFit={true} style={aboutUsAdminStyles.subtitleText}>Welcome to the College of Information and Computing Sciences, know about us! </Text>
          </View>
          
        </View>

      </View>

      <View style={aboutUsAdminStyles.vSearchBar}>
          
          <Icon name="search" color="#B2B2B2" style={aboutUsAdminStyles.searchBaricon} size={19}/>
          <TextInput adjustsFontSizeToFit={true}
          style={aboutUsAdminStyles.tiSearch}
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

      <View style={aboutUsAdminStyles.vAnnouncements}>

        <ScrollView adjustsFontSizeToFit
          >
          {searchtitles}
        </ScrollView>
      </View>

    </View>
  );
};

export default AboutUsAdmin;
