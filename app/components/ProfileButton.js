import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    /**
     * Renders the inside of the button
     */
    renderInner = () => {
        if (this.props.profile.backgroundImage != null && this.props.profile.backgroundImage != "") {
            console.log("rendering image");
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