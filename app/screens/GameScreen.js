import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import { globalStyles } from '../config/styles';

/**
 * Game screen. Displays player areas for each player and a central menu
 */
class GameScreen extends Component {
	render () {
		return (
			<View style={globalStyles.containerScreenVertical}>
			</View>
		);
	}
}

export default GameScreen = connect(
	state => ({
		game: state.game,
		players: state.player
	}),
	dispatch => ({
		
	})
)(GameScreen)