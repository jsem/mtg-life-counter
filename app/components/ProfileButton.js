import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { globalStyles } from '../config/styles';

/**
 * Button that changes display based an a provided profile
 * Props:
 * profile: the profile used to style the button
 * onPress: the function to execute when the button is pressed
 * buttonStyle: custom styles for the button (TouchableOpacity)
 * textStyle: custom styles for the text (Text)
 */
export default class ProfileButton extends Component {
    /**
     * Renders the inside of the button
     */
    renderInner = () => {
        if (this.props.profile.backgroundImage != null && this.props.profile.backgroundImage != "") {
            return (
                <ImageBackground
                    key={this.key + "_image"}
                    resizeMode="cover"
                    source={{uri: this.props.profile.backgroundImage}}
                    style={[
                        globalStyles.containerHorizontalCenter,
                        styles.innerContainer
                    ]}
                >
                    {this.renderText()}
                </ImageBackground>
            )
        } else {
            return (
                <View style={[
                    globalStyles.containerHorizontalCenter,
                    styles.innerContainer
                ]}>
                    {this.renderText()}
                </View>
            )
        }
    }

    /**
     * Renders the button text
     */
    renderText = () => {
        return (
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
        )
    }

	render () {
		return (
			<TouchableOpacity 
                key={this.key + "_profileButton"}
                onPress={this.props.onPress}
                style={[
                    globalStyles.containerHorizontal,
                    styles.button,
                    {
                        backgroundColor: this.props.profile.backgroundColour,
                        borderColor: this.props.profile.foregroundColour
                    },
                    this.props.buttonStyle
                ]}
            >
                {this.renderInner()}
            </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 0,
        borderWidth: 1,
        flex: 1
    },

    innerContainer: {
        flex: 1
    },

    text: {
        flex: 1
    }
})