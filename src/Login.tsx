import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';

export interface IUser {
	username: string;
}

interface IProps {
	onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;
// Assuming `authenticateUser` is a function that communicates with a backend service.
// Since this is a mockup, the actual implementation of this function isn't shown here.
// It should use HTTPS and receive an authentication token upon successful authentication.

export default function Login(props: TProps) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	function login() {
		// Placeholder for authentication logic
		// Here you would call your backend authentication service
		// For demonstration, assume authentication is successful if username and password are filled
		if (username && password) {
			props.onLogin({ username });
		} else {
			Alert.alert('Error', 'Username or password is invalid.');
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.username}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.password}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				secureTextEntry={true}
				autoCapitalize="none"
			/>
			<Button title="Login" onPress={login} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	username: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	password: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	}
});
