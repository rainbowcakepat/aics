import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, ScrollView, Modal, TextInput, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { utils } from '@react-native-firebase/app';

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

  const [newUrl, setNewURL] =  useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [archivedtitles, setArchivedTitle] = useState('');
  const [archivedlinks, setArchivedLink] = useState('');
  const [archivedcontents, setArchivedContent] = useState('');
  const [archivedphoto, setArchivedPhoto] = useState(null);

 
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
        console.log('Image Uri: ', imageUri);
        Alert.alert('Attached an image', imageUri);
      }).catch((e) => {
        console.log(e);
    });
  }

  const uploadPhoto = async (id) => {

    const uploadUri = newPhoto;
    let filename = newID;

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
    setNewPhoto(null);
  }



      const getAnnouncements = (item) => {
        setisModalVisible(true);
        setNewTitles(item.titles);
        setNewContents(item.contents);
        setNewLinks(item.links);
        setNewPhoto(item.photo);
        setNewId(item.key);  
        setNewURL(item.url);        
        // console.log(item.titles);
        // console.log(item.links);
        console.log(item.titles, item.key, item.url);
      }
      
      const onPressSave = (newID) => {
        console.log('Gumagana ba to', newID);
        setisModalVisible(false);

        if (newUrl == null){
          handleEditAnnouncement(newID); //id
          Alert.alert('Successfully Posted!');
        } else {
          handleEditAnnouncement(newID); //id
          uploadPhoto(newID);
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
          url: newUrl,
        })
        .then(() => {
          setNewTitles('');
          setNewContents('');
          setNewLinks('');        
          setNewPhoto('');
          setNewURL('');
          console.log('Announcement updated!', id);
    });
    }

    let orig;

    const addArchivedAnnouncement = async(id) => {

      const origannouncements = await firestore().collection('allAnnouncements').doc(id)
      .get().then((doc) => {
        orig = doc.data();
       })
      console.log('Original value: ', orig);

      const archiveannouncements = await firestore().collection('allArchivedAnnouncements').doc();

      archiveannouncements.set({
        archivedlinks: orig.links,
        archivedtitles: orig.titles,
        archivedcontents: orig.contents,
        archivedposttime: new Date(firestore.Timestamp.now().seconds*1000).toLocaleString(),
        archivedphoto: orig.photo,
      })
      .then(() => {
        setArchivedTitle(null);
        setArchivedLink(null);
        setArchivedContent(null);
        setArchivedPhoto(null);
        
        if (orig.photo == null) {
          deleteAnnouncement(id);
        }
        else {
          deleteAnnouncement(id);
          deleteAnnouncementImage(id);
        }
      })
      .catch((error) => {
        console.log('Something went wrong', error);
      })
      
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

   
    const deleteAnnouncementImage = async(id) => {
      const url = await storage().ref('allAnnouncementImages/' + id).getDownloadURL();
      const deletethis = await storage().refFromURL(url);
      console.log(url);
      deletethis.delete();
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
              <Text>Photo Url: { item.url}</Text>
      
              <Image source={ item.url == null ? null: {uri: item.url}} style={{ width: 100, height: 200, resizeMode: 'contain'}}></Image>
              
              <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: 'purple'}} onPress={() => addArchivedAnnouncement(item.key)} >
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

                  <TouchableOpacity style={{ width: 300, height: 20, backgroundColor: loader ? 'gray' : 'purple'}} onPress={() => choosePhotoFromImageLibrary()} >
                   <Text>choose photo here</Text>
                  </TouchableOpacity>

                  <View>
                    <Image source={ {uri: newPhoto} || {uri: newUrl}} style={{ width: '50%', height: '60%', resizeMode: 'contain'}}>
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