import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { colourGrey } from '../config/colours';
import { globalStyles } from '../config/styles';
import { ScaledSheet } from 'react-native-size-matters';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 * Props:
 * containerStyle: custom styles for the container (View)
 * containerContentStyle: custom styles for the content container (View)
 * containerLabelStyle: custom styles for the label container (View)
 * label: the label to display
 * labelStyle: custom styles for the label (Text)
 */
export default class MenuItem extends Component {
    /**
     * Renders the label if one is supplied
     * Otherwise renders a blank view
     */
    renderLabel() {
        if (this.props.label != null && this.props.label != "") {
            return (
                <View style={[
                    globalStyles.containerHorizontalCenter,
                    styles.containerLabel,
                    this.props.containerLabelStyle
                ]}>
                    <Text style={[
                        globalStyles.text,
                        globalStyles.textLeft,
                        styles.label,
                        this.props.labelStyle
                    ]}>
                        {this.props.label}
                    </Text>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    
    /**
     * Renders the children if any are supplied
     * Otherwise renders a blank view
     */
    renderChildren() {
        if (this.props.children != null && this.props.children != "") {
            return (
                <View style={[
                    globalStyles.containerHorizontalCenter,
                    styles.containerContent,
                    this.props.containerContentStyle
                ]}>
                    {this.props.children}
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }

	render () {
		return (
			<View style={[
                globalStyles.containerHorizontal, 
                styles.container,
                this.props.containerStyle
            ]}>
                {this.renderLabel()}
                {this.renderChildren()}
			</View>
		);
	}
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: colourGrey,
        height: '60@vs'
    },

    containerContent: {
        flex: 2
    },

    containerLabel: {
        flex: 1
    },

    label: {
        paddingHorizontal: '10@ms'
    }
})