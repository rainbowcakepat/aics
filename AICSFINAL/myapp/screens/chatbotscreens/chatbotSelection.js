import React, {useState}  from 'react';
import { ImageBackground, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import { SafeAreaView, Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem, Avatar } from 'react-native-elements'
import {globalStyles} from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native';

const win = Dimensions.get('screen');
const DATA = [
  {
    id: 0,
    imgpath: require('../assets/akisha.png'),
    name: 'Akisha Bot',
    subtitle: 'Billings, Enrollment, Application',
    content: 'This bot answers how hatdog kaya mo ba to lol jk wow',
  },
  { 
    id: 1,
    imgpath: require('../assets/ingrid.png'),
    name: 'Ingrid Bot',
    subtitle: 'Shifting and Special cases',
    content: 'Second Item',
  },
  {
    id: 2,
    imgpath: require('../assets/christine.png'),
    name: 'Christine Bot',
    subtitle: 'Year level inquiries',
    content: 'Third Item',
  },
  {
    id: 3,
    imgpath: require('../assets/sylvia.png'),
    name: 'Sylvia Bot',
    subtitle: 'Others',
    content: 'Third Item',
  },

];


const ChatbotInterface = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState("Sort Announcements ▼");
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
          <Icon name="menu" color="#900" type= 'ionicons' style={globalStyles.menuBar} size={22} onPress={() => navigation.toggleDrawer()}/>

         
      <View style={globalStyles.textHeaderContainer}>
        <Text style={globalStyles.textTitle}>CICS Chatbots</Text>
        <Text style={globalStyles.textSubtitle}>This section allows you to ask and inquire your {'\n'}concerns with the help of UST-CICS Friendly Chatbots</Text>
      </View >

      </LinearGradient>

      <View style={styles.allAnnouncementContainer}>
          
       
        <View style={styles.announcementSort}>
              <Picker selectedValue={selectedValue}  dropdownIconColor= 'white' onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} style={styles.sortTexts}>
              <Picker.Item label="Specific Concern 1" value='C1'/>
                <Picker.Item label="Specific Concern 2" value='C2'/>
                <Picker.Item label="Specific Concern 3" value='C3'/>
              </Picker>
        </View>

    <View style={styles.announcementScrollContainer}>
      <FlatList showsVerticalScrollIndicator
        data={DATA}
        renderItem={({item}) => {
          return (
            <ListItem style = {styles.cardsContainer}>
            <ListItem.Content style = {styles.cards1}>
                   <View style = {styles.avatarContainer}></View>   
                   <Avatar style = {styles.avatar} source={item.imgpath} />
                   
                     <View style = {styles.cardsText}>
                       <Text style = {styles.cardTitle}>{item.name}</Text>
                       <Text style = {styles.cardSubtitle}>{item.subtitle}</Text>
                       <Text style={styles.cardContent}>{item.content}</Text> 
                     </View>
                   </ListItem.Content>
                 </ListItem> 
              );
            }}
         />
        </View>


     
      
   
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
    height: win.height/1.59,
    paddingTop: 15,
    paddingRight: 5,
    paddingLeft: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    },

    cardsContainer:{
      backgroundColor: 'black',
      borderRadius:20,
    },

   cards1: {
    marginTop: -10,
    borderLeftColor: '#8E0E00', //#8E0E00 #232526
    marginBottom: -10,
    borderRadius: 25,
    borderLeftWidth: 132, //20
    backgroundColor: '#E5E5E5', //'#E5E5E5'
    shadowColor: '#470000', //#470000
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 25,
    elevation: 4,
    height: 135,
    width: 390,
  },

  caret: {
    marginTop: 2,
    marginLeft: 195,
    color: 'black',
    position: 'absolute', 
  },

  avatarContainer: {
    width: 115, 
    height: 115, 
    marginTop: -50,
    marginLeft: -122,
    position: 'absolute', 
    borderRadius: 100,
    backgroundColor: 'white', 
  },

  avatar: {
    height: 105,
    width: 90,
    alignSelf: 'flex-start',
    marginTop: 110,
    marginLeft: -110,
    position: 'absolute',
   
  },

  cardsText: {
    marginTop: -107,
    marginLeft: 10,
  },

  cardTitle: {
    fontSize: 24,
    marginBottom: 4, //-2
    color: 'black',
    fontFamily: 'Roboto', //Poppins-Regular
    position: 'absolute', 
  },

  cardSubtitle: {
    marginTop: 35,
    fontSize: 14,
    marginBottom: 7,
    color: '#808080', //#303030 #404040
    fontFamily: 'Roboto-Italic',
    position: 'absolute', 
  },

  cardContent: {
    marginTop: 60,
    fontSize: 14,
    fontFamily: 'Poppins-Regular', //Poppins-Regular
    letterSpacing: 0,
    lineHeight: 16,
    color: '#404040', //#303030
    width: 200, 
    height: 45,
    position: 'absolute',     
    
  },
 
});

export default ChatbotInterface;
