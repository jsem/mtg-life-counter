import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';

import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import IconButton from '../components/IconButton';
import PlayerArea from '../components/PlayerArea';
import { colourGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

/**
 * Game screen. Displays player areas for each player and a central menu
 */
class GameScreen extends Component {

    showMenu = () => {
        //TODO actually implement this
    }

    exitGame = () => {
        this.props.navigation.state.params.onNavigateBack();
    }

    renderPlayerAreas = () => {
        switch (this.props.game.numberPlayers) {
            case 6:
                Orientation.lockToLandscape();
                return (
                    <View style={globalStyles.containerScreenVertical}>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={0}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={1}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={2}/>
                            </View>
                        </View>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={5}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={4}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={3}/>
                            </View>
                        </View>
                    </View>
                )
            case 4:
                Orientation.lockToLandscape();
                return (
                    <View style={globalStyles.containerScreenVertical}>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={0}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                                <PlayerArea player={1}/>
                            </View>
                        </View>
                        <View style={globalStyles.containerScreenHorizontal}>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={3}/>
                            </View>
                            <View style={[globalStyles.containerScreenVertical]}>
                                <PlayerArea player={2}/>
                            </View>
                        </View>
                    </View>
                );
            case 2:
            default:
                Orientation.lockToPortrait();
                return (
                    <View style={globalStyles.containerScreenVertical}>
                        <View style={[globalStyles.containerScreenVertical, globalStyles.containerRotate180]}>
                            <PlayerArea player={0}/>
                        </View>
                        <View style={[globalStyles.containerScreenVertical]}>
                            <PlayerArea player={1}/>
                        </View>
                    </View>
                );
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.exitGame);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.exitGame);
    }
    
    render () {
        return (
            <View style={globalStyles.containerScreenVertical}>
                {this.renderPlayerAreas()}
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <IconButton
                    icon="th-large"
                    onPress={this.showMenu}
                    buttonStyle={styles.menuButton}
                    iconStyle={globalStyles.text}
                />
                </View>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    menuButton: {
        backgroundColor: colourGrey,
        height: '40@ms',
        width: '40@ms'
    }
})

export default GameScreen = connect(
    state => ({
        game: state.game,
        players: state.player
    }),
    dispatch => ({
        
    })
)(GameScreen)