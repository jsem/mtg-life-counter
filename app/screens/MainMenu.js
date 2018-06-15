import React, { Component } from 'react';
import { View } from 'react-native';

import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';

import { globalStyles } from '../config/styles';
import { MenuContent, MenuHeader, MenuItem } from '../components/index';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
class MainMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numberPlayers: this.props.game.numberPlayers,
			startingLife: this.props.game.startingLife
		}
	}
	/**
	 * Renders the profile selector buttons based on the number of players selected
	 */
	renderProfileButtons() {

	}

	componentDidMount() {
		Orientation.lockToPortrait();
	}

	render() {
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

export default MainMenu = connect(
	state => ({
		game: state.game,
		profiles: state.profile
	}),
	dispatch => ({
		startGame: (startingLife, numberPlayers, timestamp) => {dispatch(startGame(startingLife, numberPlayers, timestamp))}
	})
)(MainMenu)