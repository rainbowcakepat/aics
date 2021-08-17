import React, {useState} from 'react';
import { TextInput, TouchableHighlight, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

import {globalStyles} from '../styles/global';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const win = Dimensions.get('window');

const Login = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
        
          <LinearGradient style={globalStyles.pageHeaderContainer} colors= {['#363636', '#232526', '#1F1C18']}>
          
          <View style={globalStyles.pageHeaderElements}>
            <Image  style={globalStyles.ust} source={require('../assets/ust.png')}/>
            <Image  style={globalStyles.ustiics} source={require('../assets/ustiics.png')}/>  
          </View>

          <View style={globalStyles.pageHeaderTexts}>
            <Text style={globalStyles.ustText}>University of Santo Tomas</Text>
            <Text style={globalStyles.ustiicsText}>College of Information and Computing Sciences</Text>
          </View>

        </LinearGradient>

        <LinearGradient style={globalStyles.pageBodyContainer} colors= {['white', 'white','white', 'maroon']}>
          
          <Image  style={globalStyles.loadingBg} source={require('../assets/loginbg.png')}/>
            
          <View style={globalStyles.credentialsBg}></View>
            <View style={globalStyles.credentials}>
                    <Text style={styles.welcome}>Welcome, Admin!</Text>
                    <Text style={styles.unameText}>Username:</Text>
                    <TextInput style={styles.uname} placeholder='Enter your username' type='email'></TextInput>
                    <Text style={styles.passText}>Password:</Text>
                    <TextInput style={styles.pass} placeholder='Enter your password' secureTextEntry></TextInput>
                    <TouchableOpacity style={styles.login}>
                      <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
            </View>

            {/* <View style={styles.avatars}>
              <Image  style={styles.iicsboy} source={require('../assets/iicsboy.png')}/>
              <Image  style={styles.akisha} source={require('../assets/akisha.png')}/>
            </View> */}


         {/* <View style={styles.iconsContainer}>
          <Image  style={styles.iicsboy} source={require('../assets/iicsboy.png')}/>
   
            <Image  style={styles.akisha} source={require('../assets/akisha.png')}/>
          
          </View> */}

          </LinearGradient>
       
      </View>

  );
};

const styles = StyleSheet.create({

  
  welcome: {
    marginTop: -18,
    marginLeft: win.width/16,
    marginBottom: 15,
    fontSize: hp('4.1%'),
    fontFamily: 'Cambay-Bold',
    color: '#ab0e0e',
    textShadowColor: "white",
    textShadowOffset: {
    width: 3,
    height: 1,
    },
    textShadowRadius: 20,
    position: 'absolute',
  },

  unameText:{
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
    marginTop: 215,
    height: 35,
    width: 290,
    borderRadius: 20,
    backgroundColor: '#ab0e0e',
    shadowColor: "black",
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

  iicsboy:{
    marginTop: '-13%',
    height: screenheight / 4,
    width: screenwidth / 2.7,
    resizeMode: 'cover',
    // transform: [{ rotate: '0deg' }],
  },

  akisha:{
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

export default Login;