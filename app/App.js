import React, { Component } from 'react';
import { View } from 'react-native';

import KeepAwake from 'react-native-keep-awake';

import { AppNavigator } from './config/routes';
import { globalStyles } from './config/styles';

/**
 * Main app class. Instantiates the navigation stack
 */
export default class App extends Component {
	render() {
		return (
			<View style={globalStyles.containerScreenVertical}>
				<KeepAwake />
				<AppNavigator style={globalStyles.containerScreenVertical}/>
			</View>
		);
	}
}
