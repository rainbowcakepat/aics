import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, ScrollView, Modal, TextInput, View, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

//const url = await storage().doc(id).ref('gs://samplelogin-37250.appspot.com/').getDownloadURL();

const Announcement = ({navigation}) => {

  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(true);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [newTitles, setNewTitles] =  useState('');
  const [newLinks, setNewLinks] =  useState('');
  const [newPhoto, setNewPhoto] =  useState(null);
  const [newID, setNewId] =  useState('');

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = 
    firestore()
      .collection('allAnnouncements')
      .orderBy('posttime', 'desc')
      .onSnapshot(querySnapshot => {
        const posts = [];

        querySnapshot.forEach(documentSnapshot => {
          posts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setPosts(posts);
        setLoading(false);
      });

       // Unsubscribe from events when no longer in use
       return () => fetchAnnouncements();
    }, []);

    const choosePhotoFromImageLibrary = () => {
      ImagePicker.openPicker({
        width: 800,
        height: 1200,
        cropping: true,  
      }).then((newPhoto) => {
        console.log(newPhoto);
        const imageUri = Platform.OS == 'ios' ? newPhoto.sourceURL : newPhoto.path;
        setNewPhoto(imageUri);
        Alert.alert('You have attached an image', imageUri);
      })
    }

    const uploadPhoto = async () => {
      const uploadUri = newPhoto;
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
      setNewPhoto(null);
    }
  
      const deleteAnnouncement = (id) => {
        firestore()
        .collection('allAnnouncements')
        .doc(id)
        .delete()
        .then(() => {
                  console.log('ID: User deleted!', id);
            });
        }
        
      const getAnnouncements = (item) => {
        setisModalVisible(true);
        setNewTitles(item.titles);
        setNewLinks(item.links);
        setNewPhoto(item.photo);
        setNewId(item.key);        
        // console.log(item.titles);
        // console.log(item.links);
        console.log(item.titles, item.key, item.photo);
      }
      
      const onPressSave = (newID) => {
        console.log('Gumagana ba to', newID);
        handleEditAnnouncement(newID); //id
        uploadPhoto(newPhoto);
        setisModalVisible(false);
      }

      const handleEditAnnouncement = (id) => {
      firestore()
        .collection('allAnnouncements')
        .doc(id)
        .update({
          titles: newTitles,
          links: newLinks,
          photo: newPhoto,
        })
        .then(() => {
          setNewTitles('');
          setNewLinks('');
          setNewPhoto('');
          Alert.alert('Updated!');
          console.log('User updated!', id);
    });
    }
      
    
  return (
    <View>
      <Text>Announcements here</Text>
        <FlatList 
          style={{backgroundColor: 'yellow'}}
          data= {posts}
          keyExtractor={(item, index) => 'key'+index}
          renderItem= {({item}) => {
          return ( 
            <View style={{flex: 1, }}>
              <Text style={{color: 'black'}}>Title: {item.titles}</Text>
              <Text>Link: {item.links}</Text>
              <Text>Time: { item.posttime}</Text>
              <Text>ID: { item.key}</Text>
              { item.photo == null ? null : 
                <Image source={{uri: item.photo}} style={{ width: 100, height: 100, resizeMode: 'contain'}}></Image>
              }
              <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: 'purple'}} onPress={() => deleteAnnouncement(item.key)} >
                <Text>ARCHIVE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: 'purple'}} onPress={() => getAnnouncements(item)}>
                <Text>UPDATE</Text>
              </TouchableOpacity>

              <Modal
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => setisModalVisible(false)}>

                <View>
                  <Text>Change Text</Text>
                  <TextInput onChangeText={(text) => setNewTitles(text)}
                  placeholder={'Title'}
                  value={newTitles}
                  multiline={false}
                  maxLength={200}>
                  </TextInput>
                  
                  <TextInput onChangeText={(text) => setNewLinks(text)}
                  placeholder={'Links'}
                  value={newLinks}
                  multiline={false}
                  maxLength={200}>
                  </TextInput>

                  <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={choosePhotoFromImageLibrary} >
                   <Text>choose photo here</Text>
                  </TouchableOpacity>

                  {/* <View>
                    <Image source={{uri: setNewPhoto(item.photo)}} style={{ width: '30%', height: '30%', resizeMode: 'contain'}}>
                    </Image>
                  </View> */}

                  <TouchableOpacity
                     onPress={() => onPressSave(newID)} >
                    <Text>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>  setisModalVisible(false)}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                </View>

              </Modal>

           
            </View>

            
              );
             
          }}

        />
        {/* </FlatList> */}

    </View>
  )
}
export default Announcement;