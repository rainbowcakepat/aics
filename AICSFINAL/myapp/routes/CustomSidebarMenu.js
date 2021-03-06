import React from 'react';
import { Dimensions, SafeAreaView, View, StyleSheet,Image, Text, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

const CustomSidebarMenu = (props) => {
  return (

    <SafeAreaView style={styles.sideBarContainer}>
      <View style={styles.sideBarHeader}>
        <Image style={styles.sideMenuProfileIcon} source={require('../assets/iicsLogo.png')} />
        <Text style={styles.sideBarTitle}> University of Santo Tomas College of Information and Computing Sciences</Text>
      </View>
      
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            
            <DrawerItem
              label="Visit Us"
              onPress={() => Linking.openURL('https://aboutreact.com/')}
            />

  
          </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideBarContainer: {
    flex: 1,
    flexDirection: 'column',
    height: Dimensions.get('window').height,
  },

  sideBarHeader: {
    backgroundColor: '#A82712', // #c31432 #E0394D #A82712
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 55,
    height: Dimensions.get('window').height / 3.3,
  },
  
  sideMenuProfileIcon: {
    marginTop: '10%',
    marginBottom: '4%',
    width: '50%',
    height: '50%',
    borderRadius: 15,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  sideBarTitle: {
    marginHorizontal: '2%',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    color: 'white',
    fontSize: hp('1.82%'), // > 500 ? hp('1.82%') : hp('2%'),
  },

  // sideMenuProfileIcon: {
  //   marginTop: 25,
  //   marginBottom: 20,
  //   width: 100,
  //   height: 100,
  //   borderRadius: 15,
  //   alignSelf: 'center',
  // },

  // sideBarTitle: {
  //   paddingBottom: 37, //20
  //   fontFamily: 'Roboto-Medium',
  //   alignSelf: 'center',
  //   color: 'white',
  //   fontSize: 14,
  // },

  // iconStyle: {
  //   width: 15,
  //   height: 15,
  //   marginHorizontal: 5,
  // },

});

export default CustomSidebarMenu;
