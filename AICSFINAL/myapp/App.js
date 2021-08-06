import { Inter_900Black } from '@expo-google-fonts/inter';
import React from 'react';
import { ImageBackground, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import {Picker} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const win = Dimensions.get('window');

const AnnouncementPageStudent = () => {
  return (
   
   <View style={styles.pageContainer}>
      <ImageBackground style={styles.reddesign} source={require("./assets/reddesign.png")} />

      <View style={styles.announcementHeaderContainer}>
        <Text style={styles.announcementTitle}>Announcements</Text>
        <Text style={styles.announcementSubtitle}>This section allows you to view the official College of Information and Computing Sciences Announcements</Text>
      </View >

      <View style={styles.announcementSort}>
        <Picker style={styles.sortTexts}>
          <Picker.Item label="Semestral"/>
          <Picker.Item label="Sort Announcements"/>
        </Picker>
      </View>

      <ScrollView style={styles.announcementContainer}>
        <Card style = {styles.cards1}>
            <Text style = {styles.cardTitle}>IICS Department</Text>
            <Text style = {styles.cardSubtitle}>Posted at 8:00PM</Text>
            <CardContent text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. Ut enim ad minim" style={styles.cardContent}/>
        </Card>
        <StatusBar style="auto" />

      </ScrollView>
   </View>
      
    
   

    
    
    

    


  );
};

const styles = StyleSheet.create({

  pageContainer:{
    backgroundColor: '#D60202',
    width: win.width,
    height: win.height,
    flex: 1,
  },

  reddesign:{
    resizeMode: 'cover',
    marginLeft: -130,
    marginTop: -155,
    height: 400,
    width: 600,
    transform: [{ rotate: '-200deg' }]
   },

   announcementHeaderContainer:{
    marginTop: -150,
    width: 377,
    height: 110,
    marginLeft: 18,
   },

   announcementTitle:{
     color: 'white',
     fontSize: 41,
     letterSpacing: 0.5,
     fontWeight: '500',
     fontWeight: 'bold',
   },

   announcementSubtitle:{
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    color: '#E5E5E5',

   },
 
   announcementSort: {
    width: 350,
    height: 29,
    marginTop: 2,
    alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'black',
   },

   sortTexts: {
    marginLeft: 70,
    marginRight: 50,
    marginTop: -11,
    fontSize: 30,
    color: 'white',
    fontSize: 20,
   },
   
   announcementContainer: {
    width: win.width,
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
    marginBottom: 2,
    shadowColor: '#470000', //#470000
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 25,
    elevation: 4,
    height: 145,
    width: 365,
  },

  cardTitle: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: -2,
    marginRight: 10,
    marginLeft: 13,
    color: 'black',
    position: 'relative',
  },

  cardSubtitle: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 2,
    marginRight: 10,
    marginLeft: 14,
    color: '#484848',
    fontStyle: 'italic',
    position: 'relative',
  },

  cardContent: {
    marginTop: -1,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: -2,
    color: '#303030',
    width: 350,
    
  },
 
});

export default AnnouncementPageStudent;
