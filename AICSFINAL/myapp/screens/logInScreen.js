import React, {AsyncStorage, useEffect, useState} from 'react';
import {
  TextInput,
  TouchableHighlight,
  Linking,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToFonts as wf,
  heightPercentageToFonts as hf,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import {globalStyles} from '../styles/global';
import {auth} from '../firebase';

import ChangePasswordScreen from './changePasswordScreen';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-navigation';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const win = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const signin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);

        const ids2 = await firestore().collection('allSystemLogs').doc();

        ids2
          .set({
            activity: 'Successful Login',
            posttime: new Date(
              firestore.Timestamp.now().seconds * 1000,
            ).toLocaleString(),
          })
          .then(() => {
            console.log('system log: Successful Login');
          })
          .catch(error => {
            console.log('Something went wrong', error);
          });
      } else {
        Alert.alert(
          'Login',
          'Please enter your credentials correctly', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        //Alert.alert('Please enter your credentials correctly');
      }
    } catch (error) {
      Alert.alert(
        'Failed Login',
        'Kindly check your internet connectivity', // <- this part is optional, you can pass an empty string
        [{text: 'ok', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      //Alert.alert('Please enter your credentials correctly');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        //User is signed in
        // navigation.navigate('AkishaChatbot');
      } else {
        //No user is signed in
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingBottom: 20}}>
      
      <ImageBackground
        style={{flex: 2, backgroundColor: 'red'}}
        source={require('../assets/./bg/annoucementsbg.png')}></ImageBackground>

      <KeyboardAvoidingView behavior = "padding"
        style={{
          flex: 3,
          backgroundColor: 'white',
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flexDirection: 'column',
        }}>
        <TouchableWithoutFeedback >
          <Text
            style={{
              backgroundColor: 'black',
              borderRadius: 12,
              marginTop: 20,
              marginLeft: 15,
              borderColor: 'black',
              padding: 7,
              width: 195,
              fontSize: hp(2.5),
              textAlign: 'center',
              justifyContent: 'center',
              textAlignVertical: 'center',
              fontFamily: 'Poppins-Medium',
              color: 'white',
              marginBottom: 10,
            }}>
            {' '}
            Welcome, Admin!{' '}
          </Text>
        </TouchableWithoutFeedback>

        <View style={{paddingHorizontal: 20, paddingBottom:10}}>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: hp(2.1)}}>
            Email Address:
          </Text>

          <TextInput
            style={{
              backgroundColor: '#F6F1F1',
              fontSize: hp(2.3),
              borderRadius: 15,
              marginVertical: 10,
              paddingHorizontal: 10,
              paddingRight: 20,
              color: 'black'
            }}
            placeholder="  enter your username"
            placeholderTextColor="gray"
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}></TextInput>

          <Text style={{fontFamily: 'Poppins-Regular', fontSize: hp(2.1)}}>
            Password:
          </Text>

          <TextInput
            style={{
              backgroundColor: '#F6F1F1',
              fontSize: hp(2.3),
              borderRadius: 15,
              marginVertical: 10,
              paddingHorizontal: 10,
              paddingRight: 60,
              color: 'black'
            }}
            placeholder="  enter your password"
            placeholderTextColor="gray"
            secureTextEntry={isSecureEntry}
            value={password}
            onChangeText={text => setPassword(text)}></TextInput>

          <TouchableOpacity
            style={{
             alignContent:'flex-end',
             justifyContent:'flex-end',
             alignItems:'flex-end',
             marginTop: -45, //-45
             position:'relative'
            }}
            onPress={() => {
              setIsSecureEntry(prev => !prev);
            }}>
            <Text style={{color: 'black', width: 30, position: 'relative'}}>
              {isSecureEntry ? (
                <Icon name="eye-slash" size={20} />
              ) : (
                <Icon name="eye" size={20} />
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 235,
              padding: 2,
              //height: 35,
              flexDirection: 'row',
              marginTop: 40,
              marginBottom: 15,
              backgroundColor: '#FF8080',
              justifyContent: 'center',
              borderRadius: 25,
              alignSelf: 'center',
            }}
            onPress={signin}>
            <Text
              style={{
                alignContent:'center',
                justifyContent:'center',
                fontFamily: 'Poppins-Medium',
                color: 'white',
                fontSize: hp(2.5),
              }}>
              Login
            </Text>
          </TouchableOpacity>


            <TouchableOpacity style={{alignSelf: 'center', marginBottom: 10}} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text
                style={{color: 'gray', fontSize: hp(2)}}>
                Forgot Password?{' '}
              </Text>
            </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    marginTop: -18,
    marginLeft: win.width / 16,
    marginBottom: 15,
    fontSize: hp('4.1%'),
    fontFamily: 'Cambay-Bold',
    color: '#ab0e0e',
    textShadowColor: 'white',
    textShadowOffset: {
      width: 3,
      height: 1,
    },
    textShadowRadius: 20,
    position: 'absolute',
  },

  unameText: {
    marginTop: 50,
    borderColor: 'black',
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-SemiBold',
    position: 'absolute',
  },

  uname: {
    marginTop: 70,
    marginLeft: -5,
    borderBottomWidth: 0.7,
    width: 295,
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    position: 'absolute',
  },

  passText: {
    marginTop: 130,
    borderColor: 'black',
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-SemiBold',
    position: 'absolute',
  },

  pass: {
    marginTop: 145,
    marginLeft: -5,
    borderBottomWidth: 0.7,
    fontSize: 14,
    width: 295,
    padding: 7,
    marginBottom: 10,
    position: 'absolute',
  },

  login: {
    marginTop: 45,
    height: 35,
    width: 290,
    borderRadius: 20,
    backgroundColor: '#ab0e0e',
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 200,
    elevation: 16,
  },

  loginText: {
    color: 'white',
    marginTop: 5,
    fontSize: hp('2.4%'),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    position: 'absolute',
  },

  forgotPasswordText: {
    marginLeft: '-20%',
    marginTop: 24,
    fontSize: hp('1.9%'),
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },

  // avatars: {
  //   marginTop: '72%',
  //   flexDirection: 'row',
  //   alignContent: "space-between",
  //   marginBottom: '0%',
  //   position: 'absolute',
  // },

  iicsboy: {
    marginTop: '-13%',
    height: screenheight / 4,
    width: screenwidth / 2.7,
    resizeMode: 'cover',
    // transform: [{ rotate: '0deg' }],
  },

  akisha: {
    marginTop: '-8.5%',
    marginRight: '-2%',
    height: screenheight / 4.6,
    width: screenwidth / 2.1,
    resizeMode: 'contain',
    // transform: [{ rotate: '0deg' }],
  },

  // loadingBg: {
  //   height: 600,
  //   marginTop: 40, //win.height/1.8,
  //   width: screenwidth,
  //   resizeMode: 'stretch',
  //   opacity: 0.3, //0.7
  //   position: 'absolute',
  // },
});

export default LoginScreen;
