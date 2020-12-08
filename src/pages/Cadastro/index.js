import React , {useState}from 'react';
import {View,Text, Button, KeyboardAvoidingView, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Loading } from './styles';
import axios from 'axios';


export default function Cadastro(){
    const navigation = useNavigation();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function register() {
        if (loading || !email || !password) return;
        
        setLoading(true);
        
        axios
        .post('https://5fc9688a3c1c220016440c1b.mockapi.io/users', {email,password})
        .then(response => {
          const data = response.data
          console.log(data)
          setLoading(false)
          navigation.push('Login')
        })
        .catch(err => {
          setError(err.message);
          setLoading(true)
        })
      }
    
    return(
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
            <Image
                style={styles.logo}
                source={require('../../../assets/PhotogramLogo.png')}
            />
            </View>

            {loading ?

            <View>
                <Loading />
            </View>
            :     
            <>

            <View>
                {error && (
                    <Text>
                {error}
                    </Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder ="Email"
                    autoCorrect={true}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder ="Senha"
                    autoCorrect={false}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.buttonContainer}>
        
            <TouchableOpacity 
                onPress ={register}
                style={styles.btnSubmit}
        
            > 
            <Text style={styles.submitText}>Cadastrar
            </Text>

            </TouchableOpacity>  

        <Text style={styles.textRegister}>  ────────────────────────────</Text>

        <View style={styles.texto}>

        <Text>Já tem uma conta? </Text>

        <TouchableOpacity onPress ={()=>navigation.push('Login')}> 
            <Text style={styles.login}>Faça login</Text>
        </TouchableOpacity>
        </View>

    </View>
    </>}

        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#f7f7f7',
        alignItems: 'center',
        justifyContent:'center',
    },
    texto:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    login:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#207af7',
        textDecorationLine: 'underline',
    },
    textRegister:{
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#b8bab8',
    },
    
    logo:{
        width:300,
        height:89,
    },
    input:{
        width:300,
        height:50,
        marginTop:5,
        backgroundColor:'#D3D3D3',
        marginBottom:5,
        borderRadius:8,
        padding:11,
        
    },
    buttonContainer:{
        marginTop:8,
        
    },
    btnSubmit:{
        backgroundColor:'#35AAFF',
        width:300,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8
    },
    submitText:{
        color:'#FFF',
        fontSize:18
    }
})