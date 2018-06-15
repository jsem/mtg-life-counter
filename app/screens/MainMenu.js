import React, { Component } from 'react';
import { View } from 'react-native';

import Orientation from 'react-native-orientation';

import { globalStyles } from '../config/styles';
import { MenuContent, MenuHeader } from '../components/index';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
export default class MainMenu extends Component {
	componentDidMount() {
		Orientation.lockToPortrait();
	}

	render () {
		return (
			<View style={globalStyles.containerScreenVertical}>
				<MenuHeader 
					header="Life Counter"
					iconRight="cog"
					pressRight={() => {this.props.navigation.navigate('ProfileMenu')}}
				/>
				<MenuContent>
				</MenuContent>
			</View>
		);
	}
}