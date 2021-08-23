import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase';

const AddAnnouncement = ({navigation}) => {

  const [titles, setTitle] = useState('');
  const [links, setLink] = useState('');
  const ref = firestore().collection('allAnnouncements');

  const addAnnouncementNow = async() => {
    firestore()
    .collection('allAnnouncements')
    .add({
      titles: titles,
      links: links,
    })
    .then(() => {
      console.log('added');
      setTitle('');
      setLink('');
    })
    .catch((error) => {
      console.log('Something went wrong', error);
    });
  }




  const [loader, setLoader] = useState(false);

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