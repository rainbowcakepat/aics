import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ViewAnnouncementAdmin from '../screens/./announcementAdminScreens/announcementAdmin';

const Stack = createStackNavigator();

//HomeScreen -> pag may user eto makikita
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerMode: 'false',
    }}>
      <Stack.Screen name='ViewAnnouncementAdmin' component={ViewAnnouncementAdmin} />
    </Stack.Navigator>
  );
}