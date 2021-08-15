import React, {useState} from 'react';
import { ImageBackground, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import { SafeAreaView, Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';

const win = Dimensions.get('window');

const ChatbotInterface = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState("Sort Announcements ▼");
  return (
    
  <View style={globalStyles.wholePageContainer} >
  

      {/*<ImageBackground style={styles.reddesign} source={require("./assets/reddesign.png")} /> */} 
       
    <Text>Wala na muna eto</Text>
  

      
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
    backgroundColor: '#181818', // #181818-> final #c31432 '#8E0E00' #A82712
    position: 'relative',
  },

   sortTexts: { 
    marginLeft: 50, //60
    marginRight: 30,
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
    borderRadius: 20,
    borderLeftWidth: 20, //20
    backgroundColor: '#E5E5E5', //'#E5E5E5'
    shadowColor: '#470000', //#470000
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 25,
    elevation: 4,
    height: 135,
    width: 365,
  },

  caret: {
    marginLeft: 310,
    marginTop: 9,
    color: 'black',

  },

  cardsText: {
    marginTop: -26,
    marginRight: 10,
    marginLeft: 13,
  },

  cardTitle: {
    fontSize: 24,
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
    width: 275, 
    height: 52,     
  },
 
});

export default ChatbotInterface;
