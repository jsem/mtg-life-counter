import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import { DEFAULT_PROFILE } from '../config/defaultProfiles';
import { IconButton } from '../components/index';
import { globalStyles } from '../config/styles';
import { thisTypeAnnotation } from '@babel/types';
import { updateLife, updatePoison, updateCommanderTax, updateCommanderDamage, updateCurrentCounter } from '../actions/PlayerAction';

const ICON_HEALTH = "heart";
const ICON_POISON = "skull-crossbones";
const ICON_COMMANDER_TAX = "balance-scale";
const ICON_COMMANDER_DAMAGE_ONE = "dice-one";
const ICON_COMMANDER_DAMAGE_TWO = "dice-two";
const ICON_COMMANDER_DAMAGE_THREE = "dice-three";
const ICON_COMMANDER_DAMAGE_FOUR = "dice-four";
const ICON_COMMANDER_DAMAGE_FIVE = "dice-five";
const ICON_COMMANDER_DAMAGE_SIX = "dice-six";
const ICON_ERROR = "exclamation-triangle";

/**
 * Component that displays player information
 * Props:
 * player: temp prop for display debugging
 */
class PlayerArea extends Component {

    changeCurrentCounter () {
        this.props.players[this.props.player].currentCounter >= (2 + (this.props.game.numberPlayers)-1) ? this.props.updateCurrentCounter(this.props.player, 0) : this.props.updateCurrentCounter(this.props.player, (this.props.players[this.props.player].currentCounter+1));
        let opposingPlayerId = 0
        switch(this.props.players[this.props.player].currentCounter) {
            case 3:
                opposingPlayerId = this.props.player <= 0 ? 1 : 0;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, 0);
                break;
            case 4:
                opposingPlayerId = this.props.player <= 1 ? 2 : 1;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, 0);
                break;
            case 5:
                opposingPlayerId = this.props.player <= 2 ? 3 : 2;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, 0);
                break;
            case 6:
                opposingPlayerId = this.props.player <= 3 ? 4 : 3;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, 0);
                break;
            case 7:
                opposingPlayerId = this.props.player <= 4 ? 5 : 4;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, 0);
                break;
        }
    }

    changeCounterValue(amount) {
        let opposingPlayerId = 0;
        switch(this.props.players[this.props.player].currentCounter) {
            case 0:
                this.props.updateLife(this.props.player, amount);
                break;
            case 1:
                this.props.updatePoison(this.props.player, amount);
                break;
            case 2:
                this.props.updateCommanderTax(this.props.player, amount*2);
                break;
            case 3:
                opposingPlayerId = this.props.player <= 0 ? 1 : 0;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, amount);
                break;
            case 4:
                opposingPlayerId = this.props.player <= 1 ? 2 : 1;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, amount);
                break;
            case 5:
                opposingPlayerId = this.props.player <= 2 ? 3 : 2;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, amount);
                break;
            case 6:
                opposingPlayerId = this.props.player <= 3 ? 4 : 3;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, amount);
                break;
            case 7:
                opposingPlayerId = this.props.player <= 4 ? 5 : 4;
                this.props.updateCommanderDamage(this.props.player, opposingPlayerId, amount);
                break;
        }
    }

    profileMenu() {
        // To do
    }

    render () {
        var backgroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].backgroundColour : DEFAULT_PROFILE.backgroundColour;
        var foregroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].foregroundColour : DEFAULT_PROFILE.foregroundColour;
        var playerName = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].name : DEFAULT_PROFILE.name;
        var counterValue = 0;
        var iconName = ICON_ERROR;
        if(Object.keys(this.props.players).length >= this.props.game.numberPlayers) {
            switch(this.props.players[this.props.player].currentCounter) {
                case 0:
                    iconName = ICON_HEALTH;
                    counterValue = this.props.players[this.props.player].life;
                    break;
                case 1:
                    iconName = ICON_POISON;
                    counterValue = this.props.players[this.props.player].poison;
                    break;
                case 2:
                    iconName = ICON_COMMANDER_TAX;
                    counterValue = this.props.players[this.props.player].commanderTax;
                    break;
                case 3:
                    iconName = this.props.player <= 0 ? ICON_COMMANDER_DAMAGE_TWO : ICON_COMMANDER_DAMAGE_ONE;
                    counterValue = this.props.player <= 0 ? this.props.players[this.props.player].commanderDamage[1] : this.props.players[this.props.player].commanderDamage[0];
                    break;
                case 4:
                    iconName = this.props.player <= 1 ? ICON_COMMANDER_DAMAGE_THREE : ICON_COMMANDER_DAMAGE_TWO;
                    counterValue = this.props.player <= 1 ? this.props.players[this.props.player].commanderDamage[2] : this.props.players[this.props.player].commanderDamage[1];
                    break;
                case 5:
                    iconName = this.props.player <= 2 ? ICON_COMMANDER_DAMAGE_FOUR : ICON_COMMANDER_DAMAGE_THREE;
                    counterValue = this.props.player <= 2 ? this.props.players[this.props.player].commanderDamage[3] : this.props.players[this.props.player].commanderDamage[2];
                    break;
                case 6:
                    iconName = this.props.player <= 3 ? ICON_COMMANDER_DAMAGE_FIVE : ICON_COMMANDER_DAMAGE_FOUR;
                    counterValue = this.props.player <= 3 ? this.props.players[this.props.player].commanderDamage[4] : this.props.players[this.props.player].commanderDamage[3];
                    break;
                case 7:
                    iconName = this.props.player <= 4 ? ICON_COMMANDER_DAMAGE_SIX : ICON_COMMANDER_DAMAGE_FIVE;
                    counterValue = this.props.player <= 4 ? this.props.players[this.props.player].commanderDamage[5] : this.props.players[this.props.player].commanderDamage[4];
                    break;
            }
        }
        return (
            <View style={[styles.container, {backgroundColor: backgroundColour, borderColor: foregroundColour}]}>
                <View style={styles.containerCounterValue}>
                    <Text style={[globalStyles.text, styles.textCounterValue, {color: foregroundColour}]}>
                        {counterValue}
                    </Text>
                </View>
                <Text style={[globalStyles.text, styles.textPlayerName, {color: foregroundColour}]}>
                    {playerName + this.props.player}
                </Text>
                <TouchableOpacity style={styles.buttonCounter}>
                    <IconButton
                        icon="minus"
                        iconStyle={{color: foregroundColour}}
                        onPress={() => {this.changeCounterValue(-1)}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCounter}>
                    <IconButton
                        icon="plus"
                        iconStyle={{color: foregroundColour}}
                        onPress={() => {this.changeCounterValue(1)}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMenu}>
                    <IconButton
                        icon="cog"
                        iconStyle={{color: foregroundColour}}
                        onPress={() => {this.profileMenu()}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCounterType}>
                    <IconButton
                        icon={iconName}
                        iconStyle={{color: foregroundColour, }}
                        onPress={() => {this.changeCurrentCounter()}}
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
        updateLife: (playerId, amount) => {dispatch(updateLife(playerId, amount))},
        updatePoison: (playerId, amount) => {dispatch(updatePoison(playerId, amount))},
        updateCommanderTax: (playerId, amount) => {dispatch(updateCommanderTax(playerId, amount))},
        updateCommanderDamage: (playerId, opposingPlayerId, amount) => {dispatch(updateCommanderDamage(playerId, opposingPlayerId, amount))},
        updateCurrentCounter: (playerId, amount) => {dispatch(updateCurrentCounter(playerId, amount))}
    })
)(PlayerArea)