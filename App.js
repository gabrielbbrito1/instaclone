import React from 'react'
import { StyleSheet, View } from 'react-native'
import Feed from './src/pages/Feed'
import Login from './src/pages/Login'
import Cadastro from './src/pages/Cadastro'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function App() {
	return (
		<View style={style.container}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Login'>
					<Stack.Screen name='Feed' component={Feed} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Cadastro' component={Cadastro} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
