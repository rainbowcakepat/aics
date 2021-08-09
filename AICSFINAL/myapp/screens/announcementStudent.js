import React from 'react';
import { ImageBackground, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import { SafeAreaView, Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {globalStyles} from '../styles/global';

const win = Dimensions.get('window');

const AnnouncementPageStudent = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
  

      {/*<ImageBackground style={styles.reddesign} source={require("./assets/reddesign.png")} /> */} 
    <LinearGradient style={styles.lgAnnouncement} colors= {['#232526', '#232526']}>
      
    <View style={globalStyles.pageContainer}>
    <LinearGradient style={globalStyles.pageHeaderContainer} colors= {['#c31432', '#8e0000']}>

        <View>
          <Image source={require('../assets/aics.png')} style ={globalStyles.aicsLogo} />
        </View>
          
          <View style={globalStyles.menuBarContainer}></View>
          <Icon name="bars" color="#900" type= 'ionicons' style={globalStyles.menuBar} size={22} onPress={() => navigation.toggleDrawer()}/>
  
      
      <View style={globalStyles.textHeaderContainer}>
        <Text style={globalStyles.textTitle}>Announcements</Text>
        <Text style={globalStyles.textSubtitle}>This section allows you to view the official College of Information and Computing Sciences Announcements</Text>
      </View >

      </LinearGradient>

      <View style={styles.allAnnouncementContainer}>
          <View style={styles.announcementSort}>
            <Picker style={styles.sortTexts}>
              <Picker.Item label="Academic Year"/>
              <Picker.Item label="Semesters"/>
              <Picker.Item label="Sort Announcements ▼"/>
            </Picker>
          </View>
          
      
          <ScrollView style={styles.announcementScrollContainer}>
            <Card style = {styles.cards1}>
                <Text style = {styles.cardTitle}>IICS Department</Text>
                <Text style = {styles.cardSubtitle}>Posted at 8:00 PM</Text>
                <Text style={styles.cardContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. Ut enim ad minim</Text> 
            </Card>

            <Card style = {styles.cards1}>
                <Text style = {styles.cardTitle}>IICS Department</Text>
                <Text style = {styles.cardSubtitle}>Posted at 8:00PM</Text>
                <Text style={styles.cardContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. Ut enim ad minim</Text> 
            </Card>

            <Card style = {styles.cards1}>
                <Text style = {styles.cardTitle}>IICS Department</Text>
                <Text style = {styles.cardSubtitle}>Posted at 8:00PM</Text>
                <Text style={styles.cardContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. Ut enim ad minim</Text> 
            </Card>

            <Card style = {styles.cards1}>
                <Text style = {styles.cardTitle}>IICS Department</Text>
                <Text style = {styles.cardSubtitle}>Posted at 8:00PM</Text>
                <Text style={styles.cardContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. Ut enim ad minim</Text> 
            </Card>

            <Card style = {styles.cards1}>
                <Text style = {styles.cardTitle}>IICS Department</Text>
                <Text style = {styles.cardSubtitle}>Posted at 8:00PM</Text>
                <Text style={styles.cardContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. Ut enim ad minim</Text> 
            </Card>


        <StatusBar style="auto" />

      </ScrollView>

      </View>

      
    </View>

    
    </LinearGradient>
  </View>

  );
};

const styles = StyleSheet.create({

   allAnnouncementContainer: { //kasama yung sort
    marginTop: -110,
   },

   announcementSort: {
    width: 320,
    height: 27,
    alignSelf: 'center',
    paddingTop: -20, //-5
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#181818', //#c31432 '#8E0E00' #A82712
   },

   sortTexts: { 
    marginLeft: 60, //60
    marginRight: 0,
    marginTop: -13,
    color: 'white',
   },

   announcementScrollContainer: {
    width: win.width,
    height: win.height,
    paddingTop: 17,
    paddingRight: 20,
    paddingLeft: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
   },

   cards1: {
    borderLeftColor: '#232526', //#8E0E00 #232526
    borderRadius: 10,
    borderLeftWidth: 20, //20
    backgroundColor: '#E5E5E5', //'#E5E5E5'
    marginBottom: 10,
    shadowColor: '#470000', //#470000
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 25,
    elevation: 4,
    height: 150,
    width: 365,
  },

  cardTitle: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 4, //-2
    marginRight: 10,
    marginLeft: 13,
    color: 'black',
    position: 'relative',
    fontFamily: 'Roboto', //Poppins-Regular
  },

  cardSubtitle: {
    fontSize: 13,
    marginBottom: 7,
    marginRight: 10,
    marginLeft: 14, //14
    color: '#808080', //#303030 #404040
    fontFamily: 'Roboto-Regular',
    position: 'relative',
  },

  cardContent: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular', //Poppins-Regular
    letterSpacing: 0.7,
    lineHeight: 16,
    marginTop: -1,
    marginBottom: 18,
    marginRight: 10,
    marginLeft: 14,
    color: '#404040', //#303030
    width: 320,   
  },
 
});

export default AnnouncementPageStudent;
