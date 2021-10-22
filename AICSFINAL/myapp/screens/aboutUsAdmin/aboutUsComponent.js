import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToFonts as wf,
    heightPercentageToFonts as hf,
  } from "react-native-responsive-screen-font";

function AboutUsComponents(props){
    return (
        // style={{backgroundColor: 'yellow',}}
            <View>
                <View style={{alignContent: 'space-around',}}>
                   
                    {/* <Text style={{fontFamily: 'Poppins-Medium', fontSize: hp(2.65), marginBottom: 5,}}>{props.propstitle}</Text> */}
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: wf(5), marginBottom: 5,}}>{props.propstitle}</Text>
                    <View style={{flexDirection:'row',}}>
                        <Icon name="bookmark" color="gray" size={18} style={{ marginBottom: 5 }}/>
                        {/* <Text numberOfLines={2}  style={{paddingLeft: 2,fontFamily: 'Lato-Regular',  color: 'gray', fontSize: hp(1.8), marginBottom: 3, marginTop: 1}}> {props.propskeywords}</Text> */}
                        <Text numberOfLines={2}  style={{paddingLeft: 2,fontFamily: 'Lato-Regular',  color: 'gray', fontSize: wf(3.5), marginBottom: 3, marginTop: 1, paddingHorizontal: 10,}}> {props.propskeywords}</Text>

                    </View>
                    
                    <Text>{props.propscontent}</Text>

                </View>

                
            </View>

    )
    
}

export default AboutUsComponents;