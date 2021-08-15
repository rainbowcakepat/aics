import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
    wholePageContainer: {
    
        height: hp('100%'), // 70% of height device screen
        width: wp('100%'),  // 80% of width device screen
        // height: win.height,
        // width: win.width,
        flex: 1,
        padding: 0,
      }, 
    
      pageContainer: {
        height: win.height,
        backgroundColor: '#8e0000',
        borderTopRightRadius: 220,
      },
    
      pageHeaderContainer:{
        height: 300, //win.height
        borderTopRightRadius: 220, //220
        position: 'relative', 
      }, 
      
      aicsLogo: {
        marginTop: -50,
        marginLeft: 330,
        position: 'absolute',
        width: 70,
        height: 155,
        resizeMode: 'contain',
      },
      
      menuBarContainer: {
        marginLeft: 10, 
        flex: 1,
        marginTop: 13,
        borderRadius: 10, //3
        backgroundColor: 'black', //#ff6e7f
        opacity: 0.14,
        width: 45,
        height: 38, //38
        position: 'absolute', 
      },
    
      menuBar: {
        marginLeft: 8,
        marginTop: 10,
        padding: 10,
        paddingLeft: 13,
        color: 'white',
        opacity: 100,
        width: 50,
      },
      
      textHeaderContainer:{
        marginLeft: 12,
        marginTop: 19, //15 65
        marginBottom: 12,
        width: 377, 
        height: 105,
       },
    
       textTitle:{
         color: 'white',
         fontSize: 41, //41
         fontWeight: '500',
         fontFamily: 'Poppins-Medium',
         letterSpacing: -0.8,
       },
    
       textSubtitle:{
        marginTop: -6,
        color: 'white',
        fontSize: 13,
        color: '#E5E5E5',
        width: 400,
        fontFamily: 'Poppins-LightItalic',
        letterSpacing: 0.1,
        lineHeight: 15,
       },
     
})