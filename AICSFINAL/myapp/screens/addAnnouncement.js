import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase';
import ImagePicker from 'react-native-image-crop-picker';

const AddAnnouncement = ({navigation}) => {

  const time =  new Date().getDate();
  const [titles, setTitle] = useState('');
  const [links, setLink] = useState('');
  const [loader, setLoading] = useState(false);
  const [image, setImage] = useState(null);
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

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 800,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  
 
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
      <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={choosePhotoFromLibrary} >
        <Text>photo</Text>
      </TouchableOpacity>
    </View>
  )
}
export default AddAnnouncement;