import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import AdminStackDrawer from '../routes/AdminStackDrawer';
import AddAnnouncement from '../screens/./announcementAdminScreens/addAnnouncement';
import AnnouncementAdmin from '../screens/./announcementAdminScreens/announcementAdmin';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerMode: 'false',
      }}>
    {/* HomeScreen */}
     <Stack.Screen name='AnnouncementAdmin' component={AdminStackDrawer} />
     <Stack.Screen name='AddAnnouncement' component={AddAnnouncement} />
     {/* <Stack.Screen name='AnnouncementAdmin' component={AdminStackDrawer} /> */}
     
    </Stack.Navigator>
  );
}

