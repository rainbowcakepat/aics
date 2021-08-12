import React, {useState} from 'react';
import * as Progress from 'react-native-progress';

import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';

const win = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
  
 
<View style={styles.pageBg}>
  <Image  style={styles.aicslogo} source={require('../assets/aicslogo.png')}/>

<View style={styles.buttons}>
  <TouchableOpacity style={styles.askICS}>
    <Text>Ask-ICS Now!</Text>
  </TouchableOpacity>
 
  <TouchableOpacity  style={styles.adminView}>
    <Text>Administrator View</Text>
  </TouchableOpacity>
</View>

  <View style={styles.iconsContainer}>
    <Image  style={styles.akisha} source={require('../assets/akisha.png')}/>
    <Image  style={styles.iicsboy} source={require('../assets/iicsboy.png')}/>

</View>
    </View>
  </View>

  );
};

const styles = StyleSheet.create({

    pageBg: {
        backgroundColor: 'white',
        width: win.width,
        height: win.height,
        position: 'absolute',
        resizeMode: 'stretch',
    },

    aicslogo: {
      marginTop: 165,
      alignSelf: 'center',
      width: 500,
      height: 200,
      resizeMode: 'contain',
      position: 'absolute',
    },

    askICS: {
      backgroundColor: 'red',
      position: 'absolute',
      alignSelf: 'center',
    },

    iconsContainer: {
        marginTop: 65, 
    },

    akisha: {
      marginTop: win.height/1.50,
      marginLeft: 200,
      width: 180,
      height: 185,
      position: 'absolute',
    },

    iicsboy: {
        marginTop: win.height/1.61,
        marginLeft: 10,
        width: 200,
        height: 220,
        position: 'absolute',
    },


    ust: {
        marginTop: -20,
        marginLeft: 135,
        width: 70,
        height: 70,
        resizeMode: 'contain',
        position: 'absolute',
    },

    ustiics: {
        marginTop: -20,
        marginLeft: 210,
        width: 70,
        height: 70,
        resizeMode: 'contain',
        shadowColor: 'white',
        shadowRadius: 100,
        shadowOffset: { width: 0.2, height: 0.3 }, 
        position: 'absolute',
    },

    textContainer1: {
        alignSelf: 'center',
        marginTop: 65,
        color: 'white',
        fontSize: 17,
        fontFamily: 'Poppins-Medium',
        position: 'absolute',
    },

    
    textContainer2: {
        alignSelf: 'center',
        marginTop: 90,
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        position: 'absolute',
    },

    progress: {
       marginTop: 347,
       alignSelf: 'center',
       position: 'absolute',
    },

    progressContainer: {
      marginTop: 340,
      alignSelf: 'center',
      position: 'absolute',
      width: 270,
      height: 30,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: 'white',
      position: 'absolute',
    },

    progressText:{
      fontSize: 14,
      color: 'white',
      marginTop: 382,
      alignSelf: 'center',
      position: 'absolute',
      fontFamily: 'Poppins-Medium',
      textShadowColor: 'black', 
      textShadowOffset: { width: 0.1, height: 0.2 }, 
      textShadowRadius: 0.1,
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

export default HomeScreen;
