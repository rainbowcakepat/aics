import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';

function AnnouncementComponent(props){
    return (
        // <ScrollView style={{height: 100}}>
            <View>
                <View style={{backgroundColor:'yellow'}}>
                    <Text>{props.propsnum}</Text>
                    <Text>{props.propsid}</Text>
                    <Text>{props.propstitle}</Text>
                    <Text>{props.propsposttime}</Text>
                    <Text>{props.propscontent}</Text>
                    <Text>{props.propsimage}</Text>

                {props.propsimage ? null :
                    <Image source={{uri: props.propsimage ? props.propsimage : null}}  style={{ width: 100, height: 200, resizeMode: 'contain'}}></Image>

                    }


                <View style={{backgroundColor:'black'}}>
                    <Text>Hi</Text>
                </View>

                </View>

                
            </View>
        // </ScrollView>
    )
    
}

export default AnnouncementComponent;