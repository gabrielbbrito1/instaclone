import React, {useState, useEffect} from 'react'
import {View, StyleSheet, FlatList, SafeAreaView, Text} from 'react-native'
import {Loading} from './styles';
import LikePost from './LikePost';
import axios from 'axios';



    const listaLike = props => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState([]); 
    const post = props.route.params.post;

    async function getLikes() {
        
        setLoading(true);
        axios
        .get(`https://5fc9688a3c1c220016440c1b.mockapi.io/likes`)
        .then(response => {
          const data = response.data.filter((dataItem)=>{
                return dataItem.ID_post === post;
          });

          setLikes(data);

        })
        .catch(err => {
          setError(err.message);
        })
        .finally(()=>{setLoading(false)});
    }
    useEffect(()=>{
        getLikes();
    },[]);

    const renderItem = ({item}) => {
        return (
            <LikePost 
                key={item.id} 
                likes={item}
            />
        )
    }

    const header= () => {
        return (
            <View style={style.headerStyle}>
                <Text style={style.titleStyle}>
                   Lista de Curtidas
                </Text>
            </View>
        )
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <View style={style.container}>
            <SafeAreaView>
                <FlatList
                    data={likes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {item.id + index}}
                    ListHeaderComponent={header}
                    stickyHeaderIndices={[0]}
                />
            </SafeAreaView>
        </View>
    )
}

const style = StyleSheet.create(
    {
        container: {
            backgroundColor: '#fff'
        },
        headerStyle: {
            flex: 1,
            height: 50,
            width: '100%',
            backgroundColor: "#0095F6",
            justifyContent: "center",
            alignItems: 'center'
        },
        titleStyle: {
            color: '#000',
            fontSize: 20
        }
    }
)

export default listaLike;