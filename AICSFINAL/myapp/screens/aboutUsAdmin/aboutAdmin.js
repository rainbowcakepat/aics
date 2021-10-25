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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';

import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

import AboutUsComponents from '../aboutUsAdmin/aboutUsComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {aboutUsAdminStyles} from '../../styles/aboutUsAdminStyles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AboutUsAdmin = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [isModalVisibleVision, setisModalVisibleVision] = useState(false);
  const [isModalVisibleMission, setisModalVisibleMission] = useState(false);
  const [isModalVisibleTheCollege, setisModalVisibleTheCollege] =
    useState(false);
  const [
    isModalVisibleContactInformation,
    setisModalVisibleContactInformation,
  ] = useState(false);
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

  const getAnnouncements = item => {
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

  const onPressSave = newID => {
    console.log('Gumagana ba to', newID);

    if (newID == '0generalAbout') {
      console.log('id: ', newID);
      console.log('length', newAbout.length);
     
      if(newAbout.length < 3) {
        Alert.alert(
          'Failed to edit information',
          'Information cannot be blank, minimum length is 3', 
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
      else {
        handleEditAbout(newID);
        setisModalVisibleTheCollege(false);
      }
      
      
    } else if (newID == '1mission') {
      console.log('id: ', newID);

      if(newMission.length < 3) {
        Alert.alert(
          'Failed to edit information',
          'Information cannot be blank, minimum length is 3', 
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
      else {
        handleEditMission(newID);
        setisModalVisibleMission(false);
      }
 
    } else if (newID == '2vision') {

      if(newVision.length < 3) {
        Alert.alert(
          'Failed to edit information',
          'Information cannot be blank, minimum length is 3', 
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
      else {
        handleEditVision(newID);
        setisModalVisibleVision(false);
      }
      console.log('id: ', newID);
    } 
    
    else if (newID == '3contactInformation') {

      if(newContactInfoEmail.length == 0 || newContactInfoFacebook.length == 0 || newContactInfoLocation.length == 0 ||
        newContactInfoNumber.length == 0 || newContactInfoSchedule.length == 0 ) {
        Alert.alert(
          'Failed to edit information',
          'Information cannot be blank, please try again', 
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      } 
      else {   
      handleEditContactInformation(newID);
      setisModalVisibleContactInformation(false);
      }

      console.log('id: ', newID);
    } else if (newID == '4offerings') {

      if(newDegreePrograms.length < 3 || newDepartments.length < 3 || newOtherInformation.length < 3) {
        Alert.alert(
          'Failed to edit information',
          'Information cannot be blank, minimum length is 3', 
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      } 
      else {   
        handleEditCollegeOfferings(newID);
      setisModalCollegeOfferings(false);
      }

    
      console.log('id: ', newID);
    }
  };

  const handleEditAbout = newID => {
    firestore()
      .collection('allAboutUs')
      .doc(newID)
      .update({
        about: newAbout,
      })
      .then(() => {
        EditAboutTheCollege();
        setnewAbout('');
        Alert.alert(
          'About Us: About the College',
          'Information Updated!', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Information Updated!');
        console.log('all set!');
      })
      .catch(error => {
        Alert.alert(
          'About Us: About the College',
          'Incomplete details', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Incomplete details');
      });
  };

  const handleEditMission = newID => {
    firestore()
      .collection('allAboutUs')
      .doc(newID)
      .update({
        mission: newMission,
      })
      .then(() => {
        EditMission();
        setnewMission('');
        Alert.alert(
          'About Us: The Mission',
          'Information Updated!', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Information Updated!');
        console.log('all set!');
      })
      .catch(error => {
        Alert.alert(
          'About Us: The Mission',
          'Incomplete details', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Incomplete details');
      });
  };

  const handleEditVision = newID => {
    firestore()
      .collection('allAboutUs')
      .doc(newID)
      .update({
        vision: newVision,
      })
      .then(() => {
        EditVision();
        setnewVision('');
        Alert.alert(
          'About Us: The Vision',
          'Information Updated!', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Information Updated!');
        console.log('all set!');
      })
      .catch(error => {
        Alert.alert(
          'About Us: The Vision',
          'Incomplete details', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Incomplete details');
      });
  };

  const handleEditContactInformation = newID => {
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
        EditContactInformation();
        setnewContactInfoEmail('');
        setnewContactInfoFacebook('');
        setnewContactInfoLocation('');
        setnewContactInfoNumber('');
        setnewContactInfoSchedule('');

        Alert.alert(
          'About Us: Contact Information',
          'Information Updated!', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Information Updated!');
        console.log('all set!');
      })
      .catch(error => {
        Alert.alert(
          'About Us: Contact Information',
          'Incomplete details', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Incomplete details');
      });
  };

  const handleEditCollegeOfferings = newID => {
    firestore()
      .collection('allAboutUs')
      .doc(newID)
      .update({
        degreePrograms: newDegreePrograms,
        departments: newDepartments,
        otherinformation: newOtherInformation,
      })
      .then(() => {
        EditCollegeOfferings();
        setnewDegreePrograms('');
        setnewDepartments('');
        setnewOtherInformation('');

        Alert.alert(
          'About Us: Course Offerings',
          'Information Updated!', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Information Updated!');
        console.log('all set!');
      })
      .catch(error => {
        Alert.alert(
          'About Us: Course Offerings',
          'Incomplete details', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Incomplete details');
      });
  };

  const EditAboutTheCollege = async () => {
    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Edited About the College',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Edited About Us');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
  };

  const EditCollegeOfferings = async () => {
    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Edited College Offerings',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Edited College Offerings');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
  };

  const EditMission = async () => {
    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Edited Mission',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Edited Mission');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
  };

  const EditVision = async () => {
    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Edited Vision',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Edited Vision');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
  };

  const EditContactInformation = async () => {
    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Edited Contact Information',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Edited Contact Information');
      })
      .catch(error => {
        console.log('Something went wrong', error);
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
          <View key={key}>
            <View style={aboutUsAdminStyles.vCardContainer}>
              <AboutUsComponents
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.titles}
                propskeywords={item.keywords}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={aboutUsAdminStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon
                    name="edit-2"
                    color="white"
                    size={16}
                    style={{marginBottom: 5}}
                  />
                  <Text style={aboutUsAdminStyles.txtUpdateArchive}>
                    {' '}
                    Edit information{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* MODAL: ABOUT THE COLLEGE */}
            <Modal
              animationType="fade"
              visible={isModalVisibleTheCollege}
              onRequestClose={() => setisModalVisibleTheCollege(false)}>
              <View style={aboutUsAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/ustbg.png')}
                  style={aboutUsAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={aboutUsAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={aboutUsAdminStyles.txtEdit}>
                      {' '}
                      Edit About Us Information
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(1.8),
                      color: '#F5F5F5',
                    }}>
                    College of Information and Computing Sciences
                  </Text>

                  <Text style={aboutUsAdminStyles.txtTitle}>
                    About the College
                  </Text>
                </ImageBackground>

                <View style={aboutUsAdminStyles.vtxtContent}>
                  <ScrollView>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Description:
                    </Text>

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
                </View>

                <View style={{backgroundColor:'#F5F5F5', alignContent:'flex-end', justifyContent:'flex-end',}}>
     <View style={{flexDirection:'row', alignSelf:'center' , backgroundColor:'white', marginBottom: 0, paddingTop:5, paddingLeft:8, paddingRight:8, paddingBottom:0, justifyContent:'space-around', borderTopLeftRadius: 30,borderTopRightRadius: 30, width:win.width/1.2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    
    elevation: 15,

}}>

<TouchableOpacity 
                 onPress={() => setisModalVisibleTheCollege(false)} style={{flexDirection:'column', alignItems:'center'}}>
                    <Icon name="x-circle" color="maroon" size={22}/>
                    <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Cancel</Text>
          </TouchableOpacity>
     

<TouchableOpacity  onPress={() => onPressSave(newID)} style={{flexDirection:'column', alignItems:'center'}}>
            <Icon name="check-circle" color="maroon" size={22}/>
            <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Submit </Text>
            </TouchableOpacity>

           

  </View>
  </View>

                {/* <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnSave}
                    onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnCancel}
                    onPress={() => setisModalVisibleTheCollege(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View> */}
            </Modal>

            <Modal
              animationType="fade"
              visible={isModalCollegeOfferings}
              onRequestClose={() => setisModalCollegeOfferings(false)}>
              <View style={aboutUsAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/ustbg.png')}
                  style={aboutUsAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={aboutUsAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={aboutUsAdminStyles.txtEdit}>
                      {' '}
                      Edit About Us Information
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(1.8),
                      color: '#F5F5F5',
                    }}>
                    College of Information and Computing Sciences
                  </Text>

                  <Text style={aboutUsAdminStyles.txtTitle}>
                    College Offerings
                  </Text>
                </ImageBackground>

                <View style={aboutUsAdminStyles.vtxtContent}>
                  <ScrollView>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Degree Programs:
                    </Text>

                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewDegreePrograms(text)}
                      placeholder={'Degree Programs'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newDegreePrograms}
                      multiline={true}
                      numberOfLines={5}
                      maxLength={400}></TextInput>

                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Degree Departments:
                    </Text>

                    <TextInput
                      style={aboutUsAdminStyles.txtContent}
                      onChangeText={text => setnewDepartments(text)}
                      placeholder={'Departments'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newDepartments}
                      multiline={true}
                      numberOfLines={2}
                      maxLength={400}></TextInput>

                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Other information:
                    </Text>

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

                <View style={{backgroundColor:'#F5F5F5', alignContent:'flex-end', justifyContent:'flex-end',}}>
     <View style={{flexDirection:'row', alignSelf:'center' , backgroundColor:'white', marginBottom: 0, paddingTop:5, paddingLeft:8, paddingRight:8, paddingBottom:0, justifyContent:'space-around', borderTopLeftRadius: 30,borderTopRightRadius: 30, width:win.width/1.2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    
    elevation: 15,

}}>

<TouchableOpacity 
                    onPress={() => setisModalCollegeOfferings(false)} style={{flexDirection:'column', alignItems:'center'}}>
                    <Icon name="x-circle" color="maroon" size={22}/>
                    <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Cancel</Text>
          </TouchableOpacity>
     

<TouchableOpacity   onPress={() => onPressSave(newID)} style={{flexDirection:'column', alignItems:'center'}}>
            <Icon name="check-circle" color="maroon" size={22}/>
            <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Submit </Text>
            </TouchableOpacity>

           

  </View>
  </View>

                {/* <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnSave}
                   >
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnCancel}
                    onPress={() => setisModalCollegeOfferings(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </Modal>

            <Modal
              animationType="fade"
              visible={isModalVisibleMission}
              onRequestClose={() => setisModalVisibleMission(false)}>
              <View style={aboutUsAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/ustbg.png')}
                  style={aboutUsAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={aboutUsAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={aboutUsAdminStyles.txtEdit}>
                      {' '}
                      Edit About Us Information
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(1.8),
                      color: '#F5F5F5',
                    }}>
                    College of Information and Computing Sciences
                  </Text>

                  <Text style={aboutUsAdminStyles.txtTitle}>Mission</Text>
                </ImageBackground>

                <View style={aboutUsAdminStyles.vtxtContent}>
                  <ScrollView>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Description:
                    </Text>

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
                <View style={{backgroundColor:'#F5F5F5', alignContent:'flex-end', justifyContent:'flex-end',}}>
     <View style={{flexDirection:'row', alignSelf:'center' , backgroundColor:'white', marginBottom: 0, paddingTop:5, paddingLeft:8, paddingRight:8, paddingBottom:0, justifyContent:'space-around', borderTopLeftRadius: 30,borderTopRightRadius: 30, width:win.width/1.2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    
    elevation: 15,

}}>

<TouchableOpacity 
                onPress={() => setisModalVisibleMission(false)} style={{flexDirection:'column', alignItems:'center'}}>
                    <Icon name="x-circle" color="maroon" size={22}/>
                    <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Cancel</Text>
          </TouchableOpacity>
     

<TouchableOpacity  onPress={() => onPressSave(newID)} style={{flexDirection:'column', alignItems:'center'}}>
            <Icon name="check-circle" color="maroon" size={22}/>
            <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Submit </Text>
            </TouchableOpacity>

           

  </View>
  </View>
                
{/* 
                <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnSave}
                    onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnCancel}
                    onPress={() => setisModalVisibleMission(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </Modal>

            <Modal
              animationType="fade"
              visible={isModalVisibleVision}
              onRequestClose={() => setisModalVisibleVision(false)}>
              <View style={aboutUsAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/ustbg.png')}
                  style={aboutUsAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={aboutUsAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={aboutUsAdminStyles.txtEdit}>
                      {' '}
                      Edit About Us Information
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(1.8),
                      color: '#F5F5F5',
                    }}>
                    College of Information and Computing Sciences
                  </Text>

                  <Text style={aboutUsAdminStyles.txtTitle}>Vision</Text>
                </ImageBackground>

                <View style={aboutUsAdminStyles.vtxtContent}>
                  <ScrollView>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Description:
                    </Text>

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
                <View style={{backgroundColor:'#F5F5F5', alignContent:'flex-end', justifyContent:'flex-end',}}>
     <View style={{flexDirection:'row', alignSelf:'center' , backgroundColor:'white', marginBottom: 0, paddingTop:5, paddingLeft:8, paddingRight:8, paddingBottom:0, justifyContent:'space-around', borderTopLeftRadius: 30,borderTopRightRadius: 30, width:win.width/1.2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    
    elevation: 15,

}}>

<TouchableOpacity 
                 onPress={() => setisModalVisibleVision(false)} style={{flexDirection:'column', alignItems:'center'}}>
                    <Icon name="x-circle" color="maroon" size={22}/>
                    <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Cancel</Text>
          </TouchableOpacity>
     

<TouchableOpacity  onPress={() => onPressSave(newID)} style={{flexDirection:'column', alignItems:'center'}}>
            <Icon name="check-circle" color="maroon" size={22}/>
            <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Submit </Text>
            </TouchableOpacity>

           

  </View>
  </View>
                {/* <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnSave}
                    onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnCancel}
                    onPress={() => setisModalVisibleVision(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </Modal>

            <Modal
              animationType="fade"
              visible={isModalVisibleContactInformation}
              onRequestClose={() => setisModalVisibleContactInformation(false)}>
              <View style={aboutUsAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/ustbg.png')}
                  style={aboutUsAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={aboutUsAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={aboutUsAdminStyles.txtEdit}>
                      {' '}
                      Edit About Us Information
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(1.8),
                      color: '#F5F5F5',
                    }}>
                    College of Information and Computing Sciences
                  </Text>

                  <Text style={aboutUsAdminStyles.txtTitle}>
                    Contact Details
                  </Text>
                </ImageBackground>

                <View style={aboutUsAdminStyles.vtxtContent}>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="map-pin"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'left',
                          fontSize: hp(2),
                          color: 'gray',
                        }}>
                        {' '}
                        Location:
                      </Text>
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
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="clock"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'left',
                          fontSize: hp(2),
                          color: 'gray',
                        }}>
                        {' '}
                        Office hours:
                      </Text>
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

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="phone"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'left',
                          fontSize: hp(2),
                          color: 'gray',
                        }}>
                        {' '}
                        Office Contact Number:
                      </Text>
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

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="facebook"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'left',
                          fontSize: hp(2),
                          color: 'gray',
                        }}>
                        {' '}
                        Facebook Page:
                      </Text>
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

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="mail"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'left',
                          fontSize: hp(2),
                          color: 'gray',
                        }}>
                        {' '}
                        UST CICS Email :
                      </Text>
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


                <View style={{backgroundColor:'#F5F5F5', alignContent:'flex-end', justifyContent:'flex-end',}}>
     <View style={{flexDirection:'row', alignSelf:'center' , backgroundColor:'white', marginBottom: 0, paddingTop:5, paddingLeft:8, paddingRight:8, paddingBottom:0, justifyContent:'space-around', borderTopLeftRadius: 30,borderTopRightRadius: 30, width:win.width/1.2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    
    elevation: 15,

}}>

<TouchableOpacity 
                  onPress={() => setisModalVisibleContactInformation(false)} style={{flexDirection:'column', alignItems:'center'}}>
                    <Icon name="x-circle" color="maroon" size={22}/>
                    <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Cancel</Text>
          </TouchableOpacity>
     

<TouchableOpacity  onPress={() => onPressSave(newID)} style={{flexDirection:'column', alignItems:'center'}}>
            <Icon name="check-circle" color="maroon" size={22}/>
            <Text style={{color: 'maroon', fontFamily: 'Poppins-Medium', fontSize: hp(1.5)}}> Submit </Text>
            </TouchableOpacity>

           

  </View>
  </View>

                {/* <View style={aboutUsAdminStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnSave}
                    onPress={() => onPressSave(newID)}>
                    <Text style={aboutUsAdminStyles.txtSave}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={aboutUsAdminStyles.btnCancel}
                    onPress={() => setisModalVisibleContactInformation(false)}>
                    <Text style={aboutUsAdminStyles.txtCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </Modal>
          </View>
        );
      });
  } else {
    searchtitles = (
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <ImageBackground
          source={require('../../assets/aicslogo.png')}
          style={{
            width: 250,
            height: 150,
            alignSelf: 'center',
            margin: 32,
            resizeMode: 'contain',
          }}></ImageBackground>
        <ActivityIndicator size="large" color="purple"></ActivityIndicator>
      </View>
    );
  }

  if (searchtitles.length < 1) {
    searchtitles = (
      <ImageBackground
        source={require('../../assets/./icons/aicsnoabout.png')}
        style={{
          width: 350,
          height: 220,
          alignSelf: 'auto',
          margin: 32,
          resizeMode: 'contain',
        }}></ImageBackground>
    );
  }

  return (
    <View style={aboutUsAdminStyles.lgOverallContainer}>
      <View style={aboutUsAdminStyles.lgTopHeader}>
        <Icon
          style={aboutUsAdminStyles.menuBarIcon}
          name="menu"
          color="white"
          type="ionicons"
          size={23}
          onPress={() => navigation.toggleDrawer()}
        />
        <TouchableOpacity
          style={aboutUsAdminStyles.aicsLogoContainer}></TouchableOpacity>
        <Image
          source={require('../../assets/aicsfin.png')}
          style={announcementStyles.aicsLogo}
        />

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              adjustsFontSizeToFit={true}
              style={aboutUsAdminStyles.titleText}>
              About Us
            </Text>
            <Text
              adjustsFontSizeToFit={true}
              style={aboutUsAdminStyles.subtitleText}>
              Welcome to the College of Information and Computing Sciences, know
              about us!{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={aboutUsAdminStyles.vSearchBar}>
        <Icon
          name="search"
          color="#B2B2B2"
          style={aboutUsAdminStyles.searchBaricon}
          size={19}
        />
        <TextInput
          adjustsFontSizeToFit={true}
          style={aboutUsAdminStyles.tiSearch}
          numberOfLines={1}
          maxLength={50}
          placeholder={'Search'}
          placeholderTextColor={'#B2B2B2'}
          onChangeText={text => {
            setSearchTerm(text);
            console.log(`search: ${searchTerm}`);
          }}></TextInput>
      </View>

      <View style={aboutUsAdminStyles.vAnnouncements}>
        <ScrollView
          adjustsFontSizeToFit
          contentContainerStyle={{paddingBottom: 35}}>
            {/* contentContainerStyle={{paddingBottom: 15}}> */}
          {searchtitles}
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutUsAdmin;
