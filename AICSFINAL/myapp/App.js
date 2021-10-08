import React, { useState, useEffect } from 'react';
import {LogBox, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import CustomSidebarMenu from './routes/CustomSidebarMenu';

//Home
import Splash from './screens/splash';

//Navigation
import {AuthUserProvider} from './screens/AuthUserProvider';
import RootNavigator from './routes/RootNavigator';


const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();
AsyncStorage.clear();

export default function App() {

  const [loading, isLoading] = useState(true);
  const [home, isHome] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 1000)
    isHome(true);
  }, []);


  if (loading) {
    return <Splash />;
  }
    
  return (
    <AuthUserProvider>
      <RootNavigator />
    </AuthUserProvider>
  );
  // <LoginF navigation={this.props.navigation} />;
}
