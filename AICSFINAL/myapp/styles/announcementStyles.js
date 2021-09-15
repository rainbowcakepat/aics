import { Dimensions, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

export const announcementStyles = StyleSheet.create({

    //Overall Container: Red
    lgOverallContainer: {
        height: win.height,
        width: win.width,
       
    },

    //Top Header: Black
    lgTopHeader: {
        flex: 2.65, 
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
        marginLeft: 15, 
        marginTop: 22, 
        fontSize: hp(4.4), //34
        marginBottom: -5,
        fontFamily: 'Poppins-Medium',
        color: 'white', 
    },

    subtitleText: {
        marginLeft: 20, 
        marginRight: 35,
        marginBottom: 3,
        lineHeight: 20,
        fontSize: hp(1.85),  //14
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
        flex: 4, 
        marginTop: -20,
        backgroundColor: 'white', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
    },
    
    svBody: {
        marginHorizontal: 30,
        marginTop: 25

    },

    announcementTitleLabel:{
        marginBottom: 8,
        fontSize: hp(2.5), //18
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
        fontSize: hp(2), //14
        color: 'black',
        backgroundColor: '#FCF6F6',
        fontFamily: 'Poppins-Medium',
    },

    announcementContentLabel: {
        marginBottom: 8,
        fontSize: hp(2.5), //18
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

    //Buttons:
    btnContainer: {
        flex:0.5, 
        backgroundColor: 'white',
    },
    
    toImage :{
        width: 175,
        height: 28,
        marginTop: 5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection:'row',
        borderRadius: 20,
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
        flex: 2,
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 10,
    },

    svImage: {
        backgroundColor: 'white',
    },

    //Submit Container:

    submitContainer: {
        flex: 1, 
        backgroundColor: 'white'
    },

    toSubmit: {
        width: 350, 
        height: 33, 
        marginTop: -1,
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
        fontSize: hp(2.6), //18
        letterSpacing: 0.5,
        fontFamily: 'Poppins-SemiBold',
    },

  




});