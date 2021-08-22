import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const AddAnnouncement = ({navigation}) => {
  return (
    <View>
      <Text>Add Announcement</Text>
      <TextInput placeholder={"Title here"}></TextInput>
      <TextInput placeholder={"Link here"}></TextInput>
      <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: 'purple'}}>
        <Text>submit cutie</Text>
      </TouchableOpacity>
    </View>
  )
}
export default AddAnnouncement;