import React, {useState, Component} from 'react';
import * as Progress from 'react-native-progress';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import navigation from '@react-navigation/native';
const win = Dimensions.get('window');

const Splash = ({navigation}) => {
    return (
        <View style={globalStyles.wholePageContainer}>
          <View style={styles.pageBg}>
            <View style={styles.iconsContainer}>
              <Image
                style={styles.akisha}
                source={require('../assets/akisha.png')}
              />
              <Image
                style={styles.iicsboy}
                source={require('../assets/iicsboy.png')}
              />
    
              <View style={styles.progressContainer}></View>
              <Progress.Bar
                style={styles.progress}
                borderColor="white"
                color="maroon"
                borderRadius={20}
                indeterminate={true}
                indeterminateAnimationDuration={1500}
                progress={0.9}
                height={13}
                width={240}
              />
              <Text style={styles.progressText}>
                Waiting for CICS Chatbots to gather questions...
              </Text>
            </View>
          </View>
        </View>
      );
    
}

const styles = StyleSheet.create({
  pageBg: {
    backgroundColor: '#ab0e0e', //#ab0e0e white
    width: win.width,
    height: win.height,
    position: 'absolute',
    resizeMode: 'stretch',
  },

  iconsContainer: {
    marginTop: 65,
  },

  akisha: {
    marginTop: win.height >= 534 ? 210 : 110, //210
    marginLeft: win.height >= 534 ? 210 : 155, //210
    width: 100,
    height: 110,
    shadowColor: 'white',
    shadowRadius: 100,
    shadowOffset: {width: 0.2, height: 0.3},
    position: 'absolute',
  },

  iicsboy: {
    marginTop: win.height >= 534 ? 200 : 100, //200
    marginLeft: win.height >= 534 ? 100 : 55, //100
    width: 110,
    height: 120,
    position: 'absolute',
  },

  textContainer1: {
    alignSelf: 'center',
    marginTop: 65,
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    position: 'absolute',
  },

  textContainer2: {
    alignSelf: 'center',
    marginTop: 90,
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    position: 'absolute',
  },

  progress: {
    marginTop: win.height >= 534 ? 347 : 242.5, //347
    alignSelf: 'center',
    position: 'absolute',
  },

  progressContainer: {
    marginTop: win.height >= 534 ? 340 : 235, //340
    alignSelf: 'center',
    position: 'absolute',
    width: 270,
    height: 30,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    position: 'absolute',
  },

  progressText: {
    fontSize: win.height >= 534 ? 14 : 12, //14
    color: 'white', //black white
    marginTop: win.height >= 534 ? 382 : 275, //382
    alignSelf: 'center',
    position: 'absolute',
    fontFamily: 'Poppins-Medium',
    textShadowColor: 'black',
    textShadowOffset: {width: 0.1, height: 0.2},
    textShadowRadius: 0.1,
    position: 'absolute',
  },

  loadingBg: {
    marginTop: win.height / 1.8, //win.height/1.8,
    width: win.width,
    resizeMode: 'stretch',
    opacity: 0.9, //0.7
    position: 'absolute',
  },
});
/*
const LoadingScreen = ({navigation}) => {
  return (
    <View style={globalStyles.wholePageContainer}>
      <View style={styles.pageBg}>
        <View style={styles.iconsContainer}>
          <Image
            style={styles.akisha}
            source={require('../assets/akisha.png')}
          />
          <Image
            style={styles.iicsboy}
            source={require('../assets/iicsboy.png')}
          />

          {/* <Image  style={styles.loadingBg} source={require('../assets/mainbldg.png')}/> }*/
/*
          <View style={styles.progressContainer}></View>
          <Progress.Bar
            style={styles.progress}
            borderColor="white"
            color="maroon"
            borderRadius={20}
            indeterminate={true}
            indeterminateAnimationDuration={1500}
            progress={0.9}
            height={13}
            width={240}
          />
          <Text style={styles.progressText}>
            Waiting for Sylvia Bot to gather questions...
          </Text>
        </View>
      </View>
    </View>
  );
};
*/

export default Splash;
