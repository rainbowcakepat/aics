import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {auth} from '../firebase';
import {AuthenticatedUserContext} from '../screens/AuthUserProvider';
import Icon from 'react-native-vector-icons/FontAwesome';

//Side Bar
import CustomSidebarMenu from '../routes/CustomSidebarMenu';
import UserCustomSideMenu from '../routes/UserCustomSideMenu';

//Chatbots
import AkishaChatbot from '../screens/./chatbotscreens/chatbotapp';
import IngridChatbot from '../screens/./chatbotscreens/chatbotapp2';
import ChristineChatbot from '../screens/./chatbotscreens/chatbotapp3';
import SylviaChatbot from '../screens/./chatbotscreens/chatbotapp4';
import SelectChatbot from '../screens/./chatbotscreens/chatbotmenu';

//Routes: Announcement, About Us, Unanswered, Questions Interface, How To Use
import ViewAnnouncementStudent from '../screens/./announcementStudentScreens/announcementStudent';
import ViewAboutUsStudent from '../screens/./aboutUsStudent/aboutStudent';
import AuthStack from './AuthStack';
import HowToUseStudent from '../screens/howToUseStudent/howToUseStudent';

const Drawer = createDrawerNavigator();

export default function UserStackDrawer() {
  return (
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
      drawerContent={props => <UserCustomSideMenu {...props} />}>
      <Drawer.Screen
        name="Ask-ICS Chatbots"
        component={SelectChatbot}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="comments"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Announcements Student"
        component={ViewAnnouncementStudent}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="bullhorn"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="About Us"
        component={ViewAboutUsStudent}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="users"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="How To Use"
        component={HowToUseStudent}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="question-circle"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Go Back to Home Screen"
        component={AuthStack}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="sign-out"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
