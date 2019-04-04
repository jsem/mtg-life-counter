import React, { Component } from 'react';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinyColor from 'tinycolor2';
import ModalDropdown from 'react-native-modal-dropdown';

import { addHistory } from '../actions/GameAction';
import { updatePlayer } from '../actions/PlayerAction';
import { globalStyles } from '../config/styles';
import { Input, MenuContent, MenuItem } from '../components/index';
import { colourDarkGrey, colourLightGrey, colourInvisible } from '../config/colours';
import { throwStatement } from '@babel/types';

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
                foregroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? tinyColor(this.props.players[playerId].foregroundColour).toHsl() : tinyColor(DEFAULT_PROFILE.foregroundColour).toHsl();
                backgroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? tinyColor(this.props.players[playerId].backgroundColour).toHsl() : tinyColor(DEFAULT_PROFILE.backgroundColour).toHsl();
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
            selectedOption: 'Player Name'
        }

        this.setName = this.setName.bind(this);
        this.setForegroundColour = this.setForegroundColour.bind(this);
        this.setBackgroundColour = this.setBackgroundColour.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.updatePlayerValues = this.updatePlayerValues.bind(this);
        this.close = this.close.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getComponentsForRendering = this.getComponentsForRendering.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
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

    setSelectedOption = (idx, value) => {
        this.setState({selectedOption: value});
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
        let foregroundColour = this.state.foregroundColour === undefined || this.state.foregroundColour === null ? "" : tinyColor(this.state.foregroundColour).toHslString();
        let backgroundColour = this.state.backgroundColour === undefined || this.state.backgroundColour === null ? "" : tinyColor(this.state.backgroundColour).toHslString();
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

    updateForegroundHue = h => this.setState({ foregroundColour: {...this.state.foregroundColour, h } });
    updateForegroundSaturation = s => this.setState({ foregroundColour: {...this.state.foregroundColour, s } });
    updateForegroundLightness = l => this.setState({ foregroundColour: {...this.state.foregroundColour, l } });
    updateBackgroundHue = h => this.setState({ backgroundColour: {...this.state.backgroundColour, h } });
    updateBackgroundSaturation = s => this.setState({ backgroundColour: {...this.state.backgroundColour, s } });
    updateBackgroundLightness = l => this.setState({ backgroundColour: {...this.state.backgroundColour, l } });

    getComponentsForRendering() {
        let name = this.state.name === undefined || this.state.name === null ? "" : this.state.name;
        let foregroundColour = this.state.foregroundColour === undefined || this.state.foregroundColour === null ? "" : tinyColor(this.state.foregroundColour).toHslString();
        let backgroundColour = this.state.backgroundColour === undefined || this.state.backgroundColour === null ? "" : tinyColor(this.state.backgroundColour).toHslString();
        let backgroundImage = this.state.backgroundImage === undefined || this.state.backgroundImage === null ? "" : this.state.backgroundImage;
        return {
            name: name,
            foregroundColour: foregroundColour,
            backgroundColour: backgroundColour,
            backgroundImage: backgroundImage
        }
    }

    renderInputComponent(selectedOption) {
        components = this.getComponentsForRendering();
        switch (selectedOption) {
            case 'Player Name':
                return(
                    <View style={[styles.containerBody, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColour}]}>
                        <Input
                            keyboardType="default"
                            onChange={this.setName}
                            style={[
                                styles.textInput,
                                {
                                    color: components.foregroundColour,
                                    backgroundColor: tinyColor({...this.state.backgroundColour, a: .3}).toHslString(),
                                    borderColor: components.foregroundColour,
                                    borderWidth: 2,
                                    flex: 1
                                }
                            ]}
                            value={components.name.toString()}
                        />
                        <View style={{flex: 5}}/>
                    </View>
                )
            case 'Foreground Colour':
                return(
                    <View style={[styles.containerBody, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColour}]}>
                        <Text style={[
                            globalStyles.text,
                            globalStyles.textLeft,
                            {
                                color: components.foregroundColour
                            }
                        ]}>
                            {components.foregroundColour}
                        </Text>
                        <HueSlider
                            style={styles.sliderRow}
                            gradientSteps={40}
                            value={this.state.foregroundColour.h}
                            onValueChange={this.updateForegroundHue}
                        />
                        <SaturationSlider
                            style={styles.sliderRow}
                            gradientSteps={20}
                            value={this.state.foregroundColour.s}
                            color={this.state.foregroundColour}
                            onValueChange={this.updateForegroundSaturation}
                        />
                        <LightnessSlider
                            style={styles.sliderRow}
                            gradientSteps={20}
                            value={this.state.foregroundColour.l}
                            color={this.state.foregroundColour}
                            onValueChange={this.updateForegroundLightness}
                        />
                    </View>
                )
            case 'Background Colour':
                return(
                    <View style={[styles.containerBody, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColour}]}>
                        <Text style={[
                            globalStyles.text,
                            globalStyles.textLeft,
                            {
                                color: components.backgroundColour,
                                backgroundColor: tinyColor({...this.state.foregroundColour, a: .3}).toHslString()
                            }
                        ]}>
                            {components.backgroundColour}
                        </Text>
                        <View style={{backgroundColor: tinyColor({...this.state.foregroundColour, a: .3}).toHslString()}}>
                            <HueSlider
                                style={styles.sliderRow}
                                gradientSteps={40}
                                value={this.state.backgroundColour.h}
                                onValueChange={this.updateBackgroundHue}
                            />
                            <SaturationSlider
                                style={styles.sliderRow}
                                gradientSteps={20}
                                value={this.state.backgroundColour.s}
                                color={this.state.backgroundColour}
                                onValueChange={this.updateBackgroundSaturation}
                            />
                            <LightnessSlider
                                style={styles.sliderRow}
                                gradientSteps={20}
                                value={this.state.backgroundColour.l}
                                color={this.state.backgroundColour}
                                onValueChange={this.updateBackgroundLightness}
                            />
                        </View>
                    </View>
                )
            case 'Background Image':
                return(
                    <View style={[styles.containerBody, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColour}]}>
                        
                    </View>
                )
            default:
                return null;
        }
    }

    render() {
        components = this.getComponentsForRendering();
        selectedComponent = this.renderInputComponent(this.state.selectedOption);
        return (
            <View style={[styles.containerMain, {backgroundColor: components.backgroundColour, borderColor: components.foregroundColour, backgroundImage: components.backgroundImage}]}>
                <View style={[styles.containerHeader, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColor}]}>
                    <ModalDropdown
                        defaultValue={this.state.selectedOption}
                        options={['Player Name','Foreground Colour','Background Colour','Background Image','None']}
                        textStyle={[
                            globalStyles.textLarge,
                            {
                                color: components.foregroundColour
                            }
                        ]}
                        dropdownTextStyle={[
                            globalStyles.textLarge,
                            {
                                color: components.foregroundColour,
                                backgroundColor: components.backgroundColour,
                                borderWidth: .2,
                                borderColor: components.foregroundColour
                            }
                        ]}
                        dropdownTextHighlightStyle={[
                            globalStyles.textLarge,
                            {
                                color: components.foregroundColour,
                                backgroundColor: components.backgroundColour,
                                borderWidth: .2,
                                borderColor: components.foregroundColour
                            }
                        ]}
                        dropdownStyle={{
                            borderWidth: 2,
                            borderColor: components.foregroundColour,
                        }}
                        onSelect={(idx, value) => this.setSelectedOption(idx, value)}
                    />
                </View>
                <View style={[styles.containerBody, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColor}]}>
                    {selectedComponent}
                </View>
                <View style={[styles.containerButtons, {backgroundColor: components.backgroundColour, foregroundColor: components.foregroundColor}]}>
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
                </View>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    button: {
        backgroundColor: colourLightGrey,
        borderRadius: 0,
        borderWidth: 0,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        flex: 1
    },

    text: {
        color: colourDarkGrey,
        flex: 1
    },

    containerBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 2,
        flex: 6
    },

    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        position: 'absolute',
        bottom: 0,
        margin: 2,
        flex: 2
    },

    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 2,
        flex: 2
    },

    containerMain: {
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 0,
        padding: 0,
        flex: 1
    },

    textInput: {
        ...globalStyles.textLarge,
        borderWidth: 2
    },

    sliderRow: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 12,
        marginBottom: 12
    },
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