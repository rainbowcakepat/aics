import React, {useState} from 'react';
import { TextInput, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';

const win = Dimensions.get('window');

const Login = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
        
      <View style={styles.pageContainer}>
          
        <LinearGradient style={styles.pageHeaderContainer} colors= {['#363636', '#232526', '#1F1C18']}>
          
          <View style={styles.pageHeaderElements}>

            <Image  style={styles.ust} source={require('../assets/ust.png')}/>
            <Image  style={styles.ustiics} source={require('../assets/ustiics.png')}/>  
            <Text style={styles.textContainer1}>University of Santo Tomas</Text>
            <Text style={styles.textContainer2}>College of Information and Computing Sciences</Text>
          
          </View>
        </LinearGradient>

        <LinearGradient style={styles.pageBodyContainer} colors= {['white', 'white','white', 'maroon']}>
          
          <Image  style={styles.ustBg} source={require('../assets/mainbldg.png')}/>
            
          <View style={styles.credentialsBg}></View>
            <View style={styles.credentials}>
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

            

         <View style={styles.iconsContainer}>
         
            {/* <Image  style={styles.aicslogo} source={require('../assets/aicscircle.png')}/> */}
          
            <Image  style={styles.akisha} source={require('../assets/akisha.png')}/>
            <Image  style={styles.iicsboy} source={require('../assets/iicsboy.png')}/>
          
          </View>

          </LinearGradient>

        
          
      </View>

  </View>

  );
};

const styles = StyleSheet.create({

  pageHeaderContainer:{
    height: 282, //win.height
    position: 'relative', 
  }, 
  pageHeaderElements: {
    marginTop: 45,
  },

  pageBodyContainer: {
    marginTop: -65,
    height: win.height/1.2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  ust: {
    marginLeft: 130,
    width: 70,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
  },

ustiics: {
    marginLeft: 210,
    width: 70,
    height: 70,
    resizeMode: 'contain',
    shadowColor: 'white',
    shadowRadius: 100,
    shadowOffset: { width: 0.2, height: 0.3 }, 
    position: 'absolute',
},

  ustBg: {
    opacity: 0.2, //0.3
    width: 460,
    height: 560,
    alignSelf: 'center',
    marginTop: 30,
    position: 'absolute',
    resizeMode: 'stretch',
    borderRadius: 10,
},

  credentials: {
    marginTop: win.height/12,
    marginLeft: win.width/7,
    position: 'absolute',
  },

  credentialsBg: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    width: 340,
    height: 350,
    opacity: 0.5,
    padding: 25,
    marginTop: 30,
    marginLeft: win.width/7,
    alignSelf: 'center',
    position: 'absolute',
  },

  welcome: {
    marginTop: -18,
    marginLeft: win.width/14,
    marginBottom: 15,
    fontSize: 30,
    fontFamily: 'Cambay-Bold',
    color: '#ab0e0e',
    textShadowColor: "white",
    textShadowOffset: {
    width: 2,
    height: 1,
    },
    textShadowRadius: 20,
    position: 'absolute',
  },

  unameText:{
    marginTop: 50,
    borderColor: 'black',
    fontSize: 15,
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
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    position: 'absolute',
  },

  pass: {
    marginTop: 145,
    marginLeft: -5,
    borderBottomWidth: 0.2,
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
    position: 'absolute',
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
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',    
    position: 'absolute',
  },

  forgotPasswordText: {
    marginTop: 267,
    textDecorationLine: 'underline',
    position: 'absolute',
    marginLeft: win.width/5,
  },

  iconsContainer: {
      marginTop: -230, 
  },

  akisha: {
    marginTop: win.height/1.27,
    marginLeft: 250,
    width: 180,
    height: 185,
    transform: [{ rotate: '343deg' }],
    position: 'absolute',
  },

  iicsboy: {
      marginTop: win.height/1.32,
      marginLeft: -15,
      width: 200,
      height: 220,
      transform: [{ rotate: '19deg' }],
      position: 'absolute',
  },

  textContainer1: {
      alignSelf: 'center',
      marginTop: 85,
      color: 'white',
      fontSize: 21,
      fontFamily: 'Cambay-Bold',
      position: 'absolute',
  },

  textContainer2: {
      alignSelf: 'center',
      marginTop: 115,
      color: 'white',
      fontSize: 17,
      fontFamily: 'Cambay-Bold',
      position: 'absolute',
  },

  loadingBg: {
    marginTop: win.height/1.8, //win.height/1.8,
    width: win.width,
    resizeMode: 'stretch',
    opacity: 0.9, //0.7
    position: 'absolute',
  },

});

export default Login;