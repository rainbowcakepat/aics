import React, {useState} from 'react';
import { TextInput, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';

const win = Dimensions.get('screen');

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
                    <TextInput style={styles.uname} placeholder='Email' type='email'></TextInput>
                    <TextInput style={styles.pass} placeholder='Password' secureTextEntry></TextInput>
                    <TextInput style={styles.pass} placeholder='Password' secureTextEntry></TextInput>
                    <TouchableOpacity style={styles.login}>
                      <Text style={styles.loginText}>Login</Text>
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

  aicslogo: {
    marginTop: 260, //277
    alignSelf: 'center',
    width: 120,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
  },

  credentials: {
    marginTop: win.height/11,
    marginLeft: win.width/7,
    position: 'absolute',
  },

  credentialsBg: {
    backgroundColor: 'maroon',
    borderRadius: 20,
    width: 300,
    height: 300,
    opacity: 0.1,
    padding: 25,
    marginTop: 40,
    marginLeft: win.width/7,
    alignSelf: 'center',
    position: 'absolute',
  },

  welcome: {
    marginTop: -5,
    marginLeft: win.width/7,
    marginBottom: 20,
    fontSize: 25,
    fontFamily: 'Cambay-Bold',
    color: 'black',
    position: 'absolute',
  },

  uname: {
    marginTop: 50,
    borderBottomWidth: 0.5,
    width: 295,
    fontSize: 18,
    padding: 5,
    marginBottom: 10,
    position: 'absolute',
    
  },

  pass: {
    marginTop: 100,
    borderBottomWidth: 0.5,
    fontSize: 18,
    width: 295,
    padding: 7,
    marginBottom: 10,
    position: 'absolute',
    
  },
  
  login: {
    marginTop: 185,
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

  iconsContainer: {
      marginTop: -260, 
  },

  akisha: {
    marginTop: win.height/1.36,
    marginLeft: 250,
    width: 180,
    height: 185,
    transform: [{ rotate: '343deg' }],
    position: 'absolute',
  },

  iicsboy: {
      marginTop: win.height/1.42,
      marginLeft: -15,
      width: 200,
      height: 220,
      transform: [{ rotate: '24deg' }],
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