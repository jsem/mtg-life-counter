import React, { Component } from 'react';
import { View } from 'react-native';

import Orientation from 'react-native-orientation';

import { globalStyles } from '../config/styles';
import { MenuContent, MenuHeader } from '../components/index';

/**
 * Menu listing all profiles. Allows you to add, edit and delete profiles.
 */
export default class ProfileMenu extends Component {
	componentDidMount() {
		Orientation.lockToPortrait();
	}

	render () {
		return (
			<View style={globalStyles.containerScreenVertical}>
				<MenuHeader 
					header="Profiles"
                    iconLeft="chevron-left"
					iconRight="plus"
					pressLeft={() => {this.props.navigation.navigate('MainMenu')}}
				/>
				<MenuContent>
				</MenuContent>
			</View>
		);
	}
}