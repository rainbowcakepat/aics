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
} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

import SystemLogsComponent from '../systemLogs/systemLogsComponent';
import {announcementStyles} from '../../styles/announcementStyles';
import {systemLogsStyles} from '../../styles/systemLogsStyles';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const SystemLogs = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(null);
  const [loader, setLoading] = useState(false);

  const [newTitles, setNewTitles] = useState('');
  const [newContents, setNewContents] = useState('');

  useEffect(() => {
    const fetchSystemLogs = firestore()
      .collection('allSystemLogs')
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
    return () => fetchSystemLogs();
  }, []);

  const getAnnouncements = item => {
    setNewTitles(item.activity);
    setNewContents(item.posttime);

    console.log(item.activity, item.posttime);
  };

  let searchtitles = null;

  if (loader) {
    searchtitles = posts
      .filter(item => {
        if (searchTerm == '') {
          return item;
        } else if (
          item.activity
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
            <View style={systemLogsStyles.vCardContainer}>
              <SystemLogsComponent
                // item = {item}
                propsnum={key}
                propsid={item.key}
                propstitle={item.activity}
                propsposttime={item.posttime}
              />
            </View>
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
    <View style={systemLogsStyles.lgOverallContainer}>
      <View style={systemLogsStyles.lgTopHeader}>
        <View style={systemLogsStyles.headerIconsMenu}>
          <Icon
            style={systemLogsStyles.menuBarIcon}
            name="menu"
            color="white"
            type="ionicons"
            size={23}
            onPress={() => navigation.toggleDrawer()}
          />
          <Image
            source={require('../../assets/aicsfin.png')}
            style={systemLogsStyles.aicsLogo}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              adjustsFontSizeToFit={true}
              style={systemLogsStyles.titleText}>
              System Logs
            </Text>
            <Text
              adjustsFontSizeToFit={true}
              style={systemLogsStyles.subtitleText}>
              View the recent activities of the UST CICS administrator for
              tracking.{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={systemLogsStyles.vSearchBar}>
        <Icon
          name="search"
          color="#B2B2B2"
          style={systemLogsStyles.searchBaricon}
          size={19}
        />
        <TextInput
          adjustsFontSizeToFit={true}
          style={systemLogsStyles.tiSearch}
          numberOfLines={1}
          maxLength={50}
          placeholder={'Search'}
          placeholderTextColor={'#B2B2B2'}
          onChangeText={text => {
            setSearchTerm(text);
            console.log(`search: ${searchTerm}`);
          }}></TextInput>
      </View>

      <View style={systemLogsStyles.vAnnouncements}>
        <ScrollView
          adjustsFontSizeToFit
          contentContainerStyle={{paddingBottom: 45}}>
          {searchtitles}
        </ScrollView>
      </View>
    </View>
  );
};
export default SystemLogs;
