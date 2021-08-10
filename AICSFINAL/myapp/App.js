import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import CustomSidebarMenu from './routes/CustomSidebarMenu';

//SCREENS
import Home from './screens/homeScreen';
import HowToUse from './screens/howToUse';
import AnnouncementPageStudent from './screens/announcementStudent';
import AnnouncementPageAdmin from './screens/announcementAdmin';

const Drawer = createDrawerNavigator();

export default function App() {
  
  return(
    <NavigationContainer >
      <Drawer.Navigator
      screenOptions={{  
      drawerStyle: { activeBackgroundColor: '#53115B', activeTintColor: '#53115B', backgroundColor: 'white', width: 290, borderTopRightRadius: 40, borderBottomRightRadius: 40, }}}
      drawerContent = {(props) => <CustomSidebarMenu {...props}/>}>

      <Drawer.Screen name="Home" component= {AnnouncementPageStudent} component= {Home} 
          options={{ drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>

        <Drawer.Screen name="Announcement Page_S" component= {AnnouncementPageStudent} 
          options={{headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="bullhorn" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>

<Drawer.Screen name="Announcement Page_AA" component= {AnnouncementPageAdmin} 
          options={{headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="bullhorn" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>

        <Drawer.Screen name="Chatbot Interface" component= {HowToUse} 
          options={{ drawerIcon: ({focused, size}) => (
          <Icon name="comments" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
        
       
        <Drawer.Screen name="Unanswered Questions" component= {HowToUse} 
          options={{ drawerIcon: ({focused, size}) => (
            <Icon name="list-ul" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
        
        <Drawer.Screen name="Response List" component= {HowToUse} 
          options={{ drawerIcon: ({focused, size}) => (
            <Icon name="list-ol" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
      
        <Drawer.Screen name="About Us" component= {HowToUse}
            options={{ drawerIcon: ({focused, size}) => (
              <Icon name="info-circle" size={size} color={focused ? '#E0394D' : '#ccc'} />) }}/>
          
      </Drawer.Navigator>

    </NavigationContainer>
    
  );
}

