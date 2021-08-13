import React, {useState} from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';

const win = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
        
      <View style={styles.pageContainer}>
          
        <LinearGradient style={styles.pageHeaderContainer} colors= {['#b31217', '#8e0000']}>
          
          <View style={styles.pageHeaderElements}>

            <Image  style={styles.ust} source={require('../assets/ust.png')}/>
            <Image  style={styles.ustiics} source={require('../assets/ustiics.png')}/>  
            <Text style={styles.textContainer1}>University of Santo Tomas</Text>
            <Text style={styles.textContainer2}>College of Information and Computing Sciences</Text>
          
          </View>
        </LinearGradient>

        <LinearGradient style={styles.pageBodyContainer} colors= {['white', 'white','white', 'maroon']}>
          
         
          <Image  style={styles.ustBg} source={require('../assets/mainbldg.png')}/>

         <View style={styles.iconsContainer}>
         
          <Image  style={styles.aicslogo} source={require('../assets/aicslogo.png')}/>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.askICS}>
              <Text style={styles.askICSText}>Ask-ICS, Now!</Text>
            </TouchableOpacity>
          
            <TouchableOpacity  style={styles.adminView}>
              <Text style={styles.adminViewText}>Administrator View</Text>
            </TouchableOpacity>
          </View>

          
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
    opacity: 0.3, //0.3
    width: 460,
    height: 560,
    alignSelf: 'center',
    marginTop: 30,
    position: 'absolute',
    resizeMode: 'stretch',
    borderRadius: 10,
},

  aicslogo: {
    marginTop: 200,
    alignSelf: 'center',
    width: 300,
    height: 220,
    resizeMode: 'contain',
    position: 'absolute',
    
  },

  buttons: {
    margin: 45,
    marginLeft: win.width/7,
    position: 'absolute',
  
  },
  
  askICS: {
    marginTop: win.height/2.1,
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

  askICSText: {
    color: 'white',
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',    
    position: 'absolute',
  },

  adminView: {
    marginTop: win.height/1.86,
    height: 30,
    width: 290,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ab0e0e',
    backgroundColor: 'white',
    position: 'absolute',
    shadowColor: "black",
    shadowOffset: {
    width: 0,
    height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  adminViewText: {
    color: '#ab0e0e',
    marginTop: 3,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',    
    position: 'absolute',
  },

  iconsContainer: {
      marginTop: -191, 
  },

  akisha: {
    marginTop: win.height/1.39,
    marginLeft: 200,
    width: 180,
    height: 185,
    position: 'absolute',
  },

  iicsboy: {
      marginTop: win.height/1.48,
      marginLeft: 10,
      width: 200,
      height: 220,
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

export default HomeScreen;