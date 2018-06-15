import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { colourGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 * Props:
 * containerStyle: styles for the container (View)
 */
export default class MenuContent extends Component {
	render () {
		return (
			<View style={[
                globalStyles.containerVertical, 
                styles.container,
                this.props.containerStyle
            ]}>
                {this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colourGrey,
        flex: 1
    }
})