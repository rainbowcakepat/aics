import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToFonts as wf,
  heightPercentageToFonts as hf,
} from 'react-native-responsive-screen-font';

const win = Dimensions.get('window');

export const announcementComponentStyles = StyleSheet.create({
  //Overall Container: Red
  lgOverallContainer: {
    height: win.height,
    width: win.width,
    backgroundColor: '#CB0A0D',
  },

  //Top Header: Black
  /*lgTopHeader: {
    backgroundColor: '#CB0A0D',
    flex: 1.3,
  },*/

  lgTopHeader: {
    backgroundColor: '#CB0A0D',
    flex: win.height >= 534 && win.height < 700 ? 1.5 : win.height >= 700 ? 1.3 : 1.8, //1.3
  },

  titleText: {
    marginLeft: 15,
    marginTop: 22,
    // fontSize: hp(4.6), //34
    fontSize: wf(8.2),
    marginBottom: -5,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },

  subtitleText: {
    marginLeft: 20,
    marginRight: 45,
    marginBottom: 3,
    lineHeight: 20,
    // fontSize: hp(1.85),  //14
    fontSize: wf(3.8),
    fontFamily: 'Poppins-Italic',
    color: 'white',
  },
  /*
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

  aicsLogoContainer: {
    zIndex: 100,
    height: 50,
    width: 70,
    marginTop: 2,
    marginLeft: 334,
    position: 'absolute',
  },
*/

  headerIconsMenu: {
    flexDirection: 'row',
    //backgroundColor: 'black',
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 10,

    //marginBottom: 27,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    //paddingHorizontal: 20,
    //alignItems: 'space-around',
    //alignSelf: 'space-around',
  },

  aicsLogo: {
    //backgroundColor: 'yellow',
    width: '20%',
    height: '50%',
    padding: 15,

    resizeMode: 'cover',
    //position: 'relative', //position: 'absolute',
  },

  menuBarIcon: {
    marginTop: 4.8,
  },

  //Search Bar
  vSearchBar: {
    flex: 0.1,
    width: win.width / 1.1, //380
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderRadius: 12,
    marginTop: -40,
    marginBottom: 22,
    backgroundColor: '#EDEDED',
    alignSelf: 'center',
  },
  
  searchBaricon: {
    marginTop: win.height >= 534 ? -2 : -7, //-2
    marginLeft: 10,
    
  },

  tiSearch: {
    paddingTop: win.height >= 534 ? 1 : 0,
    paddingBottom: win.height >= 534 ? 2 : 0,
    marginBottom: win.height >= 534 ? -7 : -8,
    marginLeft: 10,
    paddingRight: 40,
    width: 370,
    color: '#333244',
    fontFamily: 'Poppins-Medium',
    //backgroundColor:'black'
  },
  vAnnouncements: {
    backgroundColor: '#F5F5F5',
    flex: 3,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  addBtn: {
    width: 250,
    height: 32,
    alignSelf: 'center',
    padding: 5,
    marginTop: -8,
    marginBottom: 0,
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: '#CB0A0D',
    borderWidth: 1,
  },

  plusicon: {
    marginLeft: 20,
    color: '#CB0A0D',
  },

  vCardContainer: {
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 25,
    paddingTop: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 18,

    // height: 155,
    borderRadius: 20,
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  // toUpdate:{
  //     width: 150,
  //     height: 30,
  //     flexDirection: 'row',
  //     backgroundColor: '#FF8080',  //#FFC1CE FB6D77
  //     borderRadius: 20,
  //     justifyContent: "center",
  //     alignItems: "center",

  // },

  toUpdate: {
    //width: 150,
    //paddingHorizontal: 32,
    width: '50%',
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#FF8080', //#FFC1CE FB6D77
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  toArchive: {
    width: '48%',
    //width: 150,
    //paddingHorizontal: 32,
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#ACABAB', //#FFC1CE FB6D77
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  // toArchive:{
  //     width: 150,
  //     height: 30,
  //     flexDirection: 'row',
  //     backgroundColor: '#ACABAB',  //#FFC1CE FB6D77
  //     borderRadius: 20,
  //     justifyContent: "center",
  //     alignItems: "center",

  // },

  txtUpdateArchive: {
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },

  txtAdd: {
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#CB0A0D',
  },

  //MODAL
  vModalContainer: {
    height: win.height,
    // backgroundColor: '#FDDFE2'
    backgroundColor: 'white',
    flex: 1,
  },

  toAnnouncement: {
    //EDIT
    width: 210,
    height: 32,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: '#B65858',
    justifyContent: 'center',
    // alignSelf: 'center',

    borderRadius: 15,
    borderColor: 'black',
  },

  txtEdit: {
    fontSize: hp(1.9),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },

  vtxtTitle: {
    flex: 3,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    overflow: 'hidden',
    resizeMode: 'cover',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    //'#F5F5F5'
    // white #F1F1F1 - gray
  },

  txtTitle: {
    padding: 0,
    fontSize: hf(3.26), //3.30
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },

  vtxtContent: {
    flex: 6,
    backgroundColor: '#F5F5F5',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 40,
  },

  txtContent: {
    lineHeight: 23,
    textAlign: 'justify',
    fontSize: hp(2.2),
    color: '#2B2F3B',
    fontFamily: 'Poppins-Regular',
    // backgroundColor: 'white',
  },

  toPhoto: {
    // width: 175,
    // height: 28,
    // marginTop: 10,
    padding: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#CB0000',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  //light white = #F5F5F5
  imageContainer: {
    flex: 1,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
  },

  vSaveCancel: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#F5F5F5',
  },

  btnSave: {
    width: 160,
    //height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#CB0A0D',
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  btnNotSave: {
    width: 160,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'gray',

    shadowColor: '#000',
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
    //height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CB0A0D',
    backgroundColor: 'white',
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  txtSave: {
    fontSize: hp(2.6), //2.3
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },

  txtCancel: {
    fontSize: hp(2.5),
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});
