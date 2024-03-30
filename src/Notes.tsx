import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './components/Note';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';

export interface INote {
	title: string;
	text: string;
}

interface IProps {}

interface IState {
	notes: INote[];
	newNoteTitle: string;
	newNoteEquation: string;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Notes'> & IProps;

export default class Notes extends React.Component<TProps, IState> {
	constructor(props: Readonly<TProps>) {
		super(props);

		this.state = {
			notes: [],
			newNoteTitle: '',
			newNoteEquation: ''
		};
	}

	public async componentDidMount() {
		const existing = await this.getStoredNotes();
		this.setState({ notes: existing });
	}

	public async componentWillUnmount() {
		await this.storeNotes(this.state.notes);
	}

	private async getStoredNotes(): Promise<INote[]> {
		// Improved secure storage usage
		const suffix = this.props.route.params.user.username; // Removed password from key suffix for security reasons
		const value = await AsyncStorage.getItem('notes-' + suffix);
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return [];
		}
	}

	private async storeNotes(notes: INote[]) {
		// Improved secure storage usage
		const suffix = this.props.route.params.user.username; // Removed password from key suffix for security reasons
		const jsonValue = JSON.stringify(notes);
		await AsyncStorage.setItem('notes-' + suffix, jsonValue);
	}

	private onNoteTitleChange(value: string) {
		this.setState({ newNoteTitle: value });
	}

	private onNoteEquationChange(value: string) {
		this.setState({ newNoteEquation: value });
	}

	private addNote() {
		const note: INote = {
			title: this.state.newNoteTitle,
			text: this.state.newNoteEquation
		};

		if (note.title === '' || note.text === '') {
			Alert.alert('Error', 'Title and equation cannot be empty.');
			return;
		}

		// Ensure that the notes array is properly updated and stored
		this.setState(prevState => ({
			notes: [...prevState.notes, note],
			newNoteTitle: '',
			newNoteEquation: ''
		}), () => this.storeNotes(this.state.notes)); // Update storage after state update
	}

	public render() {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
					<Text style={styles.title}>
						{'Math Notes: ' + this.props.route.params.user.username}
					</Text>
					<TextInput
						style={styles.titleInput}
						value={this.state.newNoteTitle}
						onChangeText={this.onNoteTitleChange}
						placeholder="Enter your title"
					/>
					<TextInput
						style={styles.textInput}
						value={this.state.newNoteEquation}
						onChangeText={this.onNoteEquationChange}
						placeholder="Enter your math equation"
					/>
					<Button title="Add Note" onPress={this.addNote} />

					{this.state.notes.map((note, index) => (
						<Note key={index} title={note.title} text={note.text} />
					))}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	scrollView: {
		backgroundColor: 'white',
		marginHorizontal: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		margin: 20,
	},
	titleInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	notes: {
		marginTop: 15,
	},
});
