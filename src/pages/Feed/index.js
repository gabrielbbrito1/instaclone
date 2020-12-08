import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Button , View, ScrollView, TextInput} from 'react-native';
import axios from 'axios'
import LazyImage from '../../components/LazyImage';
import { AsyncStorage } from 'react-native';


import { Container, Post, Header, Avatar, Name, Description, Loading } from './styles';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');
  const [comentarios, setComentarios] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const MAX_LENGTH = 250;

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) return;
    if (loading) return;

    setLoading(true);

    axios
    .get('https://5fc9688a3c1c220016440c1b.mockapi.io/posts')
    .then( async response => {
      const totalItems = await response.headers["x-total-count"]
      const data = await response.data

      setLoading(false)
      setTotal(Math.floor(totalItems / 10));
      setPage(pageNumber + 1);
      setFeed(shouldRefresh ? data : [...feed, ...data]);
    })
    .catch(err => {
      setError(err.message);
      setLoading(true)
    })
  }

  async function refreshList() {
    setRefreshing(true);
    
    await loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  const onGet = (id) => {
    try {

      const value = AsyncStorage.getItem(id);

      if (value !== null) {
        setComentarios(value)
      } 

    } 
      catch (error) {
      }

  }

  const onSave = async (id) => {
    try {
      await AsyncStorage.setItem(id, text);
      setComentarios([...comentarios, ...text])
    } catch (error) {
    }
  }

    

  useEffect(() => {
    loadPage()
  }, []);


  const renderItem = ({item}) => {
    return (
    <View style={styles.card}>
      <Post key = {item.id}>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage
              aspectRatio={item.aspectRatio} 
              shouldLoad={viewable.includes(item.id)} 
              smallSource={{ uri: item.small }}
              source={{ uri: item.photo }}
            />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
           
            <Button
              title="Curtir"
              onPress={() => onSave(String(item.id))}
              accessibilityLabel="Salvar">
            </Button>

            <View style={styles.campoComents}>

            <Avatar style={styles.imagemComents} source={{ uri: item.author.avatar }} />

               <TextInput
                  multiline={true}
                  onChangeText={(text) => setText(text)}
                  placeholder={" Adicione um comentário"}
                  style={[styles.text]}
                  maxLength={MAX_LENGTH}
                  value={text}/>

            <Button
              style={styles.enviar}
              title="Salvar"
              onPress={() => onSave(String(item.id))}
              accessibilityLabel="Salvar">
            </Button>

            </View>

      </Post>
    </View>   
    )
  }
  
  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={(item, index)=> String(item.id + index)}
        renderItem={renderItem}
        ListFooterComponent={loading && <Loading />}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    fontSize: 15,
    lineHeight: 30,
    color: "#333333",
    borderBottomWidth: 2,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#c9c9c9',
    borderRightColor: '#c9c9c9',
    borderTopColor: '#c9c9c9',
    borderBottomColor: '#c9c9c9',
    marginTop: 5,
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
},
enviar: {
  width: '10%',
  height: '10',
  marginLeft: 5,
  marginTop: 5,
  marginBottom: 5,
  backgroundColor: '#ffffff',
 },
imagemComents:{
 width: 30,
 height: 30,
 marginLeft: 10,
 marginTop: 10,
 marginBottom: 10,
},
card: {
  backgroundColor: '#ffffff',
  marginTop: 20,
  marginHorizontal: 500,
  marginBottom: 8,
  borderBottomWidth: 2,
	borderTopWidth: 1,
	borderRightWidth: 1,
	borderLeftWidth: 1,
	borderLeftColor: '#c9c9c9',
	borderRightColor: '#c9c9c9',
	borderTopColor: '#c9c9c9',
	borderBottomColor: '#c9c9c9'
},
campoComents: {
  flexDirection: 'row'
}

})
