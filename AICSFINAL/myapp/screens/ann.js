import React, { useState, useEffect } from 'react';
import { FlatList, Text, ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

 
const Announcement = ({navigation}) => {

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchAnnouncements = firestore()
        .collection('allAnnouncements')
        .orderBy('posttime', 'desc')
        .onSnapshot(querySnapshot => {
          const posts = [];

          querySnapshot.forEach(documentSnapshot => {
            posts.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setPosts(posts);
          setLoading(false);
        });

      // Unsubscribe from events when no longer in use
      return () => fetchAnnouncements();
    }, []);
 
  //Display Announcements
  //Display Announcements

  return (
    <View>
      <Text>Announcements here</Text>
        <FlatList 
          style={{backgroundColor: 'yellow'}}
          data= {posts}
          keyExtractor={(item, index) => 'key'+index}
          //showsVerticalScrollIndicator={true}
          renderItem= {({item}) =>  {
          return (
            <View style={{flex: 1, }}>
              <Text style={{color: 'black'}}>Title: {item.titles}</Text>
              <Text>Link: {item.links}</Text>
              <Text>Time: { item.posttime}</Text>
              {/* <Text>Time: {(item.posttime.toDate()).toString()}</Text> */}
              {/* <Text>Time: {new Date(item.posttime).toString()}</Text> */}
            </View>
              );
          }}

        />
        {/* </FlatList> */}

    </View>
  )
}
export default Announcement;