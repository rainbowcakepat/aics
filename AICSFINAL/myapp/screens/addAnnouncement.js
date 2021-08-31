import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, Image, Platform } from 'react-native';
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

  //Add Announcements:
  const addAnnouncementNow = async() => {
    const ids = await firestore().collection('allAnnouncements').doc();
    ids.set({
      titles: titles,
      links: links,
      posttime: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
      //posttime: new Date(firestore.Timestamp.fromDate(new Date()).seconds*1000).toString(),
      //posttime: firestore.Timestamp.fromDate(new Date()),
    })
    .then(() => {
      Alert.alert('Successfully posted!');
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
      Alert.alert('You have attached an image successfully', imageUri);
    })
    .catch((error) => {
      Alert.alert('No image attached');
      console.log('Error:', error);
    });
  }

//upload photo
  const uploadPhoto = async () => {
    const uploadUri = photo;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    try {
      await storage().ref(filename).putFile(uploadUri);

      setUploading(false);
      Alert.alert('Image uploaded to Firebase Cloud');
    }
    catch(e){
      Alert.alert('No image attached');
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
      
      <TextInput placeholder={"Link here"} value={links}   onChangeText={(links) => {setLink(links); console.log(`link: ${links}`)}}></TextInput>
      <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={addAnnouncementNow} >
        <Text>submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={choosePhotoFromImageLibrary} >
        <Text>photo</Text>
      </TouchableOpacity>
      <View>
        {photo == null ? (
          null
          ) : 
          <View>
          <Image source={{ uri: photo }}></Image>
          <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={uploadPhoto} >
            <Text>photo post</Text>
          </TouchableOpacity>
          </View>}
       
      </View>
        

      
    </View>
  )
}
export default AddAnnouncement;