import React, { useState } from 'react'
import {
	View,
	Text,
	Button,
	KeyboardAvoidingView,
	TextInput,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Loading } from './styles'
import axios from 'axios'
import { color } from 'react-native-reanimated'

export default function Login() {
	const navigation = useNavigation()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function login() {
		if (loading || !email || !password) return

		setLoading(true)

		axios
			.get('https://5fc9688a3c1c220016440c1b.mockapi.io/users')
			.then((response) => {
				const data = response.data
				setLoading(false)
				console.log(data)

				let isLogged = false
				data.forEach((item) => {
					if (item.password === password && item.email === email) {
						isLogged = true
						console.log(data)
						navigation.push('Feed')
					}
				})

				if (!isLogged) setError('Usuário ou Senha Inválidos')
			})
			.catch((err) => {
				setError(err.message)
				setLoading(true)
			})
	}

	return (
		<KeyboardAvoidingView style={styles.background}>
			<View style={styles.containerLogo}>
				<Image
					style={styles.logo}
					source={require('../../../assets/PhotogramLogo.png')}
				/>
			</View>

			<View style={styles.subTitulo}>
				<Text style={styles.textSub}>
					Faça login para ver e compartilhar fotos e vídeos com seus
					amigos
				</Text>
			</View>

			{loading ? (
				<View>
					<Loading />
				</View>
			) : (
				<>
					<View>
						{error.length !== 0 ? (
							<Text style={styles.msgError}>{error}</Text>
						) : null}
						<TextInput
							style={styles.input}
							placeholder='Email'
							autoCorrect={false}
							onChangeText={(text) => setEmail(text)}
						/>

						<TextInput
							style={styles.input}
							placeholder='Senha'
							autoCorrect={false}
							onChangeText={(text) => setPassword(text)}
							secureTextEntry={true}
						/>
					</View>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.btnSubmit}
							onPress={login}>
							<Text style={styles.enterText}>Entrar</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.esqueci}>
						<Text>Esqueceu sua senha? </Text>
						<TouchableOpacity
							onPress={() => navigation.push('Cadastro')}>
							<Text style={styles.forgetPasswordText}>
								Clique aqui
							</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.textRegister}>
						──────────── OU ────────────
					</Text>

					<View style={styles.texto}>
						<Text>Não tem uma conta? </Text>

						<TouchableOpacity
							onPress={() => navigation.push('Cadastro')}>
							<Text style={styles.cadastro}>Cadastre-se</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
		</KeyboardAvoidingView>
	)
}
const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#f7f7f7',
		alignItems: 'center',
		justifyContent: 'center'
	},
	subTitulo: {
		marginBottom: 30,
		alignItems: 'center',
		width: 310,
		height: 30
	},
	textSub: {
		color: '#c2c2c2',
		fontSize: 15,
		fontStyle: 'italic',
		textAlign: 'center'
	},
	logo: {
		width: 300,
		height: 89
	},
	esqueci: {
		marginTop: 15,
		marginBottom: 15,
		flexDirection: 'row'
	},
	texto: {
		marginTop: 10,
		flexDirection: 'row'
	},
	cadastro: {
		color: '#0095F6',
		textDecorationLine: 'underline'
	},
	textRegister: {
		marginTop: 15,
		color: '#b8bab8',
		fontWeight: 'bold'
	},
	EnterText: {
		color: '#f5f5f5',
		fontSize: 18,
		fontWeight: 'bold'
	},
	input: {
		width: 300,
		height: 50,
		marginTop: 5,
		backgroundColor: '#D3D3D3',
		marginBottom: 5,
		borderRadius: 8,
		padding: 11
	},
	buttonContainer: {
		marginTop: 8,
		marginBottom: 2
	},
	btnSubmit: {
		backgroundColor: '#0095F6',
		width: 300,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		color: '#fff'
	},

	msgError: {
		color: 'red'
	},

	forgetPasswordText: {
		color: '#0095F6',
		textDecorationLine: 'underline'
	}
})
