import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import { addHistory } from '../actions/GameAction';
import { updatePlayer } from '../actions/PlayerAction';
import { globalStyles } from '../config/styles';
import { Input, MenuContent, MenuItem } from '../components/index';
import { colourBlue, colourDarkGrey, colourGreen, colourLightBlue, colourLightGrey, colourOrange, colourPink, colourPurple, colourRed, colourYellow } from '../config/colours';

class ProfileMenu extends Component {
    constructor(props) {
        super(props);
    
        let name = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].name : DEFAULT_PROFILE.name;
        let foregroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].foregroundColour : DEFAULT_PROFILE.foregroundColour;
        let backgroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].backgroundColour : DEFAULT_PROFILE.backgroundColour;
        let backgroundImage = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].backgroundImage : DEFAULT_PROFILE.backgroundImage;

        this.state = {
            name: name,
            foregroundColour: foregroundColour,
            backgroundColour: backgroundColour,
            backgroundImage: backgroundImage
        }

        this.setName = this.setName.bind(this);
        this.setForegroundColour = this.setForegroundColour.bind(this);
        this.setBackgroundColour = this.setBackgroundColour.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.updatePlayerValues = this.updatePlayerValues.bind(this);
    }

    setName(newName) {
        this.setState({name: newName});
    }

    setForegroundColour(newColour) {
        this.setState({foregroundColour: newColour});
    }

    setBackgroundColour(newColour) {
        this.setState({backgroundColour: newColour});
    }

    setBackgroundImage(newImage) {
        this.setState({backgroundImage: newImage});
    }

    updatePlayerValues() {
        let name = this.state.name === undefined || this.state.name === null ? "" : this.state.name;
        let foregroundColour = this.state.foregroundColour === undefined || this.state.foregroundColour === null ? "" : this.state.foregroundColour;
        let backgroundColour = this.state.backgroundColour === undefined || this.state.backgroundColour === null ? "" : this.state.backgroundColour;
        let backgroundImage = this.state.backgroundImage === undefined || this.state.backgroundImage === null ? "" : this.state.backgroundImage;
        this.props.players[this.props.player].name !== name ? this.props.addHistory(moment(), this.props.player, this.props.players[this.props.player].name + " (ID " + this.props.players[this.props.player].playerId + ") changed name to " + name) : null;
        this.props.updatePlayer(this.props.player, name, foregroundColour, backgroundColour, backgroundImage);
    }

    render() {
        let name = this.state.name === undefined || this.state.name === null ? "" : this.state.name;
        let foregroundColour = this.state.foregroundColour === undefined || this.state.foregroundColour === null ? "" : this.state.foregroundColour;
        let backgroundColour = this.state.backgroundColour === undefined || this.state.backgroundColour === null ? "" : this.state.backgroundColour;
        let backgroundImage = this.state.backgroundImage === undefined || this.state.backgroundImage === null ? "" : this.state.backgroundImage;
        return (
            <View style={[styles.containerMain, {backgroundColor: backgroundColour, borderColor: foregroundColour, backgroundImage: backgroundImage}]}>
                <MenuContent>
                    <MenuItem label="Player Name" containerLabelStyle={[{backgroundColor: backgroundColour, foregroundColor: foregroundColour}]}>
                        <Input
                            keyboardType="default"
                            onChange={this.setName}
                            style={[
                                styles.textInput,
                                {
                                    color: foregroundColour,
                                    backgroundColor: backgroundColour,
                                    borderColor: foregroundColour
                                }
                            ]}
                            value={name.toString()}
                        />
                    </MenuItem>
                    <MenuItem label="Foreground Colour">
                        <Input
                            keyboardType="default"
                            onChange={this.setForegroundColour}
                            style={[
                                styles.textInput,
                                {
                                    color: foregroundColour,
                                    backgroundColor: backgroundColour,
                                    borderColor: foregroundColour
                                }
                            ]}
                            value={foregroundColour.toString()}
                        />
                    </MenuItem>
                    <MenuItem label="Background Colour">
                        <Input
                            keyboardType="default"
                            onChange={this.setBackgroundColour}
                            style={[
                                styles.textInput,
                                {
                                    color: foregroundColour,
                                    backgroundColor: backgroundColour,
                                    borderColor: foregroundColour
                                }
                            ]}
                            value={backgroundColour.toString()}
                        />
                    </MenuItem>
                    <MenuItem label="Background Image">
                        <Input
                            keyboardType="default"
                            onChange={this.setBackgroundImage}
                            style={[
                                styles.textInput,
                                {
                                    color: foregroundColour,
                                    backgroundColor: backgroundColour,
                                    borderColor: foregroundColour
                                }
                            ]}
                            value={backgroundImage.toString()}
                        />
                    </MenuItem>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.updatePlayerValues}
                            style={[
                                globalStyles.containerHorizontalCenter,
                                styles.button
                            ]}
                        >
                            <Text style={[
                                globalStyles.text,
                                globalStyles.textCenter,
                                styles.text
                            ]}>
                                UPDATE
                            </Text>
                        </TouchableOpacity>
                    </MenuItem>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.props.close}
                            style={[
                                globalStyles.containerHorizontalCenter,
                                styles.button
                            ]}
                        >
                            <Text style={[
                                globalStyles.text,
                                globalStyles.textCenter,
                                styles.text
                            ]}>
                                CLOSE
                            </Text>
                        </TouchableOpacity>
                    </MenuItem>
                </MenuContent>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    button: {
        backgroundColor: colourLightGrey,
        borderRadius: 0,
        borderWidth: 0,
        flex: 1
    },

    text: {
        color: colourDarkGrey,
        flex: 1
    },

    buttonCounter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    buttonCounterType: {
        position: 'absolute',
        right: 1,
        bottom: 10
    },

    buttonMenu: {
        position: 'absolute',
        left: 1,
        bottom: 10
    },

    containerMain: {
        borderWidth: 2,
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        flex: 1
    },

    containerCounterValue: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    textInput: {
        ...globalStyles.textLarge,
        borderWidth: 2,
        opacity: .5
    }
})

export default ProfileMenu = connect(
    state => ({
        game: state.game,
        players: state.player
    }),
    dispatch => ({
        addHistory: (timestamp, playerId, note) => {dispatch(addHistory(timestamp, playerId, note))},
        updatePlayer: (playerId, name, foregroundColour, backgroundColour, backgroundImage) => {dispatch(updatePlayer(playerId, name, foregroundColour, backgroundColour, backgroundImage))}
    })
)(ProfileMenu)