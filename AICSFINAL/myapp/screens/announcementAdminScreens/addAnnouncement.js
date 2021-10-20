import React, { useEffect, useState } from 'react';
import { ImageBackground, Dimensions, Modal, ScrollView,Alert, Text, TextInput, View, TouchableOpacity, 
ActivityIndicator, Image, Platform, ActivityIndicatorBase } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImageModal from 'react-native-image-modal';

import {announcementStyles} from '../../styles/announcementStyles';

const win = Dimensions.get('window');

const AddAnnouncement = ({navigation}) => {

  const time =  new Date().getDate();
  const [titles, setTitle] = useState('');
  // const [links, setLink] = useState('');
  const [contents, setContent] = useState('');
  const [loader, setLoading] = useState(false);

  const [validate1, setValidation1] = useState(false);
  const [validate2, setValidation2] = useState(false);
  
  const [photo, setPhoto] = useState(null);
  const [url, setURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);


  const addAnnouncementNow = async() => {

    const ids = await firestore().collection('allAnnouncements').doc();
    const ids2 = await firestore().collection('allSystemLogs').doc();
    
    ids2.set({
      activity: 'Successfully Added an announcement',
      posttime: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
    })
    .then(() => {
      console.log('system log: Add announcement');
    }).catch((error) => {
      console.log('Something went wrong', error);
    })

    ids.set({
      titles: titles,
      // links: links,
      contents: contents,
      posttime: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
      photo: photo,
      url: url,
    })
    .then(() => {
      console.log('announcement added');
      setTitle(null);
      // setLink(null);
      setContent(null);
      setPhoto(null);
      setURL(null);
      setValidation1(null);
      setValidation2(null);

      if (photo == null) {
        //Alert.alert('Successfully Posted!');
        Alert.alert(
          'Add Announcement',
          'Successfully added an announcement', 
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      } else {
        uploadPhoto(ids.id);
      }

    })
    .catch((error) => {
      //Alert.alert('Error', error.message);
      Alert.alert(
        'Add Announcement',
        'Unable to add an announcement, please try again', 
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      console.log('Something went wrong', error);
     
    })
    
  }


  const cancelAnnouncement = () => {
navigation
  }

  const choosePhotoFromImageLibrary = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 1200,
      cropping: true, 
      mediaType: 'photo',
      multiple: false,
    }).then((photo) => {
      const imageUri = Platform.OS == 'ios' ? photo.sourceURL : photo.path;
      setPhoto(imageUri);
      console.log(photo);
      //Alert.alert('Attached an image', imageUri);
      Alert.alert(
        'Attached an image',
        imageUri, 
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }).catch((e) => {
      //Alert.alert('Unable to attach file, please try again');
      Alert.alert(
        'Failed to attach an image',
        'Unable to attach the image, check your network connectivity', 
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      console.log(e);
  });
  }

  const uploadPhoto = async (id) => {

    const uploadUri = photo;
    let filename = id;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref('allAnnouncementImages/' + filename).putFile(uploadUri);
    task
    .on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
    },
    error => {
      console.log(error);
    });

    task.then(() => {
       storage().ref('allAnnouncementImages/')
      .child(filename)
      .getDownloadURL()
      .then( async(url) => {

        await firestore().collection('allAnnouncements').doc(id).update({url: url});
      // setURL(url);
      console.log('firebase url: ' ,url);
      });
    });


    try {
      await task;
      setUploading(false);
      console.log('Photo uploaded in firestore cloud');
      //Alert.alert('Successfully Posted!');
      Alert.alert(
        'Uploaded a photo',
        'Successfully uploaded in firestore cloud', 
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    catch(e){
      console.log(e);
    } 
    setURL(null);   
    setPhoto(null);
  }


  return (
    <LinearGradient style={announcementStyles.lgOverallContainer} colors= {['#c31432', '#A82712', '#c31432', '#c31432']} >
      
        <LinearGradient style={announcementStyles.lgTopHeader} colors= {['#CB0A0D', '#CB0A0D', ]}>
            {/* <TouchableOpacity style={announcementStyles.menuBarContainer}></TouchableOpacity> */}
            <Icon style= {announcementStyles.menuBarIcon} name="arrow-left" color="white" type= 'ionicons' size={23}  onPress={() => navigation.navigate("Announcements")}/>
            <Text style={announcementStyles.titleText}>Add Announcements</Text>
            <Text style={announcementStyles.subtitleText}>Tell us the latest happenings and updates in CICS, post your announcements now! </Text>

            <TouchableOpacity style={announcementStyles.aicsLogoContainer}>
            </TouchableOpacity>
            <Image source={require('../../assets/aics.png')} style={announcementStyles.aicsLogo}/>
        </LinearGradient>

        <View style={announcementStyles.vBodyContainer}>
          <ScrollView style={announcementStyles.svBody}>
            <Text adjustsFontSizeToFit={true} style={announcementStyles.announcementTitleLabel}>Announcement Title: </Text>
            <TextInput adjustsFontSizeToFit={true}  style={announcementStyles.announcementTitleText} placeholder={"Your Title here..."} placeholderTextColor={'gray'} value={titles} maxLength={50} multiline={true} numberOfLines={2} onChangeText={(titles) => {setTitle(titles); setValidation1(titles); console.log(`title: ${titles}`)}}></TextInput>
            <Text adjustsFontSizeToFit={true}  style={announcementStyles.announcementContentLabel}>What's the latest news?</Text>
            <TextInput adjustsFontSizeToFit={true}  style={announcementStyles.announcementContentText} placeholder={"Your Content here..."} placeholderTextColor={'gray'} value={contents} maxLength={550} numberOfLines={7} multiline={true} onChangeText={(contents) => {setContent(contents); setValidation2(contents); console.log(`content: ${contents}`)}}></TextInput>
            {/* <Text>Link</Text>
            <TextInput placeholder={"Link here"} value={links}  maxLength={150} numberOfLines={3} multiline={true} onChangeText={(links) => {setLink(links); console.log(`link: ${links}`)}}></TextInput> */}
          </ScrollView>
        </View>
   
        <View style={announcementStyles.btnContainer}>
          <TouchableOpacity style={announcementStyles.toImage} onPress={choosePhotoFromImageLibrary} >
            {/* <Icon name="image" color="white" size={24}/>
            <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: hp(2)}}> Attach an image</Text> */}
           <Image source={require('../../assets/./icons/addimage.png')} style={{height: 40, width: 45}}></Image>

          </TouchableOpacity>

        </View>

        <View style={announcementStyles.imgContainer}>
          <ScrollView style={announcementStyles.svImage}>
            <ImageModal source={{uri: photo ? photo : null}} style={{ width: 500, height: 500, resizeMode: 'contain', alignSelf: 'center'}}></ImageModal>
          </ScrollView>
        </View>

        
        <View style={announcementStyles.submitContainer}>
            {/* <TouchableOpacity style={ announcementStyles.toSubmit} onPress={addAnnouncementNow} >
                <Text style={announcementStyles.submitText}> SUBMIT</Text>
            </TouchableOpacity> */}
             {
          validate2 && validate1 ? 
          <View style={announcementStyles.submitContainer}>
            <TouchableOpacity style={announcementStyles.btnSave} onPress={addAnnouncementNow} >
                <Text style={announcementStyles.submitText}> Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={announcementStyles.btnCancel}
                  onPress={() => navigation.navigate("Announcements")}>
                    <Text style={announcementStyles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
          </View> 
          : 
         null
        }

       

          </View> 
         

        {uploading ? (
          <Modal>
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
          ) :  null
        }
      
    </LinearGradient>
  )
}
export default AddAnnouncement;