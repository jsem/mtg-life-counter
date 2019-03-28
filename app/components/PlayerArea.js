import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import { DEFAULT_PROFILE } from '../config/defaultProfiles';
import { IconButton } from '../components/index';
import { globalStyles } from '../config/styles';

/**
 * Component that displays player information
 * Props:
 * player: temp prop for display debugging
 */
class PlayerArea extends Component {
    render () {
        const backgroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].backgroundColour : DEFAULT_PROFILE.backgroundColour;
        const foregroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].foregroundColour : DEFAULT_PROFILE.foregroundColour;
        const playerName = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].name : DEFAULT_PROFILE.name;
        const counterValue = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].life : 0;
        return (
            <View style={[styles.container, {backgroundColor: backgroundColour, borderColor: foregroundColour}]}>
                <View style={styles.containerCounterValue}>
                    <Text style={[globalStyles.text, styles.textCounterValue, {color: foregroundColour}]}>
                        {counterValue}
                    </Text>
                </View>
                <Text style={[globalStyles.text, styles.textPlayerName, {color: foregroundColour}]}>
                    {playerName}
                </Text>
                <TouchableOpacity style={styles.buttonCounter}>
                    <Text style={[globalStyles.text, {color: foregroundColour}]}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCounter}>
                    <Text style={[globalStyles.text, {color: foregroundColour}]}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMenu}>
                    <IconButton
                        icon="cog"
                        iconStyle={{color: foregroundColour}}
                        //onPress={() => {this.setStartingLife(this.state.startingLife-1)}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCounterType}>
                    <IconButton
                        icon="heart"
                        iconStyle={{color: foregroundColour}}
                        //onPress={() => {this.setStartingLife(this.state.startingLife-1)}}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
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

    container: {
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

    textCounterValue: {
        fontSize: '50@ms'
    },

    textPlayerName: {
        fontSize: '15@ms',
        position: 'absolute',
        bottom: 10
    }
})

export default PlayerArea = connect(
    state => ({
        game: state.game,
        players: state.player
    }),
    dispatch => ({
        
    })
)(PlayerArea)