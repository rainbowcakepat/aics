import React, {useState, useEffect} from 'react';
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

import LinearGradient from 'react-native-linear-gradient';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';

import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToFonts as wf,
  heightPercentageToFonts as hf,
} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

import HowToUseAdminComponent from './howToUseAdminComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {aboutUsStudentStyles} from '../../styles/aboutUsStudentStyles';
import {howToUseAdminStyles} from '../../styles/howToUseAdminStyles';

const howToUseAdmin = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [newTitles, setNewTitles] = useState('');

  const [newID, setNewId] = useState('');

  const [uploading, setUploading] = useState(false);

  // FOR HOW TO USE ANNOUNCEMENTS
  const [isModalVisibleAnnouncements, setisModalVisibleAnnouncements] =
    useState(false);
  const [newAddAnnouncement, setNewAddAnnouncement] = useState('');
  const [newEditAnnouncement, setNewEditAnnouncement] = useState('');
  const [newArchiveAnnouncement, setNewArchiveAnnouncement] = useState('');

  // FOR HOW TO USE ABOUT US
  const [isModalVisibleAboutUs, setisModalVisibleAboutUs] = useState(false);
  const [newEditAboutUs, setNewEditAboutUs] = useState('');
  const [newSearchAboutUs, setNewSearchAboutUs] = useState('');

  //FOR HOW TO USE UNANSWERED QUESTIONS
  const [isModalVisibleUnanswered, setisModalVisibleUnanswered] =
    useState(false);
  const [newAnswerUnanswered, setNewAnswerUnanswered] = useState('');
  const [newArchiveUnanswered, setNewArchiveUnanswered] = useState('');

  //FOR HOW TO USE RESPONSE LIST
  const [isModalVisibleResponseList, setisModalVisibleResponseList] =
    useState(false);
  const [newAddResponseList, setNewAddResponseList] = useState('');
  const [newEditResponseList, setNewEditResponseList] = useState('');
  const [newArchiveResponseList, setNewArchiveResponseList] = useState('');

  //FOR HOW TO USE ACCOUNT SCREEN
  const [isModalVisibleAccountScreen, setisModalVisibleAccountScreen] =
    useState(false);
  const [newViewActivityLog, setNewViewActivityLog] = useState('');
  const [newChangePass, setNewChangePass] = useState('');

  useEffect(() => {
    const fetchHowToUse = firestore()
      .collection('howToUseAdmin')
      .orderBy('titles', 'asc')
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
    return () => fetchHowToUse();
  }, []);

  const getAnnouncements = item => {
    setNewId(item.key);

    if (item.titles == 'Announcements Screen') {
      setisModalVisibleAnnouncements(true);
      setNewId(item.key);
      setNewTitles(item.titles);
      setNewAddAnnouncement(item.add);
      setNewEditAnnouncement(item.edit);
      setNewArchiveAnnouncement(item.archive);
    }

    if (item.titles == 'About Us Screen') {
      setisModalVisibleAboutUs(true);
      setNewId(item.key);
      setNewTitles(item.titles);
      setNewEditAboutUs(item.edit);
      setNewSearchAboutUs(item.search);
    }

    if (item.titles == 'Unanswered Questions Screen') {
      setisModalVisibleUnanswered(true);
      setNewId(item.key);
      setNewTitles(item.titles);
      setNewAnswerUnanswered(item.answer);
      setNewArchiveUnanswered(item.archive);
    }

    // if (item.titles == 'Response List Screen') {
    //   setisModalVisibleResponseList(true);
    //   setNewId(item.key);
    //   setNewTitles(item.titles);
    //   setNewAddResponseList(item.add);
    //   setNewEditResponseList(item.edit);
    //   setNewArchiveResponseList(item.archive);
    // }

    if (item.titles == 'Account Screen') {
      setisModalVisibleAccountScreen(true);
      setNewId(item.key);
      setNewTitles(item.titles);
      setNewViewActivityLog(item.activitylog);
      setNewChangePass(item.changePass);
    }
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
        }
      })
      .map((item, key) => {
        return (
          <View key={key}>
            <View style={howToUseAdminStyles.vCardContainer}>
              <HowToUseAdminComponent
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.titles}
                propskeywords={item.keywords}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={howToUseAdminStyles.toUpdate}
                  onPress={() => getAnnouncements(item)}>
                  <Icon
                    name="eye"
                    color="white"
                    size={16}
                    style={{marginBottom: 5}}
                  />
                  <Text style={howToUseAdminStyles.txtUpdateArchive}>
                    {' '}
                    View information{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*MODAL: HOW TO USE ANNOUNCEMENTS*/}
            <Modal
              animationType="fade"
              visible={isModalVisibleAnnouncements}
              onRequestClose={() => setisModalVisibleAnnouncements(false)}>
              <View style={howToUseAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/annoucementsbg.png')}
                  style={howToUseAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={howToUseAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={howToUseAdminStyles.txtEdit}>
                      {' '}
                      How To Use Admin{' '}
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(2),
                      color: '#F5F5F5',
                    }}>
                    {' '}
                  College of Information and Computing Sciences{' '}
                  </Text>

                  <Text style={howToUseAdminStyles.txtTitle}>{newTitles}</Text>
                </ImageBackground>

                <View style={howToUseAdminStyles.vtxtContent}>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="file-plus"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Add Announcement:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newAddAnnouncement}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="edit"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Edit Announcement:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newEditAnnouncement}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="archive"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Archive Announcement:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newArchiveAnnouncement}
                    </Text>

                    <Text></Text>
                  </ScrollView>
                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsStudentStyles.btnBack}
                    onPress={() => setisModalVisibleAnnouncements(false)}>
                    <Icon
                      name="arrow-left"
                      color="white"
                      type="ionicons"
                      size={18}
                      style={{marginBottom: 2, paddingLeft: -20}}
                    />
                    <Text style={aboutUsStudentStyles.txtBack}> Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/*MODAL: HOW TO USE ABOUT US SCREEN*/}
            <Modal
              animationType="fade"
              visible={isModalVisibleAboutUs}
              onRequestClose={() => setisModalVisibleAboutUs(false)}>
              <View style={howToUseAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/annoucementsbg.png')}
                  style={howToUseAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={howToUseAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={howToUseAdminStyles.txtEdit}>
                      {' '}
                      How To Use Admin{' '}
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(2),
                      color: '#F5F5F5',
                    }}>
                    {' '}
                    College of Information and Computing Sciences{' '}
                  </Text>

                  <Text style={howToUseAdminStyles.txtTitle}>{newTitles}</Text>
                </ImageBackground>

                <View style={howToUseAdminStyles.vtxtContent}>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="edit"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Edit About Us:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newEditAboutUs}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="search"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Search About Us:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newSearchAboutUs}
                    </Text>

                    <Text></Text>
                  </ScrollView>
                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsStudentStyles.btnBack}
                    onPress={() => setisModalVisibleAboutUs(false)}>
                    <Icon
                      name="arrow-left"
                      color="white"
                      type="ionicons"
                      size={18}
                      style={{marginBottom: 2, paddingLeft: -20}}
                    />
                    <Text style={aboutUsStudentStyles.txtBack}> Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* HOW TO USE UNANSWERED QUESTIONS = di ko to matest kasi nakasagad sa dulo yung button :-(*/}
            <Modal
              animationType="fade"
              visible={isModalVisibleUnanswered}
              onRequestClose={() => setisModalVisibleUnanswered(false)}>
              <View style={howToUseAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/annoucementsbg.png')}
                  style={howToUseAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={howToUseAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={howToUseAdminStyles.txtEdit}>
                      {' '}
                      How To Use Admin{' '}
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(2),
                      color: '#F5F5F5',
                    }}>
                    {' '}
                    College of Information and Computing Sciences{' '}
                  </Text>

                  <Text style={howToUseAdminStyles.txtTitle}>{newTitles}</Text>
                </ImageBackground>

                <View style={howToUseAdminStyles.vtxtContent}>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="search"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Answer Unanswered Questions:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newAnswerUnanswered}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="search"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Archive Unanswered Questions:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newArchiveUnanswered}
                    </Text>

                    <Text></Text>
                  </ScrollView>
                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsStudentStyles.btnBack}
                    onPress={() => setisModalVisibleUnanswered(false)}>
                    <Icon
                      name="arrow-left"
                      color="white"
                      type="ionicons"
                      size={18}
                      style={{marginBottom: 2, paddingLeft: -20}}
                    />
                    <Text style={aboutUsStudentStyles.txtBack}> Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/*MODAL: HOW TO USE RESPONSE LIST SCREEN*/}
            <Modal
              animationType="fade"
              visible={isModalVisibleResponseList}
              onRequestClose={() => setisModalVisibleResponseList(false)}>
              <View style={howToUseAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/annoucementsbg.png')}
                  style={howToUseAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={howToUseAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={howToUseAdminStyles.txtEdit}>
                      {' '}
                      How To Use Admin{' '}
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(2),
                      color: '#F5F5F5',
                    }}>
                    {' '}
                    College of Information and Computing Sciences{' '}
                  </Text>

                  <Text style={howToUseAdminStyles.txtTitle}>{newTitles}</Text>
                </ImageBackground>

                <View style={howToUseAdminStyles.vtxtContent}>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="file-plus"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Add Question with Answer:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newAddResponseList}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="edit"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Edit Question and Answer:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newEditResponseList}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="archive"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Archive Question and Answer:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newArchiveResponseList}
                    </Text>

                    <Text></Text>
                  </ScrollView>
                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsStudentStyles.btnBack}
                    onPress={() => setisModalVisibleResponseList(false)}>
                    <Icon
                      name="arrow-left"
                      color="white"
                      type="ionicons"
                      size={18}
                      style={{marginBottom: 2, paddingLeft: -20}}
                    />
                    <Text style={aboutUsStudentStyles.txtBack}> Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/*MODAL: HOW TO USE ACCOUNT SCREEN*/}
            <Modal
              animationType="fade"
              visible={isModalVisibleAccountScreen}
              onRequestClose={() => setisModalVisibleAccountScreen(false)}>
              <View style={howToUseAdminStyles.vModalContainer}>
                <View style={{flex: 1, backgroundColor: 'white'}}></View>
                <ImageBackground
                  source={require('../../assets/./bg/annoucementsbg.png')}
                  style={howToUseAdminStyles.vtxtTitle}>
                  <TouchableWithoutFeedback
                    style={howToUseAdminStyles.toAnnouncement}>
                    {/* <Icon name="edit-2" color="white" size={19}/> */}
                    <Text style={howToUseAdminStyles.txtEdit}>
                      {' '}
                      How To Use Admin{' '}
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: hp(2),
                      color: '#F5F5F5',
                    }}>
                    {' '}
                    College of Information and Computing Sciences{' '}
                  </Text>

                  <Text style={howToUseAdminStyles.txtTitle}>{newTitles}</Text>
                </ImageBackground>

                <View style={howToUseAdminStyles.vtxtContent}>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="activity"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        View Activity Log:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newViewActivityLog}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="lock"
                        color="black"
                        type="ionicons"
                        size={18}
                      />
                      <Text style={aboutUsStudentStyles.txtLabelDescription}>
                        {' '}
                        Change Password:{' '}
                      </Text>
                    </View>

                    <Text style={aboutUsStudentStyles.txtContent}>
                      {newChangePass}
                    </Text>
                    <Text></Text>
                  </ScrollView>
                </View>

                <View style={aboutUsStudentStyles.vSaveCancel}>
                  <TouchableOpacity
                    style={aboutUsStudentStyles.btnBack}
                    onPress={() => setisModalVisibleAccountScreen(false)}>
                    <Icon
                      name="arrow-left"
                      color="white"
                      type="ionicons"
                      size={18}
                      style={{marginBottom: 2, paddingLeft: -20}}
                    />
                    <Text style={aboutUsStudentStyles.txtBack}> Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      });
  } else {
    searchtitles = (
      <Image
        source={require('../../assets/./gif/spinner.gif')}
        style={{
          width: '50%',
          height: '60%',
          resizeMode: 'contain',
        }}></Image>
    );
    // <Text>Dito ko lalagay yung nagloload</Text>
  }

  if (searchtitles.length < 1) {
    searchtitles = (
      <ImageBackground
        source={require('../../assets/./icons/aicsnoabout.png')}
        style={{
          width: win.height >= 534 && win.height < 650 ? '90%' : win.height >= 650 ? '93%' : '90%',  //350 //93 //90,
          height:  220, //220
          alignSelf: 'auto', //auto
          justifyContent:'center',
          alignContent:'center',
          alignItems:'center',
          margin: 32,
          resizeMode: 'contain', //contain
        }}></ImageBackground>
    );
  }

  return (
    <View style={howToUseAdminStyles.lgOverallContainer}>
      <View style={howToUseAdminStyles.lgTopHeader}>
        <View style={howToUseAdminStyles.headerIconsMenu}>
          <Icon
            style={howToUseAdminStyles.menuBarIcon}
            name="menu"
            color="white"
            type="ionicons"
            size={23}
            onPress={() => navigation.toggleDrawer()}
          />
          <Image
            source={require('../../assets/aicsfin.png')}
            style={howToUseAdminStyles.aicsLogo}
          />
        </View>

        {/* display to */}
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              adjustsFontSizeToFit={true}
              style={howToUseAdminStyles.titleText}>
              How To Use Admin
            </Text>
            <Text
              adjustsFontSizeToFit={true}
              style={howToUseAdminStyles.subtitleText}>
              Learn how to use the features of the application as an AICS
              Administrator{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={howToUseAdminStyles.vSearchBar}>
        {/* Text input = yung issearch ni user */}
        <Icon
          name="search"
          color="#B2B2B2"
          style={howToUseAdminStyles.searchBaricon}
          size={19}
        />
        <TextInput
          adjustsFontSizeToFit={true}
          style={howToUseAdminStyles.tiSearch}
          numberOfLines={1}
          maxLength={50}
          placeholder={'Search'}
          placeholderTextColor={'#B2B2B2'}
          onChangeText={text => {
            setSearchTerm(text);
            console.log(`search: ${searchTerm}`);
          }}></TextInput>
      </View>

      <View style={howToUseAdminStyles.vAnnouncements}>
        {/* TouchableOpacity = button */}

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

      {/* {uploading ? (
          <Modal style={{flex:1, flexDirection: 'row'}}>
            <ActivityIndicator size="large" color='purple'></ActivityIndicator>
            <Text>{transferred} % Completed </Text>
          </Modal>
          ) :  null
        }
       */}
    </View>
  );
};
export default howToUseAdmin;
