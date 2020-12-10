import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'


const LikePost = props => {
    const {likes} = props
    return(
        
            <View style={style.line}>
                <Image style={style.avatar} source={{uri: likes.avatar}} />
                <Text style={style.lineText} key={likes.id}>
                    {likes.name}
                </Text>
            </View>
    
    )

}

const style = StyleSheet.create({
        line: {
            height:60,
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
            alignItems: 'center',
            flexDirection: 'row'
        },
        avatar: {
            aspectRatio: 1,
            marginLeft: 10,
            flex: 1,
            borderRadius: 50
        },
        lineText: {
            fontSize: 20,
            paddingLeft: 20,
            flex: 7
        }
    }
)
export default LikePost













