import React, {useState} from 'react';
import { TextInput, TouchableHighlight, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

import {globalStyles} from '../styles/global';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const win = Dimensions.get('window');

const ForgotPass = ({navigation}) => {
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
                    <Text style={styles.forgotpass}>Forgot Password</Text>
                    <Text style={styles.email}>Email address:</Text>
                    <TextInput style={styles.email1} placeholder='Enter your registered email' type='email'></TextInput>
                    <TouchableOpacity style={styles.submit}>
                      <Text style={styles.submitText} onPress={() => navigation.navigate('CodeVerification')}>Submit</Text>
                    </TouchableOpacity>
                      <Text style={styles.reminder}>check ur email lalabas once clinick submit</Text>
            </View>

           
          </LinearGradient>
       
      </View>

  );
};

const styles = StyleSheet.create({

  forgotpass: {
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

  email:{
    marginTop: 50,
    borderColor: 'black',
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-SemiBold',
    position: 'absolute',
  },

  email1: {
    marginTop: 70,
    marginLeft: -5,
    borderBottomWidth: 0.7,
    width: 295,
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    position: 'absolute',
    
  },
  
  submit: {
    marginTop: 138,
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

  submitText: {
    color: 'white',
    marginTop: 4,
    fontSize: hp('2.4%'),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',    
    position: 'absolute',
  },

  reminder:{
    marginLeft: '-20%',
    marginTop: 22,
    fontSize: hp('1.9%'),
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },



});

export default ForgotPass;