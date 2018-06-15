import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { colourGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

/**
 * Content container for a menu screen.
 * Props:
 * containerStyle: styles for the container (View)
 * style: styles for the outer container (ScrollView)
 */
export default class MenuContent extends Component {
	render () {
		return (
			<ScrollView 
                containerStyle={[
                    globalStyles.containerVertical, 
                    styles.container,
                    this.props.containerStyle
                ]}
                style={[
                    styles.container,
                    this.props.style
                ]}
            >
                {this.props.children}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colourGrey,
        flex: 1
    }
})