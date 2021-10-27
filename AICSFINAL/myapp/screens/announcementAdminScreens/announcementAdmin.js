import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  FlatList,
  Text,
  ScrollView,
  Modal,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Button,
  ImageBackground,
} from 'react-native';

import {AuthenticatedUserContext} from '../AuthUserProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';
import DialogInput from 'react-native-dialog-input';

import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

import AnnouncementComponent from './announcementComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {announcementComponentStyles} from '../../styles/announcementComponentStyles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AnnouncementAdmin = ({navigation}) => {
  const {user} = useContext(AuthenticatedUserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [photoIsEdited, setphotoIsEdited] = useState(false);
  const [validate, setValidate] = useState(false);
  const [isImageModalVisible, setImageModal] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalConfirmArchive, setisModalConfirmArchive] = useState(false);

  const [newTitles, setNewTitles] = useState('');
  const [newContents, setNewContents] = useState('');
  const [newLinks, setNewLinks] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);
  const [newID, setNewId] = useState('');

  const [newUrl, setNewURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [archivedtitles, setArchivedTitle] = useState('');
  const [archivedlinks, setArchivedLink] = useState('');
  const [archivedcontents, setArchivedContent] = useState('');
  const [archivedphoto, setArchivedPhoto] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = firestore()
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
        setLoading(true);
      });
    // Unsubscribe from events when no longer in use
    return () => fetchAnnouncements();
  }, []);

  // useEffect(() => {
  //   console.log(initialLoad);
  //   console.log(newPhoto);
  //   if(!initialLoad) {
  //    // uploadPhoto(newID);
  //   }
  //   else {
  //     setinitialLoad(false)
  //   }
  // }, [newPhoto]);

  const choosePhotoFromImageLibrary = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 1200,
      cropping: true,
    })
      .then(newPhoto => {
        const imageUri =
          Platform.OS == 'ios' ? newPhoto.sourceURL : newPhoto.path;
        setNewPhoto(imageUri);
        console.log('Image Uri: ', imageUri);
        //Alert.alert('Attached an image', imageUri);
        Alert.alert(
          'Attached an image',
          imageUri,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        setphotoIsEdited(true);
      })
      .catch(e => {
        Alert.alert(
          'Failed to attach an image',
          'Unable to attach the image, check your network connectivity',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        console.log(e);
      });
  };

  const uploadPhoto = async id => {
    const uploadUri = newPhoto;
    let filename = id;

    setUploading(true);
    setTransferred(0);

    const task = storage()
      .ref('allAnnouncementImages/' + filename)
      .putFile(uploadUri);
    task.on(
      'state_changed',
      taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      },
      error => {
        console.log(error);
      },
    );

    task.then(() => {
      storage()
        .ref('allAnnouncementImages/')
        .child(filename)
        .getDownloadURL()
        .then(async url => {
          await firestore()
            .collection('allAnnouncements')
            .doc(id)
            .update({url: url});
          // setURL(url);
          console.log(url);
        });
    });

    try {
      await task;
      setUploading(false);
      console.log('Photo uploaded in firestore cloud');
      // Alert.alert('Successfully edited an announcem!');
      Alert.alert(
        'Upload a photo',
        'Successfully uploaded in firestore cloud',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (e) {
      console.log(e);
      Alert.alert(
        'Failed to upload a photo',
        'Unable to upload a photo, please check your connectivity',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      //Alert.alert('Something went wrong, please try again');
      setUploading(false);
    }
    setNewPhoto(null);
    setphotoIsEdited(false);
  };

  const getAnnouncements = item => {
    setisModalVisible(true);
    setNewTitles(item.titles);
    setNewContents(item.contents);
    setNewPhoto(item.photo);
    setNewId(item.key);
    setNewURL(item.url);
    setImageModal(true);
    console.log(item.titles, item.key, item.url);
  };

  const onPressSave = newID => {
    console.log('Gumagana ba to', newID);
    console.log('titles length', newTitles.length);

    if (newTitles.length < 3 || newContents.length < 3) {
      Alert.alert(
        'Failed to edit an announcement',
        'You cannot save this module while it is empty. Please enter information with a minimum length of 3 characters.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      console.log('null');
    } else {
      setisModalVisible(false);
      if (photoIsEdited) {
        uploadPhoto(newID);
        console.log('may photo na nabago');
        handleEditAnnouncement(newID); //id
        Alert.alert(
          'Edit Announcement',
          'Successfully edited an announcement',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        handleEditAnnouncement(newID); //id
        Alert.alert(
          'Edit Announcement',
          'Successfully edited an announcement',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    }
  };

  const handleEditAnnouncement = id => {
    firestore()
      .collection('allAnnouncements')
      .doc(id)
      .update({
        titles: newTitles,
        // links: newLinks,
        contents: newContents,
        photo: newPhoto,
        url: newUrl,
      })
      .then(() => {
        editSystemLogs();

        setNewTitles('');
        setNewContents('');
        setNewLinks('');
        setNewPhoto('');
        setNewURL('');
        console.log('Announcement updated!', id);
      })
      .catch(error => {
        console.log('Something went wrong', error);
        //Alert.alert('Unable to edit announcement, please try again');
        Alert.alert(
          'Edit Announcement',
          'Unable to edit announcement, please try again',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  const editSystemLogs = async () => {
    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Edited an Announcement',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Edited an Announcement');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
  };

  let orig;

  const addArchivedAnnouncement = async id => {
    const origannouncements = await firestore()
      .collection('allAnnouncements')
      .doc(id)
      .get()
      .then(doc => {
        orig = doc.data();
      });
    console.log('Original value: ', orig);

    const archiveannouncements = await firestore()
      .collection('allArchivedAnnouncements')
      .doc();

    const ids2 = await firestore().collection('allSystemLogs').doc();

    ids2
      .set({
        activity: 'Successfully Archived an Announcement',
        posttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
      })
      .then(() => {
        console.log('system log: Successfully Archived an Announcement');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });

    archiveannouncements
      .set({
        archivedlinks: orig.url,
        archivedtitles: orig.titles,
        archivedcontents: orig.contents,
        archivedposttime: new Date(
          firestore.Timestamp.now().seconds * 1000,
        ).toLocaleString(),
        archivedphoto: orig.photo,
      })
      .then(() => {
        setArchivedTitle(null);
        setArchivedLink(null);
        setArchivedContent(null);
        setArchivedPhoto(null);
        setArchivedLink(null);

        if (orig.photo == null) {
          deleteAnnouncement(id);
        } else {
          deleteAnnouncement(id);
          deleteAnnouncementImage(id);
        }
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
  };

  const deleteAnnouncement = id => {
    firestore()
      .collection('allAnnouncements')
      .doc(id)
      .delete()
      .then(() => {
        console.log('ID: User deleted!', id);
        //Alert.alert('Successfully Archived an Announcement');
        Alert.alert(
          'Archive Announcement',
          'Successfully archived an announcement',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  const deleteAnnouncementImage = async id => {
    const url = await storage()
      .ref('allAnnouncementImages/' + id)
      .getDownloadURL();
    const deletethis = await storage().refFromURL(url);
    console.log(url);
    deletethis.delete();
  };

  const onPressDelete = newID => {
    console.log('lalabas pop up', newID);
    setisModalConfirmArchive(true);
    setNewId(newID);
  };

  const handleSubmitDelete = (inputText, newID) => {
    if (inputText == 'archiveAnnouncement') {
      addArchivedAnnouncement(newID);
      setisModalConfirmArchive(false);
    } else {
      handleCancelDelete();
    }
  };

  const handleCancelDelete = () => {
    setisModalConfirmArchive(false);
  };

  let searchtitles = null;

  if (loader) {
    searchtitles = posts
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.titles
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
        ) {
          return item;
        } else if (
          item.posttime
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
        ) {
          return item;
        }
      })
      .map((item, key) => {
        return (
          <View key={key}>
            <View style={announcementComponentStyles.vCardContainer}>
              <AnnouncementComponent
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.titles}
                propsposttime={item.posttime}
                propscontent={item.contents}
                // propsimage={item.url}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={announcementComponentStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon
                    name="edit-2"
                    color="white"
                    size={16}
                    style={{marginBottom: 5}}
                  />
                  <Text style={announcementComponentStyles.txtUpdateArchive}>
                    {' '}
                    Edit post{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={announcementComponentStyles.toArchive}
                  onPress={() => onPressDelete(item.key)}>
                  {/* onPress={() => addArchivedAnnouncement(item.key)}> */}
                  <Icon
                    name="archive"
                    color="white"
                    size={16}
                    style={{marginBottom: 5}}
                  />
                  <Text style={announcementComponentStyles.txtUpdateArchive}>
                    {' '}
                    Archive{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Modal
              animationType="fade"
              visible={isModalVisible}
              onRequestClose={() => setisModalVisible(false)}>
              <View style={announcementComponentStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>

                <ImageBackground
                  source={require('../../assets/./bg/annoucementsbg.png')}
                  style={announcementComponentStyles.vtxtTitle}>
                  <ScrollView>
                    <TouchableWithoutFeedback
                      style={announcementComponentStyles.toAnnouncement}>
                      {/* <Icon name="edit-2" color="white" size={19}/> */}
                      <Text style={announcementComponentStyles.txtEdit}>
                        {' '}
                        Edit Announcement
                      </Text>
                    </TouchableWithoutFeedback>

                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: '#F5F5F5',
                      }}>
                      Announcement Title
                    </Text>

                    <TextInput
                      style={announcementComponentStyles.txtTitle}
                      onChangeText={text => setNewTitles(text)}
                      placeholder={'Title'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newTitles}
                      multiline={true}
                      numberOfLines={2}
                      maxLength={50}></TextInput>
                  </ScrollView>
                </ImageBackground>

                <View style={announcementComponentStyles.vtxtContent}>
                  <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                        fontSize: hp(2),
                        color: 'gray',
                      }}>
                      Announcement Content:
                    </Text>

                    <TextInput
                      style={announcementComponentStyles.txtContent}
                      onChangeText={text => {
                        setNewContents(text);
                        setValidate(text);
                      }}
                      placeholder={'Content'}
                      placeholderTextColor={'#B2B2B2'}
                      value={newContents}
                      multiline={true}
                      numberOfLines={5}
                      maxLength={550}></TextInput>

                    {photoIsEdited ? (
                      <View style={announcementStyles.vtxtContent}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            textAlign: 'left',
                            fontSize: hp(2),
                            color: 'gray',
                            paddingBottom: 10,
                          }}>
                          Click Image to view
                        </Text>
                        <ImageModal
                          source={{uri: newPhoto}}
                          style={{
                            width: 500,
                            height: 250,
                            resizeMode: 'contain',
                          }}></ImageModal>
                      </View>
                    ) : newUrl ? (
                      <View style={announcementStyles.vtxtContent}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            textAlign: 'left',
                            fontSize: hp(2),
                            color: 'gray',
                            paddingBottom: 10,
                          }}>
                          Click for full image preview:
                        </Text>
                        <ImageModal
                          source={{uri: newUrl}}
                          style={{
                            width: 500,
                            height: 250,
                            resizeMode: 'contain',
                          }}></ImageModal>
                      </View>
                    ) : null}

                    {/* } {photoIsEdited ? (
                      <ImageModal
                        source={{
                          uri: newPhoto
                            ? newPhoto
                            : 'https://firebasestorage.googleapis.com/v0/b/samplelogin-37250.appspot.com/o/aicsnoimage.png?alt=media&token=c32b87b2-ea3e-48f7-9ddb-decb500a12e0',
                        }}
                        style={{
                          width: win.width,
                          height: 500,
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <ImageModal
                        source={{
                          uri: newUrl
                            ? newUrl
                            : 'https://firebasestorage.googleapis.com/v0/b/samplelogin-37250.appspot.com/o/aicsnoimage.png?alt=media&token=c32b87b2-ea3e-48f7-9ddb-decb500a12e0',
                        }}
                        style={{
                          width: 250,
                          height: 500,
                          resizeMode: 'contain',
                        }}
                      />
                    )} 

                      */}
                  </ScrollView>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignContent: 'flex-end',
                    justifyContent: 'flex-end',
                    backgroundColor: '#F5F5F5',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      marginBottom: 0,
                      paddingTop: 5,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingBottom: 0,
                      justifyContent: 'space-around',
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                      width: win.width / 1.2,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.43,
                      shadowRadius: 9.51,

                      elevation: 15,
                    }}>
                    <TouchableOpacity
                      onPress={choosePhotoFromImageLibrary}
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Icon name="image" color="#B00A0A" size={22} />
                      <Text
                        style={{
                          color: '#B00A0A',
                          fontFamily: 'Poppins-Medium',
                          fontSize: hp(1.5),
                        }}>
                        {' '}
                        Add/Replace
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setisModalVisible(false)}
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Icon name="x-circle" color="#B00A0A" size={22} />
                      <Text
                        style={{
                          color: '#B00A0A',
                          fontFamily: 'Poppins-Medium',
                          marginTop: 1,
                          fontSize: hp(1.5),
                        }}>
                        {' '}
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => onPressSave(newID)}
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Icon name="check-circle" color="#B00A0A" size={22} />
                      <Text
                        style={{
                          color: '#B00A0A',
                          fontFamily: 'Poppins-Medium',
                          fontSize: hp(1.5),
                          marginTop: 2,
                        }}>
                        Save Changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/*<View style={{backgroundColor: '#F5F5F5', flex: 1}}>
                  <TouchableOpacity
                    style={announcementComponentStyles.toPhoto}
                    onPress={choosePhotoFromImageLibrary}>
                    {/* <Icon name="plus" color="white" size={21}/>
                    <Icon name="image" color="white" size={21}/>
                    <Image
                      source={require('../../assets/./icons/addimage.png')}
                      style={{height: 40, width: 45}}></Image>
                    {/* <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: hp(2)}}> Attach an image</Text>
                  </TouchableOpacity>
                </View>





                <View style={announcementComponentStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={announcementComponentStyles.btnSave}
                    onPress={() => onPressSave(newID)}>
                    <Text style={announcementComponentStyles.txtSave}>
                      Save
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={announcementComponentStyles.btnCancel}
                    onPress={() => setisModalVisible(false)}>
                    <Text style={announcementComponentStyles.txtCancel}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                */}
              </View>
            </Modal>

            {isModalConfirmArchive ? (
              <DialogInput
                isDialogVisible={isModalConfirmArchive}
                title={'Archive Announcement'}
                message={
                  'Confirm to archive this announcement by typing: archiveAnnouncement'
                }
                hintInput={'archiveAnnouncement'}
                hintTextColor={'gray'}
                submitInput={inputText => {
                  handleSubmitDelete(inputText, newID);
                }}
                closeDialog={() => {
                  handleCancelDelete();
                }}></DialogInput>
            ) : null}
          </View>
        );
      });
  } else {
    searchtitles = (
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <ImageBackground
          source={require('../../assets/aicslogo.png')}
          style={{
            width: 250,
            height: 150,
            alignSelf: 'center',
            margin: 32,
            resizeMode: 'contain',
          }}></ImageBackground>
        <ActivityIndicator size="large" color="purple"></ActivityIndicator>
      </View>
    );
  }

  if (searchtitles.length < 1) {
    searchtitles = (
      <ImageBackground
        source={require('../../assets/./icons/aicsnoannouncements.png')}
        style={{
          width: win.height >= 534 && win.height < 650 ? '90%' : win.height >= 650 ? '93%' : '90%',  //350 //93 //90,
          height:  220, //220
          alignSelf: 'auto', //auto
          justifyContent:'center',
          alignContent:'center',
          alignItems:'center',
          margin: 32,
          resizeMode: 'contain', //contain
          resizeMode: 'contain',
        }}></ImageBackground>
    );
  }

  return (
    <View style={announcementComponentStyles.lgOverallContainer}>
      <View style={announcementComponentStyles.lgTopHeader}>
        <View style={announcementComponentStyles.headerIconsMenu}>
          <Icon
            style={announcementComponentStyles.menuBarIcon}
            name="menu"
            color="white"
            type="ionicons"
            size={23}
            onPress={() => navigation.toggleDrawer()}
          />
          <Image
            source={require('../../assets/aicsfin.png')}
            style={announcementComponentStyles.aicsLogo}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
            {/* {user.email} */}
            <Text
              adjustsFontSizeToFit={true}
              style={announcementComponentStyles.titleText}>
              Announcements{' '}
            </Text>
            <Text
              adjustsFontSizeToFit={true}
              style={announcementComponentStyles.subtitleText}>
              Be informed! View the latest happenings and updates from CICS.{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={announcementComponentStyles.vSearchBar}>
        <Icon
          name="search"
          color="#B2B2B2"
          style={announcementComponentStyles.searchBaricon}
          size={19}
        />
        <TextInput
          adjustsFontSizeToFit={true}
          style={announcementComponentStyles.tiSearch}
          numberOfLines={1}
          maxLength={50}
          placeholder={'Search'}
          placeholderTextColor={'#B2B2B2'}
          onChangeText={text => {
            setSearchTerm(text);
            console.log(`search: ${searchTerm}`);
          }}></TextInput>
      </View>

      <View style={announcementComponentStyles.vAnnouncements}>
        <TouchableOpacity
          style={announcementComponentStyles.addBtn}
          onPress={() => navigation.navigate('AddAnnouncement')}>
          <Icon
            name="plus-circle"
            style={announcementComponentStyles.plusicon}
            size={17}
          />
          <Text style={announcementComponentStyles.txtAdd}>
            {' '}
            Add an Announcement
          </Text>
        </TouchableOpacity>

        <ScrollView
          adjustsFontSizeToFit
          contentContainerStyle={{paddingBottom: 45}}>
          {searchtitles}
        </ScrollView>
      </View>

      {uploading ? (
        <Modal>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <ImageBackground
              source={require('../../assets/aicslogo.png')}
              style={{
                width: 250,
                height: 150,
                resizeMode: 'contain',
              }}></ImageBackground>

            <ActivityIndicator size="large" color="purple"></ActivityIndicator>
            <Text>{transferred} % Completed </Text>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};
export default AnnouncementAdmin;
