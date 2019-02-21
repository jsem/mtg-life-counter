import React, { Component } from 'react';
import { Text, View } from 'react-native';

/**
 * Component that displays player information
 * Props:
 * player: temp prop for display debugging
 */
export default class PlayerArea extends Component {
    render () {
        //TODO actually implement this view
        return (
            <View 
                style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: 0,
                    padding: 0,
                    flex: 1
                }}
            >
                <Text style={{fontSize: 30, textAlign: 'center'}}>{this.props.player}</Text>
            </View>
        );
    }
}