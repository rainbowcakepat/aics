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
import SignInScreen from './signInScreen';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const win = Dimensions.get('window');

const ChangePasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const signin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      Alert.alert(error.message);
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

      <View
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
          Change Password </Text>
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
            }}
            placeholder="  enter your email address"
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
            }}
            placeholder="  enter your current password"
            placeholderTextColor="gray"
            secureTextEntry={isSecureEntry}
            value={password}
            onChangeText={text => setPassword(text)}></TextInput>

          <TouchableOpacity
            style={{
              marginTop: -45, //155
              width: 30,
              height: 30,
              marginLeft: 325, //250
              position: 'relative',
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
              height: 35,
              flexDirection: 'row',
              marginTop: 40,
              marginBottom: 20,
              backgroundColor: '#FF8080',
              justifyContent: 'center',
              borderRadius: 25,
              alignSelf: 'center',
            }}
            onPress={signin}>
            <Text
              style={{
                textAlignVertical: 'center',
                fontFamily: 'Poppins-Medium',
                color: 'white',
                fontSize: hp(2.3),
              }}>
              Senc Confirmation
            </Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row', alignSelf:'center'}}>
            <TouchableOpacity>
              <Text
                style={{color: 'gray', fontSize: hp(2)}}
                onPress={() =>
                  navigation.navigate(SignInScreen)
                }>
                Go back to Home  </Text>
            </TouchableOpacity>

           


          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default ChangePasswordScreen;
