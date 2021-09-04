import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, ScrollView, Modal, TextInput, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

//const url = await storage().doc(id).ref('gs://samplelogin-37250.appspot.com/').getDownloadURL();

const Announcement = ({navigation}) => {

  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(true);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [newTitles, setNewTitles] =  useState('');
  const [newContents, setNewContents] =  useState('');
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
        const imageUri = Platform.OS == 'ios' ? newPhoto.sourceURL : newPhoto.path;
        setNewPhoto(imageUri);
        Alert.alert('Attached an image', imageUri);
      }).catch((e) => {
        console.log(e);
    });
  }

//   const choosePhotoFromImageLibrary = () => {
//     ImagePicker.openPicker({
//       width: 800,
//       height: 1200,
//       cropping: true,  
//     }).then((newPhoto) => {
//       const imageUri = Platform.OS == 'ios' ? newPhoto.sourceURL : newPhoto.path;
//       setNewPhoto(imageUri);
//       Alert.alert('Attached an image', imageUri);
//     }).catch((e) => {
//       console.log(e);
//   });
// }

  const uploadPhoto = async () => {
    const uploadUri = newPhoto;
    let filename = newID;
    // let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const task =  storage().ref('allAnnouncementImages/' + filename).putFile(uploadUri);

    try {
      await task;
      setUploading(false);
      console.log('Photo uploaded in firestore cloud');
      // Alert.alert('Successfully Posted!');
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
        setNewContents(item.contents);
        setNewLinks(item.links);
        setNewPhoto(item.photo);
        setNewId(item.key);        
        // console.log(item.titles);
        // console.log(item.links);
        console.log(item.titles, item.key, item.photo);
      }
      
      const onPressSave = (newID) => {
        console.log('Gumagana ba to', newID);
        setisModalVisible(false);

        if (newPhoto == null){
          handleEditAnnouncement(newID); //id
          Alert.alert('Successfully Posted!');
        } else {
          handleEditAnnouncement(newID); //id
          uploadPhoto();
        }

      }

      const handleEditAnnouncement = (id) => {
      firestore()
        .collection('allAnnouncements')
        .doc(id)
        .update({
          titles: newTitles,
          links: newLinks,
          contents: newContents,
          photo: newPhoto,
        })
        .then(() => {
          setNewTitles('');
          setNewContents('');
          setNewLinks('');        
          setNewPhoto('');
          console.log('Announcement updated!', id);
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
              <Text>Title: {item.titles}</Text>
              <Text>Content: {item.contents}</Text>
              <Text>Link: {item.links}</Text>
              <Text>Time: { item.posttime}</Text>
              <Text>ID Key: { item.key}</Text>
              <Text>Photo ID: { item.photo}</Text>
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

                  <TextInput onChangeText={(text) => setNewContents(text)}
                  placeholder={'Content'}
                  value={newContents}
                  multiline={true}
                  maxLength={200}>
                  </TextInput>

                  
                  <TextInput onChangeText={(text) => setNewLinks(text)}
                  placeholder={'Links'}
                  value={newLinks}
                  multiline={false}
                  maxLength={200}>
                  </TextInput>

                  <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={() => choosePhotoFromImageLibrary(item.photo)} >
                   <Text>choose photo here</Text>
                  </TouchableOpacity>

                  <View>
                    <Image source={{uri:(newPhoto)}} style={{ width: '50%', height: '60%', resizeMode: 'contain'}}>
                    </Image>
                  </View>

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