import React from 'react';
import { SafeAreaView, View, StyleSheet,Image, Text, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const CustomSidebarMenu = (props) => {
  return (

    <SafeAreaView style={styles.sideBarContainer}>
      {/*Top Large Image */}
      <View style={styles.sideBarHeader}>
        <Image style={styles.sideMenuProfileIcon} source={require('../assets/iicsLogo.png')} />
        <Text style={styles.sideBarTitle}> University of Santo Tomas College of Information and   
        Computing Sciences</Text>
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
  },

  sideMenuProfileIcon: {
    marginTop: 25,
    marginBottom: 20,
   //resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 15,
    alignSelf: 'center',
  },

  sideBarHeader: {
    backgroundColor: '#A82712', // #c31432 #E0394D #A82712
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 55,
  },

  sideBarTitle: {
    paddingBottom: 37, //20
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
  },

  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  drawerContainer:{
   // backgroundColor: 'red',
  },
});

export default CustomSidebarMenu;
