import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image, Platform, ActivityIndicatorBase } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

//Try
const AddAnnouncement = ({navigation}) => {

  const time =  new Date().getDate();
  const [titles, setTitle] = useState('');
  const [links, setLink] = useState('');
  const [loader, setLoading] = useState(false);
  
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const onSubmit = () => {
    if (photo == null){
      addAnnouncementNow();
      Alert.alert('Successfully Posted!');
    } else {
      addAnnouncementNow();
      uploadPhoto();
     
    }
  }

  const addAnnouncementNow = async() => {
    const ids = await firestore().collection('allAnnouncements').doc();
    ids.set({
      titles: titles,
      links: links,
      posttime: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
    })
    .then(() => {
      console.log('added');
      setTitle(null);
      setLink(null);
    })
    .catch((error) => {
      console.log('Something went wrong', error);
    });  
  }

  const choosePhotoFromImageLibrary = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 1200,
      cropping: true,  
    }).then((photo) => {
      console.log(photo);
      const imageUri = Platform.OS == 'ios' ? photo.sourceURL : photo.path;
      setPhoto(imageUri);
      Alert.alert('Attached an image', imageUri);
    })
  }

//upload photo
  const uploadPhoto = async () => {
    const uploadUri = photo;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0,-1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
    });

    try {
      await task;
      setUploading(false);
      console.log('Photo uploaded in firestore cloud');
      Alert.alert('Successfully Posted!');
    }
    catch(e){
      console.log(e);
    }
    setPhoto(null);
  }
  
  return (
    <View>
      <Text>Add Announcement</Text>
      <TextInput placeholder={"Title here"} value={titles} 
       onChangeText={(titles) => {setTitle(titles); console.log(`to do: ${titles}`)}}
      >
      </TextInput>
      
      <TextInput placeholder={"Link here"} value={links} onChangeText={(links) => {setLink(links); console.log(`link: ${links}`)}}></TextInput>
      
      <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={choosePhotoFromImageLibrary} >
        <Text>choose photo here</Text>
      </TouchableOpacity>

      <View style={{ width: 300, height: 20, backgroundColor: 'black'}}>
              <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={onSubmit} >
                <Text>submit</Text>
              </TouchableOpacity>
      </View>

      {uploading ? (
        <View>
          <Text>{transferred} % Completed </Text>
          <ActivityIndicator size="large" color='purple'></ActivityIndicator>
        </View>
        ) :  null
      }
      
    </View>
  )
}
export default AddAnnouncement;