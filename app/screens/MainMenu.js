import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';

import { startGame } from '../actions/GameAction';
import { createPlayer } from '../actions/PlayerAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';
import { colourDarkGrey, colourLightGrey } from '../config/colours';
import { globalStyles } from '../config/styles';
import { IconButton, Input, MenuContent, MenuHeader, MenuItem, ProfileButton, RadioButton } from '../components/index';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
class MainMenu extends Component {
	constructor(props) {
		super(props);

		var numberPlayers = this.props.game.numberPlayers;
		var profiles = [];
		for (var player = 0; player < numberPlayers; player++) {
			profiles.push(DEFAULT_PROFILE)
		}

		this.state = {
			numberPlayers: numberPlayers,
			startingLife: this.props.game.startingLife,
			profiles: profiles
		}

		
		this.setState

		this.setNumberPlayers = this.setNumberPlayers.bind(this);
		this.setStartingLife = this.setStartingLife.bind(this);
	}

	/**
	 * Sets the number of players
	 * @param {*} numberPlayers the value to set the number of players to
	 */
	setNumberPlayers(numberPlayers) {
		var profiles = this.state.profiles;
		if (numberPlayers < this.state.profiles.length+1) {
			var profiles = this.state.profiles.slice(0, numberPlayers);
			this.setState({profiles: profiles});
		} else if (numberPlayers > this.state.profiles.length+1) {
			var profiles = this.state.profiles;
			for (var player = profiles.length; player < numberPlayers; player++) {
				profiles.push(DEFAULT_PROFILE)
			}
			this.setState({profiles: profiles});
		}
		this.setState({profiles: profiles, numberPlayers: numberPlayers});
	}

	/**
	 * Sets the starting life
	 * @param {*} startingLife the value to set the starting life to
	 */
	setStartingLife(startingLife) {
		let life = startingLife != null && startingLife != "" ? parseInt(startingLife) : 0;
		this.setState({startingLife: life});
	}

	/**
	 * Renders the profile selector buttons based on the number of players selected
	 */
	renderProfileButtons() {
		var profileNumber = 0;
		return (
			<View>
				{
					this.state.profiles.map(profile => 
						<MenuItem 
							key={profileNumber}
							containerStyle={
								styles.itemNoMargin
							}
						>
							<ProfileButton
								key={profileNumber++ + "_button"}
								profile={profile}
							/>
						</MenuItem>
					)
				}
			</View>
		)
	}

	/**
	 * Creates the game and player objects, then navigates to the game screen
	 */
	startGame() {
		this.props.startGame(this.state.startingLife, this.state.numberPlayers, new Date());
		this.state.profiles.map(profile => {
			this.props.createPlayer(profile, this.state.startingLife);
		})
		this.props.navigation.navigate('GameScreen');
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
					<MenuItem label="Players">
						<RadioButton
							onPress={this.setNumberPlayers}
							selectedValue={this.state.numberPlayers}
							values={[
								{label: "2", value: 2},
								{label: "4", value: 4},
								{label: "6", value: 6},
							]}
						/>
					</MenuItem>
					<MenuItem label="Starting Life">
						<IconButton
							icon="minus"
							iconStyle={globalStyles.textSmall}
							onPress={() => {this.setStartingLife(this.state.startingLife-1)}}
						/>
						<Input
							keyboardType="numeric"
							onChange={this.setStartingLife}
							style={globalStyles.textLarge}
							value={this.state.startingLife.toString()}
						/>
						<IconButton
							icon="plus"
							iconStyle={globalStyles.textSmall}
							onPress={() => {this.setStartingLife(this.state.startingLife+1)}}
						/>
					</MenuItem>
					<MenuItem
						containerStyle={
							styles.itemNoMargin
						}
					>
						<RadioButton
							onPress={this.setStartingLife}
							selectedValue={this.state.startingLife}
							values={[
								{label: "20", value: 20},
								{label: "40", value: 40},
								{label: "60", value: 60},
							]}
						/>
					</MenuItem>
					<MenuItem label="Profiles"/>
					{this.renderProfileButtons()}
					<MenuItem>
						<TouchableOpacity 
							onPress={() => {this.startGame()}}
							style={[
								globalStyles.containerHorizontalCenter,
								styles.startButton
							]}
						>
							<Text style={[
								globalStyles.text,
                        		globalStyles.textCenter,
								styles.startText
							]}>
								START GAME
							</Text>
						</TouchableOpacity>
					</MenuItem>
				</MenuContent>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	itemNoMargin: {
		marginVertical: 0
	},

    startButton: {
        backgroundColor: colourLightGrey,
        borderRadius: 0,
        borderWidth: 0,
        flex: 1
    },
	
    startText: {
        color: colourDarkGrey,
        flex: 1
    }
})

export default MainMenu = connect(
	state => ({
		game: state.game,
		profiles: state.profile
	}),
	dispatch => ({
		startGame: (startingLife, numberPlayers, timestamp) => {dispatch(startGame(startingLife, numberPlayers, timestamp))},
		createPlayer: (profile, startingLife) => {dispatch(createPlayer(profile, startingLife))}
	})
)(MainMenu)