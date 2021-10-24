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
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import {globalStyles} from '../styles/global';
import {auth} from '../firebase';
import LoginScreen from './logInScreen';
import ChangePasswordScreen from './changePasswordScreen';
import SignInScreen from './signInScreen';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const win = Dimensions.get('window');

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const handleForgotPassword = async () => {
    try {
      if (email == 'aicschatbot@gmail.com') {
        await auth.sendPasswordResetEmail(email);
        Alert.alert(
          'Forgot Password',
          'Check the code sent to your email to reset your password', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Failed Forgot Password',
          'Invalid email address. Please try again.', // <- this part is optional, you can pass an empty string
          [{text: 'ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},         
        );
      }
      setEmail(null);
    } catch (error) {
      //Alert.alert('Invalid email address');
      Alert.alert(
        'Network Failed',
        'Kindly check your internet connectivity.', // <- this part is optional, you can pass an empty string
        [{text: 'ok', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      setEmail(null);
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
    <View style={{flex: 1, backgroundColor: 'violet'}}>
      <ImageBackground
        style={{flex: 2, backgroundColor: 'red'}}
        source={require('../assets/./bg/annoucementsbg.png')}></ImageBackground>

      <KeyboardAvoidingView behavior='padding'
        style={{
          flex: 2.5,
          backgroundColor: 'white',
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <TouchableWithoutFeedback>
          <Text
            style={{
              backgroundColor: 'black',
              borderRadius: 12,
              marginTop: 20,
              marginLeft: 15,
              borderColor: 'black',
              height: 40,
              width: 195,
              fontSize: hp(2.1),
              textAlign: 'center',
              justifyContent: 'center',
              textAlignVertical: 'center',
              fontFamily: 'Poppins-Medium',
              color: 'white',
            }}>
            {' '}
            Forgot Password{' '}
          </Text>
        </TouchableWithoutFeedback>

        <View style={{margin: 20}}>
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
              color: 'black',
            }}
            placeholder="  enter your email address"
            placeholderTextColor="gray"
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}></TextInput>

          {/* <Text style={{fontFamily: 'Poppins-Regular', fontSize: hp(2.1)}}>
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
            }}
            placeholder="  enter your password"
            placeholderTextColor="gray"
            secureTextEntry={isSecureEntry}
            value={password}
            onChangeText={text => setPassword(text)}></TextInput> */}

          <TouchableOpacity
            style={{
              width: 235,
              height: 35,
              flexDirection: 'row',
              marginTop: 40,
              marginBottom: 20,
              backgroundColor: '#FF8080',
              justifyContent: 'center',
              borderRadius: 25,
              alignSelf: 'center',
            }}
            onPress={handleForgotPassword}>
            <Text
              style={{
                textAlignVertical: 'center',
                fontFamily: 'Poppins-Medium',
                color: 'white',
                fontSize: hp(2.3),
              }}>
              Send Confirmation
            </Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
              <Text
                style={{color: 'gray', fontSize: hp(2)}}
                >
                Go back to Home{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgotPasswordScreen;
