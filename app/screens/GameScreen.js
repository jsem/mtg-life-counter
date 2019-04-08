import React, { Component } from 'react';
import { Animated, BackHandler, Dimensions, View } from 'react-native';

import moment from 'moment';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import { startGame } from '../actions/GameAction';
import { createPlayer } from '../actions/PlayerAction';
import GameMenu from '../components/GameMenu';
import IconButton from '../components/IconButton';
import PlayerArea from '../components/PlayerArea';
import { colourGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

const MENU_SHOW = 'MENU_SHOW';
const MENU_HIDE = 'MENU_HIDE';
const MENU_HIDDEN = 'MENU_HIDDEN';
const MENU_SHOWN = 'MENU_SHOWN';
const MENU_TOGGLE_TIMEOUT = 100;

/**
 * Game screen. Displays player areas for each player and a central menu
 */
class GameScreen extends Component {
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

    exitGame = () => {
        this.props.navigation.state.params.onNavigateBack();
    }

    mainMenu = () => {
        this.exitGame();
        this.props.navigation.navigate("MainMenu");
    }

    restart = () => {
        let profiles = [];
        let startingLife = this.props.game.startingLife;
        let numberPlayers = this.props.game.numberPlayers;
        Object.keys(this.props.players).forEach(player => {
            profiles.push({ ...this.props.players[player].profile});
        });
        this.exitGame();
        this.props.startGame(startingLife, numberPlayers, moment());
        profiles.forEach(profile => {
            this.props.createPlayer(profile, startingLife);
        });
        this.hideMenu();
    }

    renderPlayerAreas = () => {
        switch (this.props.game.numberPlayers) {
            case 6:
                return (
                    <View style={globalStyles.containerScreenVertical}>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={0} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={1} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={2} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                        </View>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={5} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={4} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={3} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                        </View>
                    </View>
                )
            case 4:
                return (
                    <View style={globalStyles.containerScreenVertical}>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={0} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={1} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                        </View>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={3} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={2} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                            </View>
                        </View>
                    </View>
                );
            case 2:
            default:
                return (
                    <View style={globalStyles.containerScreenVertical}>
                        <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                            <PlayerArea player={0} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                        </View>
                        <View style={[globalStyles.containerScreenVertical]}>
                            <PlayerArea player={1} orientationLock={this.orientationLock} navigation={this.props.navigation}/>
                        </View>
                    </View>
                );
        }
    }

    orientationLock = () => {
        switch (this.props.game.numberPlayers) {
            case 6:
                Orientation.lockToLandscape();
                break;
            case 4:
                Orientation.lockToLandscape();
                break;
            case 2:
            default:
                Orientation.lockToPortrait();
                break;
        }
    }

    componentDidMount() {
        this.orientationLock();
        BackHandler.addEventListener('hardwareBackPress', this.exitGame);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.exitGame);
    }
    
    render () {
        return (
            <View style={globalStyles.containerScreenVertical}>
                {
                    this.state.menuState !== MENU_SHOWN ? 
                        this.renderPlayerAreas()
                    :
                        null
                }
                <View style={this.state.menuState !== MENU_SHOWN ? styles.containerMenuHidden : styles.containerMenuShown}>
                    {
                        this.state.menuState === MENU_HIDDEN ? 
                            <IconButton
                                icon="th-large"
                                onPress={this.toggleMenu}
                                buttonStyle={styles.buttonMenu}
                                iconStyle={globalStyles.text}
                            />
                        : this.state.menuState === MENU_SHOWN ? 
                            <GameMenu
                                close={this.toggleMenu}
                                orientationLock={this.orientationLock}
                                mainMenu={this.mainMenu}
                                restart={this.restart}
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
                    }
                </View>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    buttonMenu: {
        backgroundColor: colourGrey,
        height: '40@ms',
        width: '40@ms'
    },

    containerMenuHidden: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },

    containerMenuShown: {
        alignItems: 'stretch',
        bottom: 0,
        justifyContent: 'flex-start',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },

    containerMenuTransition: {
        backgroundColor: colourGrey
    }
})

export default GameScreen = connect(
    state => ({
        game: state.game,
        players: state.player
    }),
    dispatch => ({
        startGame: (startingLife, numberPlayers, timestamp) => dispatch(startGame(startingLife, numberPlayers, timestamp)),
        createPlayer: (profile, startingLife) => {dispatch(createPlayer(profile, startingLife))}
    })
)(GameScreen)