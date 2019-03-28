import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';

import { endGame, startGame } from '../actions/GameAction';
import { createPlayer } from '../actions/PlayerAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';
import { colourDarkGrey, colourLightGrey } from '../config/colours';
import { globalStyles } from '../config/styles';
import { IconButton, Input, MenuContent, MenuHeader, MenuItem, ProfileButton, ProfileSelector, RadioButton } from '../components/index';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
class MainMenu extends Component {
    constructor(props) {
        super(props);

        var numberPlayers = this.props.game.numberPlayers;
        var profiles = [];
        for (var player = 0; player < numberPlayers; player++) {
            profiles.push({...DEFAULT_PROFILE})
        }

        this.state = {
            numberPlayers: numberPlayers,
            startingLife: this.props.game.startingLife,
            profiles: profiles,
            profileSelect: null
        }

        this.setNumberPlayers = this.setNumberPlayers.bind(this);
        this.setProfile = this.setProfile.bind(this);
        this.setStartingLife = this.setStartingLife.bind(this);
    }

    /**
     * Sets the number of players
     * @param {*} numberPlayers the value to set the number of players to
     */
    setNumberPlayers(numberPlayers) {
        var profiles = this.state.profiles;
        if (numberPlayers < this.state.profiles.length) {
            profiles = this.state.profiles.slice(0, numberPlayers);
        } else if (numberPlayers > this.state.profiles.length) {
            profiles = this.state.profiles;
            for (var player = profiles.length; player < numberPlayers; player++) {
                profiles.push(DEFAULT_PROFILE)
            }
        }
        this.setState({profiles: profiles, numberPlayers: numberPlayers});
    }

    /**
     * Sets a profile to a player
     * @param {*} profileNumber the number of the player to set the profile for
     * @param {*} profile the profile to set for the player
     */
    setProfile(profileNumber, profile) {
        let profiles = [...this.state.profiles];
        profiles[profileNumber] = {...profile};
        this.setState({profiles: profiles, profileSelect: null});
    }

    /**
     * Sets the profile currently being selected
     * @param {*} profileNumber the number of the profile currently being selected
     */
    setProfileSelect(profileNumber) {
        this.setState({profileSelect: profileNumber});
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
        var profileButtons = [];
        for (var i=0; i < this.state.profiles.length; i++) {
            let profileNumber = i;
            profileButtons.push(<MenuItem 
                key={"profile" + profileNumber + "_item"}
                containerStyle={
                    styles.itemNoMargin
                }
            >
                <ProfileButton
                    key={"profile" + profileNumber + "_item_button"}
                    profile={this.state.profiles[profileNumber]}
                    onPress={() => {this.setProfileSelect(profileNumber)}}
                />
            </MenuItem>)
        }
        return (
            <View>
                {profileButtons}
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
        });
        this.props.navigation.navigate('GameScreen', {
            onNavigateBack: this.handleOnNavigateBack
        });
    }

    handleOnNavigateBack = () => {
        Orientation.lockToPortrait();
        this.props.endGame();
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    render() {
        return (
            this.state.profileSelect == null ?
                //render main menu screen
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
            :
                //render profile selector
                <View style={globalStyles.containerScreenVertical}>
                    <MenuHeader 
                        header={"Profile Select"}
                    />
                    <ProfileSelector
                        profile={this.state.profileSelect}
                        profiles={{"0": DEFAULT_PROFILE, ...this.props.profiles}}
                        onSelect={this.setProfile}
                    />
                </View>
        )
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
        endGame: () => {dispatch(endGame())},
        startGame: (startingLife, numberPlayers, timestamp) => {dispatch(startGame(startingLife, numberPlayers, timestamp))},
        createPlayer: (profile, startingLife) => {dispatch(createPlayer(profile, startingLife))}
    })
)(MainMenu)