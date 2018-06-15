import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colourDarkGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

/**
 * Header for app menus. Optionally displays header text and header buttons
 * Props:
 * buttonStyle: styles for the buttons (TouchableOpacity)
 * buttonLeftStyle: individual styles for the left button (TouchableOpacity)
 * buttonRightStyle: individual styles for the right button (TouchableOpacity)
 * containerStyle: styles for the container (View)
 * header: the header text to display
 * iconLeft: the fontawesome icon to display as the left button (wont display if null or empty)
 * iconRight: the fontawesome icon to display as the right button (wont display if null or empty)
 * iconStyle: styles for the button icons (Text)
 * iconLeftStyle: individual styles for the left button icon (Text)
 * iconRightStyle: individual styles for the right button icon (Text)
 * pressLeft: the function to perform when clicking the left button
 * pressRight: the function to perform when clicking the right button
 * textStyle: styles for the header text (Text)
 */
export default class MenuHeader extends Component {
    /**
     * Renders a button if an icon name was supplied
     * Otherwise renders a blank view
     * icon: the name of the icon to render
     * onPress: the function to execute when the button is pressed
     * buttonStyle: custom styles for the button (TouchableOpacity)
     * iconStyle: custom styles for the icon (Text)
     */
    renderButton(icon, onPress, buttonStyle, iconStyle) {
        if (icon != null && icon != '') {
            return (
                <TouchableOpacity 
                    onPress={onPress}
                    style={[
                        globalStyles.containerHorizontalCenter,
                        styles.button,
                        this.props.buttonStyle,
                        buttonStyle
                    ]}
                >
                    <Icon name={icon} 
                        style={[
                            globalStyles.textLarge,
                            globalStyles.textCenter,
                            styles.icon,
                            this.props.iconStyle,
                            iconStyle
                        ]
                    }/>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={[
                    globalStyles.containerHorizontalCenter,
                    styles.button
                ]}/>
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
                {this.renderButton(this.props.iconLeft, this.props.pressLeft, this.props.buttonLeftStyle, this.props.iconLeftStyle)}
				<Text style={[
                    globalStyles.textLarge, 
                    globalStyles.textCenter, 
                    styles.header, 
                    this.props.textStlye
                ]}>
                    {this.props.header}
                </Text>
                {this.renderButton(this.props.iconRight, this.props.pressRight, this.props.buttonRightStyle, this.props.iconRightStyle)}
			</View>
		);
	}
}

const styles = ScaledSheet.create({
    button: {
        width: '50@ms'
    },

    container: {
        backgroundColor: colourDarkGrey
    },

    header: {
        flex: 1,
        paddingVertical: '10@vs'
    },

    icon: {
        flex: 1
    }
})