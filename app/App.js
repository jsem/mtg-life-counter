import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import KeepAwake from 'react-native-keep-awake';

import { AppNavigator } from './config/routes';

/**
 * Main app class. Instantiates the navigation stack
 */
export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<KeepAwake />
				<AppNavigator style={styles.container}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#F5FCFF',
	}
});
