import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { globalStyles } from '../config/styles';

/**
 * Button with an icon
 * Props:
 * icon: the name of the fontawesome icon to render
 * onPress: the function to execute when the button is pressed
 * buttonStyle: custom styles for the button (TouchableOpacity)
 * iconStyle: custom styles for the icon (Text)
 */
export default class IconButton extends Component {
    render () {
        return (
            <TouchableOpacity 
                onPress={this.props.onPress}
                style={[
                    globalStyles.containerHorizontalCenter,
                    styles.button,
                    this.props.buttonStyle
                ]}
            >
                <Icon name={this.props.icon} 
                    style={[
                        globalStyles.text,
                        globalStyles.textCenter,
                        styles.icon,
                        this.props.iconStyle
                    ]
                }/>
            </TouchableOpacity>
        );
    }
}

const styles = ScaledSheet.create({
    button: {
        width: '50@ms'
    },

    icon: {
        flex: 1
    }
})