import React, { Component } from 'react';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import { ColorWheel } from 'react-native-color-wheel';

import { addHistory } from '../actions/GameAction';
import { updatePlayer } from '../actions/PlayerAction';
import { globalStyles } from '../config/styles';
import { Input, MenuContent, MenuItem } from '../components/index';
import { colourDarkGrey, colourLightGrey, colourInvisible } from '../config/colours';

const PROFILE_MENU_UPDATE = 'UPDATE';
const PROFILE_MENU_SAVE = 'SAVE';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
    
        let menuType = this.props.navigation.getParam('menuType') === PROFILE_MENU_UPDATE || this.props.navigation.getParam('menuType') === PROFILE_MENU_SAVE ? this.props.navigation.getParam('menuType') : PROFILE_MENU_UPDATE;

        let playerId ="";
        let name = "";
        let foregroundColour = "";
        let backgroundColour = "";
        let backgroundImage = "";

        switch(menuType) {
            case PROFILE_MENU_UPDATE:
                playerId = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.navigation.getParam('player') : 0;
                name = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[playerId].name : DEFAULT_PROFILE.name;
                foregroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[playerId].foregroundColour : DEFAULT_PROFILE.foregroundColour;
                backgroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[playerId].backgroundColour : DEFAULT_PROFILE.backgroundColour;
                backgroundImage = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[playerId].backgroundImage : DEFAULT_PROFILE.backgroundImage;
                break;
            case PROFILE_MENU_SAVE:
                //To do
                break;
        }

        this.state = {
            playerId: playerId,
            name: name,
            foregroundColour: foregroundColour,
            backgroundColour: backgroundColour,
            backgroundImage: backgroundImage,
            menuType: menuType,
        }

        this.setName = this.setName.bind(this);
        this.setForegroundColour = this.setForegroundColour.bind(this);
        this.setBackgroundColour = this.setBackgroundColour.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.updatePlayerValues = this.updatePlayerValues.bind(this);
        this.close = this.close.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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

    updateValues() {
        switch (this.state.menuType) {
            case PROFILE_MENU_SAVE:
                this.saveProfile();
                break;
            case PROFILE_MENU_UPDATE:
                this.updatePlayerValues();
                break;
        }
    }

    updatePlayerValues() {
        let name = this.state.name === undefined || this.state.name === null ? "" : this.state.name;
        let foregroundColour = this.state.foregroundColour === undefined || this.state.foregroundColour === null ? "" : this.state.foregroundColour;
        let backgroundColour = this.state.backgroundColour === undefined || this.state.backgroundColour === null ? "" : this.state.backgroundColour;
        let backgroundImage = this.state.backgroundImage === undefined || this.state.backgroundImage === null ? "" : this.state.backgroundImage;
        this.props.players[this.state.playerId].name !== name ? this.props.addHistory(moment(), this.state.playerId, this.props.players[this.state.playerId].name + " (ID " + this.props.players[this.state.playerId].playerId + ") changed name to " + name) : null;
        this.props.updatePlayer(this.state.playerId, name, foregroundColour, backgroundColour, backgroundImage);
    }

    saveProfile() {
        //To do
    }

    close() {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        Orientation.lockToLandscape();
        BackHandler.addEventListener('hardwareBackPress', this.props.navigation.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.props.navigation.goBack);
    }

    render() {
        let name = this.state.name === undefined || this.state.name === null ? "" : this.state.name;
        let foregroundColour = this.state.foregroundColour === undefined || this.state.foregroundColour === null ? "" : this.state.foregroundColour;
        let backgroundColour = this.state.backgroundColour === undefined || this.state.backgroundColour === null ? "" : this.state.backgroundColour;
        let backgroundImage = this.state.backgroundImage === undefined || this.state.backgroundImage === null ? "" : this.state.backgroundImage;
        return (
            <View style={[styles.containerMain, {backgroundColor: backgroundColour, borderColor: foregroundColour, backgroundImage: backgroundImage}]}>
                <MenuContent style={[{backgroundColor: colourInvisible}]}>
                    <MenuItem label="Player Name" containerStyle={[{backgroundColor: colourInvisible}]} containerContentStyle={[{backgroundColor: colourInvisible}]} containerLabelStyle={[{backgroundColor: colourInvisible, foregroundColor: foregroundColour}]} labelStyle={[{backgroundColor: colourInvisible}]}>
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
                    <MenuItem label="Foreground Colour" containerStyle={[{backgroundColor: colourInvisible}]} containerContentStyle={[{backgroundColor: colourInvisible}]} containerLabelStyle={[{backgroundColor: colourInvisible, foregroundColor: foregroundColour}]} labelStyle={[{backgroundColor: colourInvisible}]}>
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
                    <MenuItem label="Background Colour" containerStyle={[{backgroundColor: colourInvisible}]} containerContentStyle={[{backgroundColor: colourInvisible}]} containerLabelStyle={[{backgroundColor: colourInvisible, foregroundColor: foregroundColour}]} labelStyle={[{backgroundColor: colourInvisible}]}>
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
                    <MenuItem label="Background Image" containerStyle={[{backgroundColor: colourInvisible}]} containerContentStyle={[{backgroundColor: colourInvisible}]} containerLabelStyle={[{backgroundColor: colourInvisible, foregroundColor: foregroundColour}]} labelStyle={[{backgroundColor: colourInvisible}]}>
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
                    <MenuItem containerStyle={[{backgroundColor: colourInvisible}]} containerContentStyle={[{backgroundColor: colourInvisible}]} containerLabelStyle={[{backgroundColor: colourInvisible, foregroundColor: foregroundColour}]} labelStyle={[{backgroundColor: colourInvisible}]}>
                        <TouchableOpacity 
                            onPress={this.updateValues}
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
                                {this.state.menuType}
                            </Text>
                        </TouchableOpacity>
                    </MenuItem>
                    <MenuItem containerStyle={[{backgroundColor: colourInvisible}]} containerContentStyle={[{backgroundColor: colourInvisible}]} containerLabelStyle={[{backgroundColor: colourInvisible, foregroundColor: foregroundColour}]} labelStyle={[{backgroundColor: colourInvisible}]}>
                        <TouchableOpacity 
                            onPress={this.close}
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

export default ProfileScreen = connect(
    state => ({
        game: state.game,
        players: state.player
    }),
    dispatch => ({
        addHistory: (timestamp, playerId, note) => {dispatch(addHistory(timestamp, playerId, note))},
        updatePlayer: (playerId, name, foregroundColour, backgroundColour, backgroundImage) => {dispatch(updatePlayer(playerId, name, foregroundColour, backgroundColour, backgroundImage))}
    })
)(ProfileScreen)