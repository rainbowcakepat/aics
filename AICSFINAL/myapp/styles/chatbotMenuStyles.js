import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToFonts as wf,
  heightPercentageToFonts as hf,
} from 'react-native-responsive-screen-font';

const win = Dimensions.get('window');

export const chatbotMenuStyles = StyleSheet.create({
  //Overall Container: Red
  lgOverallContainer: {
    height: win.height,
    width: win.width,
    backgroundColor: '#CB0A0D',
  },

  //Top Header: Black
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
    fontSize: wf(3.3), //3.8
    fontFamily: 'Poppins-Italic',
    color: 'white',
  },

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

  vCardContainer: {
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 25,
    paddingTop: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 18,

    // height: 165,
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

  // toUpdate:{ //ASK-ICS
  //     marginTop: -10,
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
    marginLeft: 'auto',
  },

  txtUpdateArchive: {
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});
