import React, {useState} from 'react';
import * as Progress from 'react-native-progress';

import { FlatList, Dimensions, ScrollView, Image, StatusBar, StyleSheet, Text, View,} from 'react-native';
import { SafeAreaView, Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';

const win = Dimensions.get('window');


const LoadingScreen = ({navigation}) => {
  return (
    
  <View style={globalStyles.wholePageContainer} >
  
  
     <Image  style={styles.loadingBg} source={require('../assets/loadingBg.png')}/>
     
     <View style={styles.progressContainer}></View>
     <Progress.Bar style={styles.progress} borderColor='white' color='maroon' borderRadius={20}  indeterminate={true} indeterminateAnimationDuration={1500} progress={0.9} height={13} width={240} />
    <Text  style={styles.progressText}>Waiting for Sylvia Bot to gather questions...</Text>
   
    

  </View>

  );
};

const styles = StyleSheet.create({

    progress: {
       marginTop: 347,
       alignSelf: 'center',
       position: 'absolute',
    },

    progressContainer: {
      marginTop: 340,
      alignSelf: 'center',
      position: 'absolute',
      width: 270,
      height: 30,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: 'white',
    },

    progressText:{
      fontSize: 14,
      marginTop: 382,
      alignSelf: 'center',
      position: 'absolute',
      fontFamily: 'Poppins-Medium',
      textShadowColor: 'black', 
      textShadowOffset: { width: 0.1, height: 0.2 }, 
      textShadowRadius: 0.1,

    },

    loadingBg: {
      marginTop: -1,
      height: win.height,
      width: win.width,
      resizeMode: 'cover',
    },

});

export default LoadingScreen;
