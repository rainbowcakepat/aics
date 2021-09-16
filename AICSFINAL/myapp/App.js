import React from 'react';
import {LogBox, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import CustomSidebarMenu from './routes/CustomSidebarMenu';

//Home
import LoadingScreen2 from './screens/loadingScreen2';
import LoginF from './screens/loginF';

//Chatbots
import AkishaChatbot from './screens/./chatbotscreens/chatbotapp';
import IngridChatbot from './screens/./chatbotscreens/chatbotapp2';
import ChristineChatbot from './screens/./chatbotscreens/chatbotapp3';
import SylviaChatbot from './screens/./chatbotscreens/chatbotapp4';

//Admin Announcements
import AddAnnouncement from './screens/./announcementAdminScreens/addAnnouncement';
import ViewAnnouncementAdmin from './screens/./announcementAdminScreens/announcementAdmin';

//Student Announcements
import ViewAnnouncementStudent from './screens/./announcementStudentScreens/announcementStudent';
import LoadingScreen from './screens/loadingScreen';
import ChangePass from './screens/changePassword';
import HomeScreenF from './screens/homeScreenF';

import AnnouncementPageStudent from './screens/announcementStudent';

const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();
AsyncStorage.clear();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            activeBackgroundColor: '#53115B',
            activeTintColor: '#53115B',
            backgroundColor: 'white',
            width: 290,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          },
        }}
        drawerContent={props => <CustomSidebarMenu {...props} />}>
        
        <Drawer.Screen
          name="Loading Screen"
          component={LoadingScreen2}
          options={{
            headerShown: false,
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
          }}
        />

      <Drawer.Screen
          name="View Announcement_Student"
          component={ViewAnnouncementStudent}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="info-circle"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        /> 

      <Drawer.Screen
          name="View Announcement_Admin"
          component={ViewAnnouncementAdmin}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="info-circle"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />    
        <Drawer.Screen
          name="Add Announcement_Admin"
          component={AddAnnouncement}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="info-circle"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />

        
        <Drawer.Screen
          name="Home"
          component={HomeScreenF}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="LoginF"
          component={LoginF}
          component={LoginF}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="ChangePass"
          component={ChangePass}
          component={ChangePass}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />

     
        <Drawer.Screen
          name="AkishaChatbot"
          component={AkishaChatbot}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />

      <Drawer.Screen
          name="IngridChatbot"
          component={IngridChatbot}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="ChristineChatbot"
          component={ChristineChatbot}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#E0394D' : '#ccc'}
              />
            ),
          }}
        />


        {/* 
<loadingScreen2 navigation={this.props.navigation} />
          <Drawer.Screen name="ForgotPass" component= {ForgotPass} component= {ForgotPass} 
          options={{ headerShown: false, drawerIcon: ({focused, size}) => (
               <Icon name="home" size={size} color={focused ? '#E0394D' : '#ccc'}  />) }}/>
           */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
  <LoginF navigation={this.props.navigation} />;
}
