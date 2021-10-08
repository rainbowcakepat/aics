import React, {useState} from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { globalStyles } from '../styles/global';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

import SelectChatbot from '../screens/./chatbotscreens/chatbotmenu';
import LogInScreen from '../screens/logInScreen';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
          
        <LinearGradient style={globalStyles.pageHeaderContainer} colors= {['#b31217', '#8e0000']}>
          
          <View style={globalStyles.pageHeaderElements}>
            <Image  style={globalStyles.ust} source={require('../assets/ust.png')}/>
            <Image  style={globalStyles.ustiics} source={require('../assets/ustiics.png')}/>  
          </View>

          <View style={globalStyles.pageHeaderTexts}>
            <Text style={globalStyles.ustText}>University of Santo Tomas</Text>
            <Text style={globalStyles.ustiicsText}>College of Information and Computing Sciences</Text>
          </View>

        </LinearGradient>

        <LinearGradient style={globalStyles.pageBodyContainer} colors= {['white', 'white','white', 'white','white','maroon']}>
          
            <Image  style={globalStyles.ustBg} source={require('../assets/mainbldg.png')}/>

          <View style={styles.elements}>

            <Image  style={styles.aicslogo} source={require('../assets/aicslogo.png')}/>

            <TouchableOpacity style={styles.askICS}>
              <Text style={styles.askICSText}>Ask-ICS, Now!</Text>
            </TouchableOpacity>
          
            <TouchableOpacity  style={styles.adminView}>
              <Text style={styles.adminViewText}>Administrator View</Text>
            </TouchableOpacity>

            <View style={styles.avatars}>
              <Image  style={styles.iicsboy} source={require('../assets/iicsboy.png')}/>
              <Image  style={styles.akisha} source={require('../assets/akisha.png')}/>
            </View>

          </View>
          
          
          
        </LinearGradient> 
          
    </View>

  

  );
};

const styles = StyleSheet.create({

  // pageHeaderContainer: {
  //   width: screenwidth,
  //   height:screenheight / 2.8,
  //   justifyContent: "space-evenly",
  //   paddingBottom: '5%',
  //   backgroundColor: 'black',
  // },

  // pageHeaderElements:{
  //   flexDirection: 'row',
  //   alignContent: "center", 
  //   alignItems: "center", 
  //   justifyContent: "center",
  //   marginTop: '-5%',
  //   //backgroundColor: 'black',
  // },

  // ust: {
  //   width: screenwidth/4.5,
  //   height: screenheight/6,
  //   marginHorizontal: '1%',
  //   resizeMode: 'contain',
  // },

  // ustiics: {
  //   width: screenwidth/5,
  //   height: screenheight/7,
  //   marginHorizontal: '3%',
  //   resizeMode: 'contain',
  // },

  // pageHeaderTexts:{
  //  flexDirection: 'column',
  //  alignItems: 'center',
  // },

  // ustText:{
  //   fontSize: hp('2.5%'),
  //   color: 'white',
  //   fontFamily: 'Cambay-Bold',
  //   marginTop: '-9%',
  // },

  // ustiicsText:{
  //   fontSize: hp('2.22%'),
  //   color: 'white',
  //   fontFamily: 'Cambay-Bold',
  // },

  // pageBodyContainer: { //white eto na bg
  //   marginTop: '-10%', //53
  //   height: '71%',
  //   width: '100%',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   flexDirection:'column',
  // },

  // ustBg: {
  //   height: '100%',
  //   width: '100%',
  //   alignContent: "center", 
  //   alignItems: "center", 
  //   opacity: 0.3,
  //   resizeMode: 'stretch',
  //   position: 'absolute',
  // },
  
  elements: { //lahat ng elements
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    alignItems: "center", 
   // backgroundColor: 'yellow',
  },

  aicslogo: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '7%',
    width: screenwidth/1.5,
    height: screenheight/5,
    //backgroundColor: 'black',
  },

  askICS: {
    marginTop: '3%',
    height: '7.5%',
    width: '75%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#9e0909',
    backgroundColor: '#ab0e0e',
    shadowColor: "black",
    shadowOffset: { width: 3, height: 2,},
    shadowOpacity: 10,
    shadowRadius: 200,
    elevation: 16,
  },

  askICSText: {
    color: 'white',
    padding: '1%',
    fontSize: hp('2.8%'),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',    
  },

  adminView:{
    marginTop: '2%',
    marginBottom: '0%',
    height: '6%',
    width: '75%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ab0e0e',
    backgroundColor: 'white',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 8,},
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  adminViewText: {
    color: '#ab0e0e',
    padding: '1%',
    fontSize: hp('2.2%'),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',    
  },

  avatars: {
    marginTop: '6%',
    flexDirection: 'row',
    alignContent: "center", 
    marginBottom: '0%',
  },

  iicsboy:{
    height: screenheight / 3.3,
    width: screenwidth / 2.5,
 
    // marginTop: '-32%',
    // height: '80%',
    // width: '40%',
    // // width: screenwidth/2.5,
    // // height: screenheight/3.2,
    //backgroundColor: 'black',
    resizeMode: 'cover',
  },

  akisha:{
    marginTop: '6%',
    height: screenheight / 3.6,
    width: screenwidth / 2.1,
  
    // height: '60%',
    
    //height: '85%',
    // width: '45%',
    // width: screenwidth/2.1,
    // height: screenheight/3.6,
    //backgroundColor: 'yellow',
    resizeMode: 'contain',
  },



});

export default HomeScreen;