import { Dimensions, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;


export const globalStyles = StyleSheet.create({
    wholePageContainer: {
      height: '100%', // 70% of height device screen
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      padding: '0%',
    }, 
    
  pageHeaderContainer: {
    width: screenwidth,
    height:screenheight / 2.8,
    justifyContent: "space-evenly",
    paddingBottom: '5%',
    backgroundColor: 'black',
    
  },

  pageHeaderElements:{
    flexDirection: 'row',
    alignContent: "center", 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: '-5%',
    //backgroundColor: 'black',
    
  },

  ust: {
    width: screenwidth/4.5,
    height: screenheight/6,
    marginHorizontal: '1%',
    resizeMode: 'contain',
  },

  ustiics: {
    width: screenwidth/5,
    height: screenheight/7,
    marginHorizontal: '3%',
    resizeMode: 'contain',
  },

  pageHeaderTexts:{
   flexDirection: 'column',
   alignItems: 'center',
  },

  ustText:{
    fontSize: hp('2.5%'),
    color: 'white',
    fontFamily: 'Cambay-Bold',
    marginTop: '-9%',
  },

  ustiicsText:{
    fontSize: hp('2.22%'),
    color: 'white',
    fontFamily: 'Cambay-Bold',
  },

  pageBodyContainer: { //white eto na bg
    marginTop: '-10%', //53
    height: Dimensions.get('window').height > 685 ? '71%' : '70.5%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection:'column',
    
  },

  ustBg: {
    height: '100%',
    width: '100%',
    alignContent: "center", 
    alignItems: "center", 
    opacity: 0.3,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  
  credentials: {
    marginTop: win.height/12,
    marginLeft: win.width/7,
    flexDirection: 'column',
  },

  credentialsBg: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    width: 340,
    height: 275,
    opacity: 0.5,
    padding: 25,
    marginTop: 30,
    marginLeft: win.width/7,
    alignSelf: 'center',
    position: 'absolute',
  },
  loadingBg: { //UST MAIN BLDG WITH AVATAR
    height: Dimensions.get('window').height > 685 ? 550 : 470, //475, //550
    width: screenwidth,
    resizeMode: 'stretch',
    alignContent: "center", 
    alignItems: "center", 
    opacity: 1, //0.7
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },





/*

    
    pageContainer: {
      height: hp('100%'), // 70% of height device screen
      width: wp('100%'),
      backgroundColor: '#8e0000',
      borderTopRightRadius: 220,
    },
    
      pageHeaderContainer:{
        height: '39%', //win.height
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
     */
})