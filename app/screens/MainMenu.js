import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Orientation from 'react-native-orientation';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
export default class MainMenu extends Component {
	componentDidMount() {
		Orientation.lockToPortrait();
	}

	render () {
		return (
			<View style={{flex: 1}}>
				<Text style={{textAlign: "left", color: "black"}}>Basic Bitch Life Counter</Text>
			</View>
		);
	}
}