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
  const [contents, setContent] = useState('');
  const [loader, setLoading] = useState(false);
  
  const [photo, setPhoto] = useState(null);
  const [url, setURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);


  const addAnnouncementNow = async() => {
    const ids = await firestore().collection('allAnnouncements').doc();
    
    ids.set({
      titles: titles,
      links: links,
      contents: contents,
      posttime: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
      photo: photo,
      url: url,
    })
    .then(() => {
      console.log('announcement added');
      setTitle(null);
      setLink(null);
      setContent(null);
      setPhoto(null);
      setURL(null);

      if (photo == null) {
        Alert.alert('Successfully Posted!');
      } else {
        uploadPhoto(ids.id);
      }
    })
    .catch((error) => {
      console.log('Something went wrong', error);
    })
    
  }

  const choosePhotoFromImageLibrary = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 1200,
      cropping: true,  
    }).then((photo) => {
      const imageUri = Platform.OS == 'ios' ? photo.sourceURL : photo.path;
      setPhoto(imageUri);
      console.log(photo);
      Alert.alert('Attached an image', imageUri);
    }).catch((e) => {
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
      console.log(url);
      });
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

      <TextInput placeholder={"Title here"} value={titles} onChangeText={(titles) => {setTitle(titles); console.log(`title: ${titles}`)}}></TextInput>
      <TextInput placeholder={"Content here"} value={contents} onChangeText={(contents) => {setContent(contents); console.log(`content: ${contents}`)}}></TextInput>
      <TextInput placeholder={"Link here"} value={links} onChangeText={(links) => {setLink(links); console.log(`link: ${links}`)}}></TextInput>
      
      <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={choosePhotoFromImageLibrary} >
        <Text>choose photo here</Text>
      </TouchableOpacity>

      
      <Image source={{uri: photo}} style={{ width: 100, height: 200, resizeMode: 'contain'}}></Image>
      
      <View style={{ width: 300, height: 20, backgroundColor: 'black'}}>
              <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={addAnnouncementNow} >
                <Text>submit</Text>
              </TouchableOpacity>
      </View>

      

      {uploading ? (
        <View>
          <ActivityIndicator size="large" color='purple'></ActivityIndicator>
          <Text>{transferred} % Completed </Text>
        </View>
        ) :  null
      }
      
    </View>
  )
}
export default AddAnnouncement;