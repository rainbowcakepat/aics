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
        Alert.alert('Attached an image', imageUri);
        setphotoIsEdited(true);
      })
      .catch(e => {
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
    } catch (e) {
      console.log(e);
      Alert.alert('Something went wrong, please try again');
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
    setisModalVisible(false);

    if (photoIsEdited) {
      uploadPhoto(newID);
      console.log('may photo na nabago');
    }

    handleEditAnnouncement(newID); //id
    Alert.alert('Successfulyy edited an announcement!');

    // if (newUrl == null) {
    //   handleEditAnnouncement(newID); //id
    //   Alert.alert('Successfully Posted!');
    // } else {
    //   handleEditAnnouncement(newID); //id
    //   uploadPhoto(newID);
    // }
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
        Alert.alert('Unable to edit announcement, please try again');
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
        Alert.alert('Successfully Archived an Announcement');
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
                </ImageBackground>

                <View style={announcementComponentStyles.vtxtContent}>
                  <ScrollView>
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
                  </ScrollView>
                </View>

                <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
                  <TouchableOpacity
                    style={announcementComponentStyles.toPhoto}
                    onPress={choosePhotoFromImageLibrary}>
                    {/* <Icon name="plus" color="white" size={21}/>
                    <Icon name="image" color="white" size={21}/> */}
                    <Image
                      source={require('../../assets/./icons/addimage.png')}
                      style={{height: 40, width: 45}}></Image>
                    {/* <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: hp(2)}}> Attach an image</Text> */}
                  </TouchableOpacity>
                </View>

                {/* {newUrl == null && newPhoto == null ? */}
                <ScrollView style={announcementComponentStyles.imageContainer}>
                  {/* <Image
                   source={{uri: newUrl ? newUrl : newPhoto ? newPhoto : null}}
                   style={{
                     width: 500,
                     height: 500,
                     resizeMode: 'contain',
                   }}>
                   </Image> */}
                  {/* 
                  {
                    newUrl && newPhoto ? 
                    <ImageModal
                    source={{uri: newUrl ? newUrl : newPhoto ? newPhoto : null}}
                    style={{
                      width: 500,
                      height: 500,
                      resizeMode: 'contain',}}
                  />
                 :
                    <Text>Meron</Text>
                  } */}

                  {photoIsEdited ? (
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
                        width: win.width,
                        height: 500,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </ScrollView>
                {/* : 
                  null
                } */}

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
          width: 350,
          height: 220,
          alignSelf: 'auto',
          margin: 32,
          resizeMode: 'contain',
        }}></ImageBackground>
    );
  }

  return (
    <View style={announcementComponentStyles.lgOverallContainer}>
      <View style={announcementComponentStyles.lgTopHeader}>
        <Icon
          style={announcementComponentStyles.menuBarIcon}
          name="menu"
          color="white"
          type="ionicons"
          size={23}
          onPress={() => navigation.toggleDrawer()}
        />
        <TouchableOpacity
          style={
            announcementComponentStyles.aicsLogoContainer
          }></TouchableOpacity>
        <Image
          source={require('../../assets/aics.png')}
          style={announcementStyles.aicsLogo}
        />

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
