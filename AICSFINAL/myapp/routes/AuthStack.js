import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import SignInScreen from '../screens/signInScreen';
import LogInScreen from '../screens/logInScreen';
import UserStackDrawer from '../routes/UserStackDrawer';
import ForgotPasswordScreen from '../screens/forgotPasswordScreen';
import ChangePasswordScreen from '../screens/changePasswordScreen';

//Chatbots
import AkishaChatbot from '../screens/./chatbotscreens/chatbotapp';
import IngridChatbot from '../screens/./chatbotscreens/chatbotapp2';
import ChristineChatbot from '../screens/./chatbotscreens/chatbotapp3';
import SylviaChatbot from '../screens/./chatbotscreens/chatbotapp4';
import SelectChatbot from '../screens/./chatbotscreens/chatbotmenu';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerMode: 'false',
      }}>
    {/* HomeScreen */}
     <Stack.Screen name='SignInScreen' component={SignInScreen} />
     <Stack.Screen name='LogInScreen' component={LogInScreen} />
     <Stack.Screen name='SelectChatbot' component={UserStackDrawer} />
     <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
     <Stack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} />

     <Stack.Screen name='AkishaChatbot' component={AkishaChatbot} />
     <Stack.Screen name='IngridChatbot' component={IngridChatbot} />
     <Stack.Screen name='ChristineChatbot' component={ChristineChatbot} />
     <Stack.Screen name='SylviaChatbot' component={SylviaChatbot} />
    </Stack.Navigator>
  );
}

