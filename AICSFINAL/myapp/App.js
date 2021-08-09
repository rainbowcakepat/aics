import React from 'react';
import { ImageBackground, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import { SafeAreaView, Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
//import {globalStyles} from './styles/global';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Home from './screens/homeScreen';
import HowToUse from './screens/howToUse';
import AnnouncementPageStudent from './screens/announcementStudent';
const Drawer = createDrawerNavigator();

export default function App() {
  return(
    <NavigationContainer >
    <Drawer.Navigator>
      <Drawer.Screen name="AnnouncementPageStudent" component= {AnnouncementPageStudent} options={{headerShown: false}}/>
      <Drawer.Screen name="Home" component= {Home} />
      <Drawer.Screen name="HowToUse" component= {HowToUse} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

