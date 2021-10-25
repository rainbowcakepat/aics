import { Dimensions, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToFonts as wf,
    heightPercentageToFonts as hf,
  } from "react-native-responsive-screen-font";

  
const win = Dimensions.get('window');

export const announcementStyles = StyleSheet.create({

    //Overall Container: Red
    lgOverallContainer: {
        height: win.height,
        width: win.width,
        flex:1,
        backgroundColor: '#CB0A0D',
    },

    //Top Header: Black
    lgTopHeader: {
        flex: 2, 
        backgroundColor: '#CB0A0D',
    },

    menuBarContainer: {
        height: 35, 
        width: 40, 
        marginTop: 13, 
        marginLeft: 17, 
        opacity: 0.2, 
        borderRadius: 10, 
        backgroundColor: 'black',
        position:'absolute',
    },

    menuBarIcon: {
        marginTop: 16, 
        marginLeft: 17
    },

    titleText: {
        //marginLeft: 15, 
        //marginTop: 30,
        paddingHorizontal:20,
        paddingTop: 20, 
        // fontSize: hp(4.4), //34
        fontSize: hf(4), 
        //marginBottom: -5,
        fontFamily: 'Poppins-Medium',
        color: 'white', 
    },

    subtitleText: {
        paddingHorizontal:25,
        paddingTop: 5, 
        // marginLeft: 20, 
        // marginRight: 35,
        // marginBottom: 3,
        lineHeight: 20,
        // fontSize: hp(1.85),  //14
        fontSize: hf(2), 
        fontFamily: 'Poppins-Italic',
        color: 'white',  
    },

    aicsLogo: {
        width: 70,
        height: 48,
        marginTop: 5,
        marginLeft: 334,
        opacity: 1,
        position: 'absolute',
        resizeMode: 'contain',
        position: 'absolute',
    },

    aicsLogoContainer:{
        zIndex: 100,
        height: 50,
        width: 70,
        marginTop: 2,
        marginLeft: 334,
        position: 'absolute',
    },

    //Body: White

    vBodyContainer:{
        flex: 5.5, 
        marginTop: 0,
        backgroundColor: 'white', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
    },
    
    svBody: {
        marginHorizontal: 30,
        marginTop: 15,
         

    },

    announcementTitleLabel:{
        marginTop: 12,
        marginBottom: 8,
        fontSize: hf(2.2), //18
        color: '#A70B0E',
        fontFamily: 'Poppins-Medium',
    },

    announcementTitleText: {
        paddingLeft: 40,
        paddingRight: 25,
        marginBottom: 15,
        borderLeftWidth: 12,
        borderColor: '#CB0A0D',
        borderRadius: 18,
        fontSize: hf(2), //14
        color: 'black',
        backgroundColor: '#FCF6F6',
        fontFamily: 'Poppins-Medium',
    },

    announcementContentLabel: {
        marginBottom: 8,
        fontSize: hp(2.2), //18
        color: '#A70B0E',
        fontFamily: 'Poppins-Medium',
        // fontFamily: 'Roboto-Medium',
    },



    announcementContentText:{
        paddingLeft: 40,
        paddingRight: 25,
        marginBottom: 20,
        borderLeftWidth: 12,
        borderColor: '#CB0A0D',
        borderRadius: 18,
        fontSize: hp(2), //14
        color: 'black',
        backgroundColor: '#FCF6F6',
        fontFamily: 'Poppins-Medium',
        
    },

    announcementNoImage: {
        fontSize: hf(2.2),  //18
        marginBottom: 20,
        color: '#A70B0E',
        fontFamily: 'Poppins-Medium',
        // fontFamily: 'Roboto-Medium',
    },

    //Buttons:
    btnContainer: {
        flex: 1, 
        backgroundColor: 'white',
    },
    
    toImage :{
        // width: 175,
        // height: 28,
        padding: 5,
        marginTop: 20,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection:'row',
        borderRadius: 50,
        backgroundColor: '#CB0A0D',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    //Image Container:

    imgContainer: {
        //flex: 1,
        backgroundColor: 'white',
        // paddingBottom: 10,
        // paddingTop: 5,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },

    
    //Submit Container:

    submitContainer: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        // paddingHorizontal: 15,
        
    },

    //submit
    submitContainer2: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-around',
      
        // paddingHorizontal: 15,
        
    },

    toSubmit: {
        width: 350, 
        height: 33, 
        marginTop: win.height/25,
        // marginTop: -1,
        borderRadius: 20, 
        alignSelf:'center', 
        backgroundColor:'#CB0A0D', //#FFB0B2
        
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    submitText: {
        color: 'white',
        alignSelf:'center', 
        marginTop: 2, 
        fontSize: hp(2), //18
        letterSpacing: 0.2,
        fontFamily: 'Poppins-Medium',
    },

    cancelText: {
        color: 'black',
        alignSelf:'center', 
        marginTop: 2, 
        fontSize: hp(2), //18
        letterSpacing: 0.2,
        fontFamily: 'Poppins-Medium',
    },


    btnSave: {
        width: 160,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection:'row',
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: '#CB0A0D',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

    },

    btnCancel: {
        width: 160,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection:'row',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#CB0A0D',
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

    },

  




});