import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';

function HowToUseStudentComponent(props){
    return (
        // style={{backgroundColor: 'yellow',}}
            <View>
                <View style={{alignContent: 'space-around'}}>
                    {/* <Text>{props.propsnum}</Text>
                    <Text>{props.propsid}</Text> */}
                    {/* <Text style={{fontFamily: 'Poppins-Medium', fontSize: hp(2.65), marginBottom: 5,}}>{props.propstitle}</Text> */}
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: wf(5), marginBottom: 5,}}>{props.propstitle}</Text>

                    <View style={{flexDirection:'row',}}>
                        <Icon name="clock" color="gray" size={18} style={{ marginBottom: 5 }}/>
                        {/* <Text style={{fontFamily: 'Lato-Regular', color: 'gray', fontSize: hp(1.8), marginBottom: 10, marginTop: 1}}>  {props.propskeywords}</Text> */}
                        <Text style={{fontFamily: 'Lato-Regular', color: 'gray', fontSize: wf(3.5), marginBottom: 10, marginTop: 1}}>  {props.propskeywords}</Text>

                    </View>
                    
                    {/* <Text>{props.propscontent}</Text>
                    <Text>{props.propsimage}</Text> */}

                {/* {props.propsimage ? null :
                    <Image source={{uri: props.propsimage ? props.propsimage : null}}  style={{ width: 100, height: 200, resizeMode: 'contain'}}></Image>

                    } */}

                </View>

                
            </View>

    )
    
}

export default HowToUseStudentComponent;
