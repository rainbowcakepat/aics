import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, ScrollView, Modal, TextInput, View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

//const url = await storage().doc(id).ref('gs://samplelogin-37250.appspot.com/').getDownloadURL();

const Announcement = ({navigation}) => {

  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(true);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [newTitles, setNewTitles] =  useState('');
  const [newLinks, setNewLinks] =  useState('');
  const [newID, setNewId] =  useState('');

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
        setNewId(item.key);        
        // console.log(item.titles);
        // console.log(item.links);
        console.log(item.titles, item.key);
      }
      
      const onPressSave = (newID) => {
        console.log('Gumagana ba to', newID);
        handleEditAnnouncement(newID); //id
        setisModalVisible(false);
      }

      const handleEditAnnouncement = (id) => {
      firestore()
        .collection('allAnnouncements')
        .doc(id)
        .update({
          titles: newTitles,
          links: newLinks,
        })
        .then(() => {
          setNewTitles('');
          setNewLinks('');
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