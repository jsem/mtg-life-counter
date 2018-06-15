import React, { Component } from 'react';
import { View } from 'react-native';

import Orientation from 'react-native-orientation';

import { globalStyles } from '../config/styles';
import { MenuContent, MenuHeader, MenuItem } from '../components/index';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
export default class MainMenu extends Component {
	/**
	 * Renders the profile selector buttons based on the number of players selected
	 */
	renderProfileButtons() {

	}

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
					<MenuItem label="Players"/>
					<MenuItem label="Starting Life"/>
					<MenuItem/>
					<MenuItem label="Profiles"/>
					<MenuItem/>
					<MenuItem/>
					<MenuItem/>
				</MenuContent>
			</View>
		);
	}
}