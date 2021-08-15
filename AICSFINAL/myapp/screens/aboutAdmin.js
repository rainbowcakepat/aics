import React, {useState} from 'react';
import { FlatList, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import { SafeAreaView, Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';
import Icon from 'react-native-vector-icons/Feather';

const win = Dimensions.get('screen');


const AboutUsAdmin = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState("History");
  return (
    
  <View style={globalStyles.wholePageContainer} >

    <LinearGradient style={styles.lgAnnouncement} colors= {['#A82712', '#c31432']}>
      
    <View style={globalStyles.pageContainer}>
    <LinearGradient style={globalStyles.pageHeaderContainer} colors= {['#232526', '#232526']}>

        <View>
          <Image source={require('../assets/aics.png')} style ={globalStyles.aicsLogo} />
        </View>
          
          <View style={styles.menuBarContainer} ></View>
          <Icon name="menu" color="#900" type= 'ionicons' style={globalStyles.menuBar} size={22} onPress={() => navigation.toggleDrawer()}/>
      
      <View style={globalStyles.textHeaderContainer}>
        <Text style={globalStyles.textTitle}>About Us</Text>
        <Text style={globalStyles.textSubtitle}>This section allows you to add, edit, post and view {'\n'}official UST-CICS Information</Text>
      </View >

      </LinearGradient>

      <View style={styles.allAnnouncementContainer}>
          
       
      <View style={styles.announcementSort}>
            <Picker selectedValue={selectedValue}  dropdownIconColor= 'white' onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} style={styles.sortTexts}>
            
              <Picker.Item label="Logo" value='Logo'/>
              <Picker.Item label="History" value='History'/>
              <Picker.Item label="Mission" value='Mission'/>
              <Picker.Item label="Vision" value='Vision'/>
             
              <Picker.Item label="Academic Officials" value='Academic_Officials'/>
              <Picker.Item label="Contact Details" value='Contact_Details'/>
            </Picker>
      </View>
      
      
      <ScrollView style={styles.announcementScrollContainer}>
            
            <Card style = {styles.cards1}>

              <View style = {styles.cardsText}>
                <Text style = {styles.cardTitle}>The UST-CICS History</Text>
                <Text style = {styles.cardSubtitle}>2014</Text>
                <Text style={styles.cardContent}>The Institute of Information and Computing Sciences was formally established in 2014 with its separation as an independent academic unit from the Faculty of Engineering.</Text> 
              </View>

              <Icon name="edit-2" color="#900" size={20} style = {styles.edit}/>
              <Icon name="archive" color="#900" size={20} style = {styles.archive}/>
    
            </Card>

        <StatusBar style= 'auto'></StatusBar>
      </ScrollView>

      </View>

      
    </View>

    
    </LinearGradient>
  </View>

  );
};

const styles = StyleSheet.create({

menuBarContainer: {
        marginLeft: 10, 
        flex: 1,
        marginTop: 13,
        borderRadius: 10, //3
        backgroundColor: 'white', //#ff6e7f
        opacity: 0.14,
        width: 45,
        height: 38, //38
        position: 'absolute', 
      },

  plusIconContainer:{
    marginLeft: 365, 
    marginTop: 100, //95
    flex: 1,
    borderRadius: 12, //3
    backgroundColor: 'white', // #808080 #ff6e7f
    borderBottomColor: 'black',
    borderBottomWidth: 4,
    opacity: 1,
    width: 62,
    height: 70, //38
    position: 'absolute', 
  },

  plusIcon: {
    marginLeft: 376, 
    marginTop: 118,
    position: 'absolute', 
    color: 'black',
  },

  edit: {
    marginLeft: 272,
    marginTop: 8,
    color: 'black',
  },

  archive: {
    marginLeft: 310,
    marginTop: -20,
    color: 'black',

  },

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
    backgroundColor: '#A82712', // #181818-> final #c31432 '#8E0E00' #A82712
    position: 'relative',
  },

   sortTexts: { 
    marginRight: 50,
    marginLeft: 50,
    marginTop: -13,
    color: 'white',

   },

   announcementScrollContainer: {
    width: win.width,
    height: win.height,
    paddingTop: 17,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    },

    
   cards1: {
    borderLeftColor: '#232526', //#8E0E00 #232526
    marginBottom: 10,
    borderRadius: 20, //10
    borderLeftWidth: 20, //20
    backgroundColor: '#E5E5E5', //'#E5E5E5'
    shadowColor: '#470000', //#470000
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 25,
    elevation: 4,
    height: win.height,
    width: 365,
  },

  cardsText: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 13,
  },

  cardTitle: {
    fontSize: 26,
    marginBottom: 4, //-2
    color: 'black',
    position: 'relative',
    fontFamily: 'Roboto', //Poppins-Regular
  },

  cardSubtitle: {
    fontSize: 13,
    marginBottom: 7,
    color: '#808080', //#303030 #404040
    fontFamily: 'Roboto-Regular',
    position: 'relative',
  },

  cardContent: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular', //Poppins-Regular
    letterSpacing: 0.7,
    lineHeight: 16,
    color: '#404040', //#303030
    width: 300, 
    height: 405,  
  },
 
});

export default AboutUsAdmin;
