import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions, StyleSheet, } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import CustomSidebarMenu from './routes/CustomSidebarMenu';

//SCREENS
// import Home from './screens/homeScreen';
// import HowToUse from './screens/howToUse';
import AnnouncementPageAdmin from './screens/announcementAdmin';
// import ChatbotInterface from './screens/chatbotInterface';
// import ChatbotSelection from './screens/chatbotSelection';
import CodeVerification from './screens/codeVerification';

import LoadingScreen from './screens/loadingScreen';
import LoadingScreen2 from './screens/loadingScreen2';
import LoginF from './screens/loginF';
import ForgotPass from './screens/forgotPass';
import ChangePass from './screens/changePassword';
// import AboutUsAdmin from './screens/aboutAdmin';
import HomeScreen from './screens/homeScreen';
import HomeScreenF from './screens/homeScreenF';
import AnnouncementPageStudent from './screens/announcementStudent';


const Drawer = createDrawerNavigator();

export default function App() {
  
  return(
    <NavigationContainer>
      <Drawer.Navigator
      screenOptions={{  
      drawerStyle: { activeBackgroundColor: '#53115B', activeTintColor: '#53115B', backgroundColor: 'white', width: 290, borderTopRightRadius: 40, borderBottomRightRadius: 40, }}}
      drawerContent = {(props) => <CustomSidebarMenu {...props}/>}>

      <Drawer.Screen name="LoginF" component= {LoginF} component= {LoginF} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>


      <Drawer.Screen name="HomeF" component= {HomeScreenF} component= {HomeScreenF} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>

      <Drawer.Screen name="Announcement Page_S" component= {AnnouncementPageStudent} 
          options={{headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="bullhorn" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>

      <Drawer.Screen name="Loading Screen" component= {LoadingScreen}
            options={{ headerShown: false, drawerIcon: ({focused, size}) => (
              <Icon name="info-circle" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>

      <Drawer.Screen name="Loading Screen 2" component= {LoadingScreen2}
            options={{ headerShown: false, drawerIcon: ({focused, size}) => (
              <Icon name="info-circle" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>

      <Drawer.Screen name="Announcement Page_AA" component= {AnnouncementPageAdmin} 
          options={{headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="bullhorn" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>

      <Drawer.Screen name="ChangePass" component= {ChangePass} component= {ChangePass} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>

      <Drawer.Screen name="ForgotPass" component= {ForgotPass} component= {ForgotPass} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>

      <Drawer.Screen name="CodeVerification" component= {CodeVerification} component= {CodeVerification} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>

      
      {/* 
       <Drawer.Screen name="Home" component= {HomeScreen} component= {HomeScreen} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>

      
  

      
      

       
       
        <Drawer.Screen name="Chatbot Interface" component= {ChatbotInterface} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
          <Icon name="comments" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
        
        <Drawer.Screen name="Chatbot Selection" component= {ChatbotSelection} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
          <Icon name="comments" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
        
       
        <Drawer.Screen name="Unanswered Questions" component= {HowToUse} 
          options={{ drawerIcon: ({focused, size}) => (
            <Icon name="list-ul" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
        
        <Drawer.Screen name="Response List" component= {HowToUse} 
          options={{ drawerIcon: ({focused, size}) => (
            <Icon name="list-ol" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
      
        <Drawer.Screen name="About Us" component= {AboutUsAdmin}
            options={{ headerShown: false, drawerIcon: ({focused, size}) => (
              <Icon name="info-circle" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
           */}
      </Drawer.Navigator>

    </NavigationContainer>
    
  );
}

