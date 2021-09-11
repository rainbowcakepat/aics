import { Dimensions, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

export const announcementStyles = StyleSheet.create({

    //Overall Container: Red
    lgOverallContainer: {
        height: win.height,
    },

    //Top Header: Black
    lgTopHeader: {
        flex: 2.65, 
        backgroundColor: 'red',
    },

    menuBarContainer: {
        height: 35, 
        width: 40, 
        marginTop: 13, 
        marginLeft: 14, 
        opacity: 0.2, 
        borderRadius: 10, 
        backgroundColor: 'black',
        position:'absolute',
    },

    menuBarIcon: {
        marginTop: 18, 
        marginLeft: 23
    },

    titleText: {
        marginLeft: 15, 
        marginTop: 26, 
        fontSize: 35, 
        marginBottom: -5,
        fontFamily: 'Poppins-Medium',
        color: 'white', 
    },

    subtitleText: {
        marginLeft: 20, 
        marginRight: 15,
        marginBottom: 3,
        lineHeight: 20,
        fontSize: 13, 
        fontFamily: 'Poppins-Italic',
        color: 'white',  
    },

    aicsLogo: {
        width: 70,
        height: 50,
        marginTop: 2,
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
        marginTop: -40,
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
        fontSize: 20,
        color: '#790404',
        fontFamily: 'Roboto-Medium',
    },

    announcementTitleText: {
        paddingLeft: 40,
        paddingRight: 25,
        marginBottom: 15,
        borderLeftWidth: 20,
        borderColor: '#8B0000',
        borderRadius: 18,
        fontSize: 15,
        color: 'black',
        backgroundColor: '#FFEAEA',
    },

    announcementContentLabel: {
        marginBottom: 8,
        fontSize: 20,
        color: '#790404',
        fontFamily: 'Roboto-Medium',
    },

    announcementContentText:{
        paddingLeft: 40,
        paddingRight: 25,
        marginBottom: 20,
        borderLeftWidth: 20,
        borderColor: '#8B0000',
        borderRadius: 18,
        fontSize: 15,
        color: 'black',
        backgroundColor: '#FFEAEA',

        
    },

    //Buttons:
    btnContainer: {
        flex:0.5, 
        backgroundColor: 'white',
    },
    
    toImage :{
        width: 150,
        marginTop: 5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection:'row',
        borderRadius: 20,
        backgroundColor: '#8B0000',

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
        flex: 0.6, 
        backgroundColor: 'white'
    },

    toSubmit: {
        width: 350, 
        height: 33, 
        marginTop: 3,
        borderRadius: 20, 
        alignSelf:'center', 
        backgroundColor:'#790404',
        
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
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: 'Poppins-Medium',
    },






});