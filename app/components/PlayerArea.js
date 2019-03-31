import React, { Component } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import ProfileMenu from '../components/ProfileMenu';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';
import { IconButton } from '../components/index';
import { globalStyles } from '../config/styles';
import { addHistory } from '../actions/GameAction';
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
const MENU_SHOW = 'MENU_SHOW';
const MENU_HIDE = 'MENU_HIDE';
const MENU_HIDDEN = 'MENU_HIDDEN';
const MENU_SHOWN = 'MENU_SHOWN';
const MENU_TOGGLE_TIMEOUT = 100;

/**
 * Component that displays player information
 * Props:
 * player: temp prop for display debugging
 */
class PlayerArea extends Component {
    constructor(props) {
        super(props);

        let {height, width} = Dimensions.get('window');
        let transitionSize = height > width ? Math.ceil(height) : Math.ceil(width);

        this.state = {
            menuState: MENU_HIDDEN,
            menuTransition: new Animated.Value(0),
            transitionSize: transitionSize
        }
    }

    showMenu = () => {
        if (this.state.menuState === MENU_HIDDEN) {
            this.setState({menuState: MENU_SHOW});
            this.state.menuTransition.setValue(0);
            Animated.timing(
                this.state.menuTransition, {
                    toValue: this.state.transitionSize,
                    duration: MENU_TOGGLE_TIMEOUT,
                }
            ).start(() => {this.setState({menuState: MENU_SHOWN})});
        }
    }

    hideMenu = () => {
        if (this.state.menuState === MENU_SHOWN) {
            this.setState({menuState: MENU_HIDE});
            this.state.menuTransition.setValue(this.state.transitionSize);
            Animated.timing(
                this.state.menuTransition, {
                    toValue: 0,
                    duration: MENU_TOGGLE_TIMEOUT,
                }
            ).start(() => {this.setState({menuState: MENU_HIDDEN})});
        }
    }

    toggleMenu = () => {
        if (this.state.menuState === MENU_HIDDEN) {
            this.showMenu();
        } else if (this.state.menuState === MENU_SHOWN) {
            this.hideMenu();
        }
    }

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
        let opposingPlayerId = -1;
        switch(this.props.players[this.props.player].currentCounter) {
            case 0:
                this.props.updateLife(this.props.player, amount);
                this.props.addHistory(moment(), this.props.player, this.props.players[this.props.player].name + " (ID " + this.props.players[this.props.player].playerId + ") life changed by " + amount + " (" + this.props.players[this.props.player].life + ")");
                break;
            case 1:
                this.props.updatePoison(this.props.player, amount);
                this.props.addHistory(moment(), this.props.player, this.props.players[this.props.player].name + " (ID " + this.props.players[this.props.player].playerId + ") poison changed by " + amount + " (" + this.props.players[this.props.player].poison + ")");
                break;
            case 2:
                this.props.updateCommanderTax(this.props.player, amount*2);
                this.props.addHistory(moment(), this.props.player, this.props.players[this.props.player].name + " (ID " + this.props.players[this.props.player].playerId + ") commander tax changed by " + amount*2 + " (" + this.props.players[this.props.player].commanderTax + ")");
                break;
            case 3:
                opposingPlayerId = this.props.player <= 0 ? 1 : 0;
                break;
            case 4:
                opposingPlayerId = this.props.player <= 1 ? 2 : 1;
                break;
            case 5:
                opposingPlayerId = this.props.player <= 2 ? 3 : 2;
                break;
            case 6:
                opposingPlayerId = this.props.player <= 3 ? 4 : 3;
                break;
            case 7:
                opposingPlayerId = this.props.player <= 4 ? 5 : 4;
                break;
        }
        if(opposingPlayerId !== -1) {
            this.props.updateCommanderDamage(this.props.player, opposingPlayerId, amount);
            this.props.addHistory(moment(), this.props.player, "Commander damage dealt by " + this.props.players[opposingPlayerId].name + " (ID " + this.props.players[opposingPlayerId].playerId + ") to " + this.props.players[this.props.player].name + " (ID " + this.props.players[this.props.player].playerId + ") changed by " + amount + " (" + this.props.players[this.props.player].commanderDamage[opposingPlayerId] + ")");
        }
    }

    profileMenu() {
        // To do
    }

    render () {
        var backgroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].backgroundColour : DEFAULT_PROFILE.backgroundColour;
        var foregroundColour = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].foregroundColour : DEFAULT_PROFILE.foregroundColour;
        var playerName = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].name : DEFAULT_PROFILE.name;
        var backgroundImage = Object.keys(this.props.players).length >= this.props.game.numberPlayers ? this.props.players[this.props.player].backgroundImage : DEFAULT_PROFILE.backgroundImage;
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
            this.state.menuState === MENU_HIDDEN ? 
                <View style={[styles.containerMain, {backgroundColor: backgroundColour, borderColor: foregroundColour, backgroundImage: backgroundImage}]}>
                    <View style={styles.containerCounterValue}>
                        <Text style={[globalStyles.text, styles.textCounterValue, {color: foregroundColour}]}>
                            {counterValue}
                        </Text>
                    </View>
                    <Text style={[globalStyles.text, styles.textPlayerName, {color: foregroundColour}]}>
                        {playerName}
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
                            onPress={() => {this.toggleMenu()}}
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
            : this.state.menuState === MENU_SHOWN ? 
                <ProfileMenu
                    player={this.props.player}
                    close={this.toggleMenu}
                />
            : this.state.menuState === MENU_SHOW || this.state.menuState === MENU_HIDE ? 
                <Animated.View 
                    style={[
                        styles.containerMenuTransition,
                        {
                            height: this.state.menuTransition,
                            width: this.state.menuTransition
                        }
                    ]}
                />
            :
                null
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
        addHistory: (timestamp, playerId, note) => {dispatch(addHistory(timestamp, playerId, note))},
        updateLife: (playerId, amount) => {dispatch(updateLife(playerId, amount))},
        updatePoison: (playerId, amount) => {dispatch(updatePoison(playerId, amount))},
        updateCommanderTax: (playerId, amount) => {dispatch(updateCommanderTax(playerId, amount))},
        updateCommanderDamage: (playerId, opposingPlayerId, amount) => {dispatch(updateCommanderDamage(playerId, opposingPlayerId, amount))},
        updateCurrentCounter: (playerId, amount) => {dispatch(updateCurrentCounter(playerId, amount))}
    })
)(PlayerArea)