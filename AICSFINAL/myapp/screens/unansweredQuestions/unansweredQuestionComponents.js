import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/FontAwesome5';

function UnansweredQuestionComponent(props){
    return (
        // style={{backgroundColor: 'yellow',}}
            <View>
                <View style={{alignContent: 'space-around'}}>
                    {/* <Text>{props.propsnum}</Text>
                    <Text>{props.propsid}</Text> */}
                    <Text numberOfLines={2} style={{fontFamily: 'Poppins-Medium', fontSize: hp(2.65), marginBottom: 5,}}>{props.propsqsn}</Text>
                    <View style={{flexDirection:'row',}}>
                        <Icon name="clock" color="gray" size={18} style={{ marginBottom: 5 }}/>
                        <Text style={{fontFamily: 'Lato-Regular', color: 'gray', fontSize: hp(1.8), marginBottom: 10, marginTop: 1}}>  {(props.propstime.toDate().toLocaleString())}</Text>
                    </View>
                    
                </View>

                
            </View>

    )
    
}

export default UnansweredQuestionComponent;