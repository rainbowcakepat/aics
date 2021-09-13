import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push();
    }

return (

    <View>
        { pageNumbers.map(num => (
            <View key={num} >
                <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => paginate(num)}>
                    <Text>{num}</Text>
                </TouchableOpacity>
            </View>
            ))
        }
    </View>
)

}

export default Pagination;