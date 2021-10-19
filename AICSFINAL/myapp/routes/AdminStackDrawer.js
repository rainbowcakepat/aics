import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {auth} from '../firebase';
import {AuthenticatedUserContext} from '../screens/AuthUserProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomSidebarMenu from '../routes/CustomSidebarMenu';

//Routes: Announcement, About Us, Unanswered, Questions Interface, How To Use
import ViewAnnouncementAdmin from '../screens/./announcementAdminScreens/announcementAdmin';
import AddAnnouncement from '../screens/./announcementAdminScreens/addAnnouncement';
import ViewAboutUsAdmin from '../screens/./aboutUsAdmin/aboutAdmin';
import UnansweredQuestions from '../screens/./unansweredQuestions/unansweredQuestions';
import HowToUseAdmin from '../screens/howToUseAdmin/howToUseAdmin';
import QuestionsInterface from '../screens/questionsInterface/questionsInterface';
import SystemLogs from '../screens/systemLogs/systemLogs';
import ChangePassword from '../screens/changePasswordScreen';

const Drawer = createDrawerNavigator();

export default function AdminStackDrawer() {
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
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Announcements"
        component={ViewAnnouncementAdmin}
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
        name="Questions Interface"
        component={QuestionsInterface}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="list-alt"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Unanswered Questions"
        component={UnansweredQuestions}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="list-ul"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={ViewAboutUsAdmin}
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
        component={HowToUseAdmin}
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
        name="System Logs"
        component={SystemLogs}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="history"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

<Drawer.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="lock"
              size={size}
              color={focused ? '#E0394D' : '#ccc'}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}
