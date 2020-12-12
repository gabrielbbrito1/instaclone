import React from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import { onChange } from 'react-native-reanimated'

const LikePost = props => {
    const {likes} = props
    return(

            <View style={style.line}>
                <TouchableOpacity>
                <Text style={style.lineText}> {likes.name}</Text>
                </TouchableOpacity>
                <View style={style.btnEstilo}>
                <TouchableOpacity >
                <Text style={style.btnFollow} > Seguir </Text>
                </TouchableOpacity>
                </View>
            </View>
    
    )
}


const style = StyleSheet.create({
        line: {
            height: 60,
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
            alignItems: 'center',
            flexDirection: 'row',
        },
        lineText: {
            fontSize: 25,
            paddingLeft: 20,
            fontWeight: 'bold',
            fontSize: 13,
            marginTop: 15,
            marginBottom: 10,
            marginRight: 15,
            marginLeft: 5,
            width: 130,
        },
        btnEstilo: {
            backgroundColor: '#1e90ff',
            width: 65,
            height: 35,
            marginTop: 10,
            marginLeft: 160,
            marginRight: 15,
            marginBottom: 5,
            alignItems: 'center',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderLeftColor: '#000000',
            borderRightColor: '#000000',
            borderTopColor: '#000000',
            borderBottomColor: '#000000',
        },
        btnFollow: {
            margin: 5,
            fontWeight: 'bold',
            fontSize: 13
        }
    }
)
export default LikePost











