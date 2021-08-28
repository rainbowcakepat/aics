import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase';

const AddAnnouncement = ({navigation}) => {

  const time =  new Date().getDate();
  const [titles, setTitle] = useState('');
  const [links, setLink] = useState('');
  const [loader, setLoading] = useState(false);

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
    </View>
  )
}
export default AddAnnouncement;