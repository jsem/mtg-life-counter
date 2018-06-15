import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';

import { globalStyles } from '../config/styles';

/**
 * Button with an icon
 * Props:
 * icon: the name of the fontawesome icon to render
 * onPress: the function to execute when the button is pressed
 * buttonStyle: custom styles for the button (TouchableOpacity)
 * iconStyle: custom styles for the icon (Text)
 */
export default class ProfileButton extends Component {
	render () {
		return (
			<TouchableOpacity 
                key={this.key + "_profileButton"}
                onPress={this.props.onPress}
                style={[
                    globalStyles.containerHorizontalCenter,
                    styles.button,
                    {
                        backgroundColor: this.props.profile.backgroundColour,
                        borderColor: this.props.profile.foregroundColour
                    },
                    this.props.buttonStyle
                ]}
            >
                <Text 
                    key={this.key + "_profileText"}
                    style={[
                        globalStyles.text,
                        globalStyles.textCenter,
                        styles.text,
                        {color: this.props.profile.foregroundColour},
                        this.props.textStyle
                    ]}
                >
                    {this.props.profile.name}
                </Text>
            </TouchableOpacity>
		);
	}
}

const styles = ScaledSheet.create({
    button: {
        borderRadius: 0,
        borderWidth: 1,
        flex: 1
    },

    text: {
        flex: 1
    }
})