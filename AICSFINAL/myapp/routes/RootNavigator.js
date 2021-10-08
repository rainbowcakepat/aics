import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import {auth} from '../firebase';
import { AuthenticatedUserContext } from '../screens/AuthUserProvider';
import AuthStack from '../routes/AuthStack';
import AdminStackDrawer from '../routes/AdminStackDrawer';
import AdminStack from '../routes/AdminStack';

export default function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
        try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      });
  
      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);

  
    return (
      <NavigationContainer>
        {user ? <AdminStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }