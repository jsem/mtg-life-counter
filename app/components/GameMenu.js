import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';

import { addHistory, endGame, startGame } from '../actions/GameAction';
import { createPlayer } from '../actions/PlayerAction';
import { colourBlue, colourDarkGrey, colourGreen, colourLightBlue, colourLightGrey, colourOrange, colourPink, colourPurple, colourRed, colourYellow } from '../config/colours';
import { globalStyles } from '../config/styles';
import { MenuContent, MenuItem } from '../components/index';

const RESULT_FADE_IN_TIMEOUT = 500;
const RESULT_COLOURS = [colourBlue, colourGreen, colourLightBlue, colourOrange, colourPink, colourPurple, colourRed, colourYellow];

/**
 * Main app menu. Contains options to setup the game and manage profiles
 */
class GameMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coinResult: null,
            coinColour: RESULT_COLOURS[0],
            coinOpacity: new Animated.Value(0),
            d20Result: null,
            d20Colour: RESULT_COLOURS[0],
            d20Opacity: new Animated.Value(0),
            d6Result: null,
            d6Colour: RESULT_COLOURS[0],
            d6Opacity: new Animated.Value(0)
        }
    }

    generateResultColour(currentColour) {
        let newColour = currentColour;
        while (newColour === currentColour) {
            newColour = RESULT_COLOURS[Math.floor(Math.random() * RESULT_COLOURS.length)];
        }
        return newColour;
    }

    coinFlip = () => {
        let result = Math.random() >= 0.5 ? "Heads" : "Tails";
        this.props.addHistory(moment(), null, "Flipped coin with result " + result)
        this.setState({
            coinResult: result,
            coinColour: this.generateResultColour(this.state.coinColour)
        });
        this.state.coinOpacity.setValue(0);
        Animated.timing(
            this.state.coinOpacity, {
                toValue: 1,
                duration: RESULT_FADE_IN_TIMEOUT,
            }
        ).start();
    }

    d20Roll = () => {
        let result = Math.floor(Math.random() * 20) + 1;
        this.props.addHistory(moment(), null, "Rolled D20 with result " + result)
        this.setState({
            d20Result: result,
            d20Colour: this.generateResultColour(this.state.d20Colour)
        });
        this.state.d20Opacity.setValue(0);
        Animated.timing(
            this.state.d20Opacity, {
                toValue: 1,
                duration: RESULT_FADE_IN_TIMEOUT,
            }
        ).start();
    }

    d6Roll = () => {
        let result = Math.floor(Math.random() * 6) + 1;
        this.props.addHistory(moment(), null, "Rolled D6 with result " + result)
        this.setState({
            d6Result: result,
            d6Colour: this.generateResultColour(this.state.d6Colour)
        });
        this.state.d6Opacity.setValue(0);
        Animated.timing(
            this.state.d6Opacity, {
                toValue: 1,
                duration: RESULT_FADE_IN_TIMEOUT,
            }
        ).start();
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    close = () => {
        this.props.orientationLock();
        this.props.close();
    }

    render() {
        let historyCounter = 0;
        return (
            <View style={globalStyles.containerScreenVertical}>
                <MenuContent>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.props.mainMenu}
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
                                MAIN MENU
                            </Text>
                        </TouchableOpacity>
                    </MenuItem>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.props.restart}
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
                                RESTART
                            </Text>
                        </TouchableOpacity>
                    </MenuItem>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.coinFlip}
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
                                FLIP COIN
                            </Text>
                        </TouchableOpacity>
                        <View style={[
                            globalStyles.containerHorizontalCenter,
                            styles.containerResult
                        ]}>
                            <Animated.Text style={[
                                globalStyles.text,
                                globalStyles.textCenter,
                                styles.text,
                                {color: this.state.coinColour, opacity: this.state.coinOpacity}
                            ]}>
                                {this.state.coinResult}
                            </Animated.Text>
                        </View>
                    </MenuItem>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.d20Roll}
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
                                ROLL D20
                            </Text>
                        </TouchableOpacity>
                        <View style={[
                            globalStyles.containerHorizontalCenter,
                            styles.containerResult
                        ]}>
                            <Animated.Text style={[
                                globalStyles.text,
                                globalStyles.textCenter,
                                styles.text,
                                {color: this.state.d20Colour, opacity: this.state.d20Opacity}
                            ]}>
                                {this.state.d20Result}
                            </Animated.Text>
                        </View>
                    </MenuItem>
                    <MenuItem>
                        <TouchableOpacity 
                            onPress={this.d6Roll}
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
                                ROLL D6
                            </Text>
                        </TouchableOpacity>
                        <View style={[
                            globalStyles.containerHorizontalCenter,
                            styles.containerResult
                        ]}>
                            <Animated.Text style={[
                                globalStyles.text,
                                globalStyles.textCenter,
                                styles.text,
                                {color: this.state.d6Colour, opacity: this.state.d6Opacity}
                            ]}>
                                {this.state.d6Result}
                            </Animated.Text>
                        </View>
                    </MenuItem>
                    <MenuItem>
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
                    <MenuItem label="HISTORY"/>
                    {
                        this.props.game.history.map(history => {
                            historyCounter++;
                            return (
                                <MenuItem key={'history_item_' + historyCounter}>
                                    <Text key={'history_item_timestamp_' + historyCounter} style={[globalStyles.text, globalStyles.textLeft, styles.textHistoryTimestamp]}>{moment(history.timestamp).format('hh:mmA')}</Text>
                                    <Text key={'history_item_note_' + historyCounter} style={[globalStyles.text, globalStyles.textLeft, styles.textHistoryNote]}>{history.note}</Text>
                                </MenuItem>
                            );
                        })
                    }
                </MenuContent>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colourLightGrey,
        borderRadius: 0,
        borderWidth: 0,
        flex: 1
    },

    containerResult: {
        flex: 1
    },

    text: {
        color: colourDarkGrey,
        flex: 1
    },

    textHistoryNote: {
        flex: 4
    },

    textHistoryTimestamp: {
        flex: 1
    }
})

export default GameMenu = connect(
    state => ({
        game: state.game,
        profiles: state.profile
    }),
    dispatch => ({
        addHistory: (timestamp, playerId, note) => {dispatch(addHistory(timestamp, playerId, note))},
        endGame: () => {dispatch(endGame())},
        startGame: (startingLife, numberPlayers, timestamp) => {dispatch(startGame(startingLife, numberPlayers, timestamp))},
        createPlayer: (profile, startingLife) => {dispatch(createPlayer(profile, startingLife))}
    })
)(GameMenu)