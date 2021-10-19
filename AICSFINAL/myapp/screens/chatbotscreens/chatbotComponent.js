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
  

function ChatbotComponent(props){
    return (
        // style={{backgroundColor: 'yellow',}}
            <View style={{flexDirection: 'row'}}>
                
                <View>
                    <Image style={{width: 100, height: 105, marginTop: 10}} source= {(props.propsimgpath)} ></Image>
                </View>
                
                <View style={{alignContent: 'space-around', padding: 10}}>                  
                    {/* <Text style={{fontFamily: 'Poppins-Medium', fontSize: hp(2.65), marginBottom: 5,}}>{props.propsname}</Text> */}
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: wf(5), marginBottom: 5,}}>{props.propsname}</Text>

                    <View style={{flexDirection:'row',}}>
                        <Icon name="bookmark" color="gray" size={18} style={{ marginBottom: 5 }}/>
                        {/* <Text style={{fontFamily: 'Lato-Regular', color: 'gray', fontSize: hp(1.8), marginBottom: 10, marginTop: 1, marginRight: 95}}>  {props.propssubtitle}</Text> */}
                        <Text style={{fontFamily: 'Lato-Regular', color: 'gray', fontSize: wf(3.5), marginBottom: 10, marginTop: 1, marginRight: 95}}>  {props.propssubtitle}</Text>

                    </View>

                </View>

                
            </View>

    )
    
}

export default ChatbotComponent;